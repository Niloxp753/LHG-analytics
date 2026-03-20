/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { auth_api } from '../api-client';
import { FetchFailedError } from '../conditional-cache';
import { applyPrivateDashboardCache } from '../cache-profiles';
import { logFetchFailed, logRequestTimeout } from '../logging';
import { isRetryableError, isRetryableStatus } from '../retry';

async function getCompanyUnifiedCached(
	startDate: string,
	endDate: string,
	cookieHeader: string | null,
) {
	'use cache: private';

	applyPrivateDashboardCache(['company'], 'dashboard');

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 30000);
	const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;

	try {
		let resp: Response | null = null;
		for (let attempt = 0; attempt < 2; attempt += 1) {
			try {
				resp = await auth_api.get('Company/kpis/date-range', {
					searchParams: { startDate, endDate },
					headers: authHeaders,
					signal: controller.signal,
					throwHttpErrors: false,
				});

				if (resp.ok || !isRetryableStatus(resp.status) || attempt === 1) {
					break;
				}
			} catch (error) {
				if (!isRetryableError(error) || attempt === 1) {
					throw error;
				}
			}
		}

		if (!resp || !resp.ok) {
			throw new FetchFailedError(
				'getCompanyUnified',
				resp?.status,
				resp?.statusText,
			);
		}

		return resp.json();
	} finally {
		clearTimeout(timeout);
	}
}

export async function getCompanyUnified(
	startDate: string,
	endDate: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
	const cookieHeader = await buildAuthCookieHeader();

	try {
		return await getCompanyUnifiedCached(startDate, endDate, cookieHeader);
	} catch (error) {
		if (error instanceof FetchFailedError) {
			logFetchFailed(error);
			return null;
		}
		if (error instanceof Error && error.name === 'AbortError') {
			logRequestTimeout('getCompanyUnified');
			return null;
		}
		console.error('getCompanyUnified: erro inesperado', error);
		return null;
	}
}
