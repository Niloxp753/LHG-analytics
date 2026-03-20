/** @format */

import { buildBackendAuthHeaders } from '@/lib/auth-headers';
import type { LivOperationalKpisResponse } from '@/types/liv/operational';
import { api_liv } from '../api-client';
import { FetchFailedError } from '../conditional-cache';
import { applyPrivateDashboardCache } from '../cache-profiles';
import { logFetchFailed, logRequestTimeout } from '../logging';
import { isRetryableError, isRetryableStatus } from '../retry';

async function getLivOperationalKpisCached(
	startDate: string,
	endDate: string,
	authHeaders: Record<string, string> | undefined,
): Promise<LivOperationalKpisResponse> {
	'use cache: private';

	applyPrivateDashboardCache(['operational_liv'], 'dashboard');

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 30000);

	try {
		let resp: Response | null = null;
		for (let attempt = 0; attempt < 2; attempt += 1) {
			try {
				resp = await api_liv.get('Governance/kpis/date-range', {
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
				'getLivOperationalKpis',
				resp?.status,
				resp?.statusText,
			);
		}

		return (await resp.json()) as LivOperationalKpisResponse;
	} finally {
		clearTimeout(timeout);
	}
}

export async function getLivOperationalKpis(
	startDate: string,
	endDate: string,
): Promise<LivOperationalKpisResponse | null> {
	const authHeaders = await buildBackendAuthHeaders();

	try {
		return await getLivOperationalKpisCached(startDate, endDate, authHeaders);
	} catch (error) {
		if (error instanceof FetchFailedError) {
			logFetchFailed(error);
			return null;
		}
		if (error instanceof Error && error.name === 'AbortError') {
			logRequestTimeout('getLivOperationalKpis');
			return null;
		}
		console.error('getLivOperationalKpis: erro inesperado', error);
		return null;
	}
}
