/** @format */

import { buildBackendAuthHeaders } from '@/lib/auth-headers';
import type { LivRestaurantKpisResponse } from '@/types/liv/restaurant';
import { api_liv } from '../api-client';
import { FetchFailedError } from '../conditional-cache';
import { applyPrivateDashboardCache } from '../cache-profiles';
import { logFetchFailed, logRequestTimeout } from '../logging';
import { isRetryableError, isRetryableStatus } from '../retry';

async function getLivRestaurantKpisCached(
	startDate: string,
	endDate: string,
	authHeaders: Record<string, string> | undefined,
): Promise<LivRestaurantKpisResponse> {
	'use cache: private';

	applyPrivateDashboardCache(['restaurant_liv'], 'dashboard');

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 30000);

	try {
		let resp: Response | null = null;
		for (let attempt = 0; attempt < 2; attempt += 1) {
			try {
				resp = await api_liv.get('Restaurants/restaurants/date-range', {
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
				'getLivRestaurantKpis',
				resp?.status,
				resp?.statusText,
			);
		}

		return (await resp.json()) as LivRestaurantKpisResponse;
	} finally {
		clearTimeout(timeout);
	}
}

export async function getLivRestaurantKpis(
	startDate: string,
	endDate: string,
): Promise<LivRestaurantKpisResponse | null> {
	const authHeaders = await buildBackendAuthHeaders();

	try {
		return await getLivRestaurantKpisCached(startDate, endDate, authHeaders);
	} catch (error) {
		if (error instanceof FetchFailedError) {
			logFetchFailed(error);
			return null;
		}
		if (error instanceof Error && error.name === 'AbortError') {
			logRequestTimeout('getLivRestaurantKpis');
			return null;
		}
		console.error('getLivRestaurantKpis: erro inesperado', error);
		return null;
	}
}
