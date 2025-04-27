/** @format */

import { api, api_andar_de_cima, api_lapa, api_tout } from '../api-client';

class HTTPError extends Error {}

export async function getCompany(
	period: string,
	company?: string,
): Promise<any> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 60000);

	try {
		switch (company) {
			case 'lapa':
				const apiURL = api_lapa;
				const resp_lapa = await apiURL.get(`Company/kpis?period=${period}`, {
					next: { tags: ['company'], revalidate: 30 },
					signal: controller.signal, // Passa o signal ao fetch
				});

				if (!resp_lapa.ok) {
					throw new HTTPError(`Fetch error: ${resp_lapa.statusText}`);
				}

				return resp_lapa.json();
			case 'andar_de_cima':
				const apiURL_andar_de_cima = api_andar_de_cima;
				const resp_andar_de_cima = await apiURL_andar_de_cima.get(
					`Company/kpis?period=${period}`,
					{
						next: { tags: ['company'], revalidate: 30 },
						signal: controller.signal, // Passa o signal ao fetch
					},
				);

				if (!resp_andar_de_cima.ok) {
					throw new HTTPError(`Fetch error: ${resp_andar_de_cima.statusText}`);
				}

				return resp_andar_de_cima.json();
			case 'tout':
				const apiURL_tout = api_tout;
				const resp_tout = await apiURL_tout.get(
					`Company/kpis?period=${period}`,
					{
						next: { tags: ['company'], revalidate: 30 },
						signal: controller.signal, // Passa o signal ao fetch
					},
				);

				if (!resp_tout.ok) {
					throw new HTTPError(`Fetch error: ${resp_tout.statusText}`);
				}

				return resp_tout.json();

			default:
				const resp = await api.get(`Company/kpis?period=${period}`, {
					next: { tags: ['company'], revalidate: 120 },
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
