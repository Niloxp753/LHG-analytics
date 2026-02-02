/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { api, api_andar_de_cima, api_lapa, api_tout } from '../api-client';
import { isRetryableError, isRetryableStatus } from '../retry';

async function fetchRestaurantData(
	client: typeof api,
	startDate: string,
	endDate: string,
	authHeaders: Record<string, string> | undefined,
	controller: AbortController,
	tags: string[],
): Promise<Response | null> {
	let resp: Response | null = null;
	for (let attempt = 0; attempt < 2; attempt += 1) {
		try {
			resp = await client.get('Restaurants/restaurants/date-range', {
				searchParams: { startDate, endDate },
				next: { tags, revalidate: 30 },
				headers: authHeaders,
				signal: controller.signal,
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
		switch (company) {
			case 'lapa':
				const resp_lapa = await fetchRestaurantData(
					api_lapa,
					startDate,
					endDate,
					authHeaders,
					controller,
					['restaurant_lapa'],
				);

				if (!resp_lapa || !resp_lapa.ok) {
					console.error(
						'getRestaurantsCustom: erro ao buscar dados (lapa)',
						resp_lapa?.status,
						resp_lapa?.statusText,
					);
					return null;
				}
				return resp_lapa.json();
			case 'tout':
				const resp_tout = await fetchRestaurantData(
					api_tout,
					startDate,
					endDate,
					authHeaders,
					controller,
					['restaurant_tout'],
				);

				if (!resp_tout || !resp_tout.ok) {
					console.error(
						'getRestaurantsCustom: erro ao buscar dados (tout)',
						resp_tout?.status,
						resp_tout?.statusText,
					);
					return null;
				}
				return resp_tout.json();
			case 'andar_de_cima':
				const resp_andar_de_cima = await fetchRestaurantData(
					api_andar_de_cima,
					startDate,
					endDate,
					authHeaders,
					controller,
					['restaurant_andar_de_cima'],
				);

				if (!resp_andar_de_cima || !resp_andar_de_cima.ok) {
					console.error(
						'getRestaurantsCustom: erro ao buscar dados (andar_de_cima)',
						resp_andar_de_cima?.status,
						resp_andar_de_cima?.statusText,
					);
					return null;
				}
				return resp_andar_de_cima.json();

			default:
				const resp = await fetchRestaurantData(
					api,
					startDate,
					endDate,
					authHeaders,
					controller,
					['restaurant_ipiranga'],
				);

				if (!resp || !resp.ok) {
					console.error(
						'getRestaurantsCustom: erro ao buscar dados (ipiranga)',
						resp?.status,
						resp?.statusText,
					);
					return null;
				}
				return resp.json();
		}
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			console.error('getRestaurantsCustom: request timeout');
			return null;
		}
		console.error('getRestaurantsCustom: erro inesperado', error);
		return null;
	} finally {
		clearTimeout(timeout); // Limpa o timeout
	}
}
