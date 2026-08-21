/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { cacheLife, cacheTag } from 'next/cache';
import {
	api,
	getUnitApiClient,
} from '../api-client';
import { FetchFailedError } from '../conditional-cache';
import { logFetchFailed, logRequestTimeout } from '../logging';
import { isRetryableError, isRetryableStatus } from '../retry';

async function fetchCompanyKpis(
	client: typeof api,
	startDate: string,
	endDate: string,
	authHeaders: Record<string, string> | undefined,
	controller: AbortController,
): Promise<Response | null> {
	let resp: Response | null = null;
	for (let attempt = 0; attempt < 2; attempt += 1) {
		try {
			resp = await client.get('Company/kpis/date-range', {
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
	return resp;
}

async function getCompanyCustomCached(
	startDate: string,
	endDate: string,
	company: string | undefined,
	cookieHeader: string | null,
) {
	'use cache';

	cacheLife('dashboard');
	cacheTag('company');

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 30000);
	const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;

	try {
		const companyKey = company ?? 'ipiranga';
		const resp = await fetchCompanyKpis(
			getUnitApiClient(companyKey),
			startDate,
			endDate,
			authHeaders,
			controller,
		);

		if (!resp || !resp.ok) {
			throw new FetchFailedError(
				`getCompanyCustom (${companyKey})`,
				resp?.status,
				resp?.statusText,
			);
		}

		return resp.json();
	} finally {
		clearTimeout(timeout);
	}
}

export async function getCompanyCustom(
	startDate: string,
	endDate: string,
	company?: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
	const cookieHeader = await buildAuthCookieHeader();

	try {
		return await getCompanyCustomCached(startDate, endDate, company, cookieHeader);
	} catch (error) {
		if (error instanceof FetchFailedError) {
			logFetchFailed(error);
			return null;
		}
		if (error instanceof Error && error.name === 'AbortError') {
			logRequestTimeout('getCompanyCustom');
			return null;
		}
		console.error('getCompanyCustom: erro inesperado', error);
		return null;
	}
}
