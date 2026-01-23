/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { api, api_andar_de_cima, api_lapa, api_tout } from '../api-client';

class HTTPError extends Error {}

export async function getRestaurants(
	period: string,
	company?: string,
): Promise<any> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 60000);
	const cookieHeader = buildAuthCookieHeader();
	const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;

	try {
		switch (company) {
			case 'lapa':
				const resp_lapa = await api_lapa.get(
					`Restaurants/restaurants?period=${period}`,
					{
						next: { tags: ['restaurant_lapa'], revalidate: 40 },
						headers: authHeaders,
						signal: controller.signal,
					},
				);

				if (!resp_lapa.ok) {
					throw new HTTPError(`Fetch error: ${resp_lapa.statusText}`);
				}
				return resp_lapa.json();
			case 'tout':
				const resp_tout = await api_tout.get(
					`Restaurants/restaurants?period=${period}`,
					{
						next: { tags: ['restaurant_tout'], revalidate: 40 },
						headers: authHeaders,
						signal: controller.signal,
					},
				);

				if (!resp_tout.ok) {
					throw new HTTPError(`Fetch error: ${resp_tout.statusText}`);
				}
				return resp_tout.json();
			case 'andar_de_cima':
				const resp_andar_de_cima = await api_andar_de_cima.get(
					`Restaurants/restaurants?period=${period}`,
					{
						next: { tags: ['restaurant_andar_de_cima'], revalidate: 40 },
						headers: authHeaders,
						signal: controller.signal,
					},
				);

				if (!resp_andar_de_cima.ok) {
					throw new HTTPError(`Fetch error: ${resp_andar_de_cima.statusText}`);
				}
				return resp_andar_de_cima.json();

			default:
				const resp = await api.get(`Restaurants/restaurants?period=${period}`, {
					next: { tags: ['restaurant_ipiranga'], revalidate: 40 },
					headers: authHeaders,
					signal: controller.signal,
				});

				if (!resp.ok) {
					throw new HTTPError(`Fetch error: ${resp.statusText}`);
				}
				return resp.json();
		}
	} catch (error) {
		if (error instanceof Error) {
			if (error.name === 'AbortError') {
				throw new HTTPError('Request timed out');
			}
			throw new HTTPError(error.message); // Trata outros erros
		}
		throw new HTTPError('Unknown error occurred'); // Caso o erro não seja uma instância de Error
	} finally {
		clearTimeout(timeout); // Limpa o timeout
	}
}
