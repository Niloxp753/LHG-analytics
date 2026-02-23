/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { api, api_andar_de_cima, api_lapa, api_tout } from '../api-client';
import { FetchFailedError, withConditionalCache } from '../conditional-cache';
import { logFetchFailed, logRequestTimeout } from '../logging';
import { isRetryableError, isRetryableStatus } from '../retry';

async function fetchRestaurantData(
	client: typeof api,
	startDate: string,
	endDate: string,
	authHeaders: Record<string, string> | undefined,
	controller: AbortController,
): Promise<Response | null> {
	let resp: Response | null = null;
	for (let attempt = 0; attempt < 2; attempt += 1) {
		try {
			resp = await client.get('Restaurants/restaurants/date-range', {
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
	return resp;
}

export async function getRestaurantsCustom(
	startDate: string,
	endDate: string,
	company?: string,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 30000);
	const cookieHeader = await buildAuthCookieHeader();
	const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;

	try {
		const companyKey = company ?? 'ipiranga';
		const tags =
			companyKey === 'lapa'
				? ['restaurant_lapa']
				: companyKey === 'tout'
					? ['restaurant_tout']
					: companyKey === 'andar_de_cima'
						? ['restaurant_andar_de_cima']
						: ['restaurant_ipiranga'];

		return await withConditionalCache(
			{
				keyParts: ['restaurant', 'custom', companyKey, startDate, endDate],
				tags,
				revalidate: 30,
			},
			async () => {
				let resp: Response | null = null;
				switch (companyKey) {
					case 'lapa':
						resp = await fetchRestaurantData(
							api_lapa,
							startDate,
							endDate,
							authHeaders,
							controller,
						);
						break;
					case 'tout':
						resp = await fetchRestaurantData(
							api_tout,
							startDate,
							endDate,
							authHeaders,
							controller,
						);
						break;
					case 'andar_de_cima':
						resp = await fetchRestaurantData(
							api_andar_de_cima,
							startDate,
							endDate,
							authHeaders,
							controller,
						);
						break;
					default:
						resp = await fetchRestaurantData(
							api,
							startDate,
							endDate,
							authHeaders,
							controller,
						);
						break;
				}

				if (!resp || !resp.ok) {
					throw new FetchFailedError(
						`getRestaurantsCustom (${companyKey})`,
						resp?.status,
						resp?.statusText,
					);
				}

				return resp.json();
			},
		);
	} catch (error) {
		if (error instanceof FetchFailedError) {
			logFetchFailed(error);
			return null;
		}
		if (error instanceof Error && error.name === 'AbortError') {
			logRequestTimeout('getRestaurantsCustom');
			return null;
		}
		console.error('getRestaurantsCustom: erro inesperado', error);
		return null;
	} finally {
		clearTimeout(timeout); // Limpa o timeout
	}
}
