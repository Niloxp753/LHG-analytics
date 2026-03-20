/** @format */

import { buildBackendAuthHeaders } from '@/lib/auth-headers';
import type { LivReservationsKpisResponse } from '@/types/liv/reservations';
import { api_liv } from '../api-client';
import { FetchFailedError } from '../conditional-cache';
import { applyPrivateDashboardCache } from '../cache-profiles';
import { logFetchFailed, logRequestTimeout } from '../logging';
import { isRetryableError, isRetryableStatus } from '../retry';

async function getLivReservationsKpisCached(
	startDate: string,
	endDate: string,
	authHeaders: Record<string, string> | undefined,
): Promise<LivReservationsKpisResponse> {
	'use cache: private';

	applyPrivateDashboardCache(['reservations_liv'], 'dashboard');

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 30000);

	try {
		let resp: Response | null = null;
		for (let attempt = 0; attempt < 2; attempt += 1) {
			try {
				resp = await api_liv.get('Bookings/bookings/date-range', {
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
				'getLivReservationsKpis',
				resp?.status,
				resp?.statusText,
			);
		}

		return (await resp.json()) as LivReservationsKpisResponse;
	} finally {
		clearTimeout(timeout);
	}
}

export async function getLivReservationsKpis(
	startDate: string,
	endDate: string,
): Promise<LivReservationsKpisResponse | null> {
	const authHeaders = await buildBackendAuthHeaders();

	try {
		return await getLivReservationsKpisCached(startDate, endDate, authHeaders);
	} catch (error) {
		if (error instanceof FetchFailedError) {
			logFetchFailed(error);
			return null;
		}
		if (error instanceof Error && error.name === 'AbortError') {
			logRequestTimeout('getLivReservationsKpis');
			return null;
		}
		console.error('getLivReservationsKpis: erro inesperado', error);
		return null;
	}
}
