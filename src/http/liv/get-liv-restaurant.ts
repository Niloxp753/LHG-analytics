/** @format */

import { buildBackendAuthHeaders } from '@/lib/auth-headers';
import type { LivRestaurantKpisResponse } from '@/types/liv/restaurant';
import { api_liv } from '../api-client';
import { FetchFailedError, withConditionalCache } from '../conditional-cache';
import { logFetchFailed, logRequestTimeout } from '../logging';
import { isRetryableError, isRetryableStatus } from '../retry';

export async function getLivRestaurantKpis(
	startDate: string,
	endDate: string,
): Promise<LivRestaurantKpisResponse | null> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 30000);
	const authHeaders = await buildBackendAuthHeaders();

	try {
		return await withConditionalCache(
			{
				keyParts: ['liv', 'restaurant', startDate, endDate],
				tags: ['restaurant_liv'],
				revalidate: 30,
			},
			async () => {
				let resp: Response | null = null;
				for (let attempt = 0; attempt < 2; attempt += 1) {
					try {
						resp = await api_liv.get('Restaurants/restaurants/date-range', {
							searchParams: { startDate, endDate },
							headers: authHeaders,
							signal: controller.signal,
							throwHttpErrors: false,
							cache: 'no-store',
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
			},
		);
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
	} finally {
		clearTimeout(timeout);
	}
}
