/** @format */

import { api, api_lapa } from '../api-client';
class HTTPError extends Error {}

export async function getCompanyCustom(
	startDate: string,
	endDate: string,
	company?: string,
): Promise<any> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 60000);

	try {
		switch (company) {
			case 'lapa':
				const apiURL = api_lapa;
				const resp_lapa = await apiURL.get(
					`Company/kpis/date-range?startDate=${startDate}&endDate=${endDate}`,
					{
						next: { tags: ['company'], revalidate: 30 },

						signal: controller.signal, // Passa o signal ao fetch
					},
				);

				if (!resp_lapa.ok) {
					throw new HTTPError(`Fetch error: ${resp_lapa.statusText}`);
				}

				return resp_lapa.json();

			default:
				const resp_ipiranga = await api.get(
					`Company/kpis/date-range?startDate=${startDate}&endDate=${endDate}`,
					{
						next: { tags: ['company'], revalidate: 30 },
						signal: controller.signal, // Passa o signal ao fetch
					},
				);

				if (!resp_ipiranga.ok) {
					throw new HTTPError(`Fetch error: ${resp_ipiranga.statusText}`);
				}

				return resp_ipiranga.json();
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
