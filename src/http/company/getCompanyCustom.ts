/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { api, api_andar_de_cima, api_lapa, api_tout } from '../api-client';

export async function getCompanyCustom(
	startDate: string,
	endDate: string,
	company?: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 60000);
	const cookieHeader = await buildAuthCookieHeader();
	const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;

	try {
		switch (company) {
			case 'lapa':
				const apiURL = api_lapa;
				const resp_lapa = await apiURL.get('Company/kpis/date-range', {
					searchParams: { startDate, endDate },
					next: { tags: ['company'], revalidate: 30 },
					headers: authHeaders,
					signal: controller.signal, // Passa o signal ao fetch
				});

				if (!resp_lapa.ok) {
					console.error(
						'getCompanyCustom: erro ao buscar dados (lapa)',
						resp_lapa.status,
						resp_lapa.statusText,
					);
					return null;
				}

				return resp_lapa.json();
			case 'andar_de_cima':
				const apiURL_andar_de_cima = api_andar_de_cima;
				const resp_andar_de_cima = await apiURL_andar_de_cima.get(
					'Company/kpis/date-range',
					{
						searchParams: { startDate, endDate },
						next: { tags: ['company'], revalidate: 30 },
						headers: authHeaders,
						signal: controller.signal, // Passa o signal ao fetch
					},
				);

				if (!resp_andar_de_cima.ok) {
					console.error(
						'getCompanyCustom: erro ao buscar dados (andar_de_cima)',
						resp_andar_de_cima.status,
						resp_andar_de_cima.statusText,
					);
					return null;
				}

				return resp_andar_de_cima.json();

			case 'tout':
				const apiURL_tout = api_tout;
				const resp_tout = await apiURL_tout.get('Company/kpis/date-range', {
					searchParams: { startDate, endDate },
					next: { tags: ['company'], revalidate: 30 },
					headers: authHeaders,
					signal: controller.signal, // Passa o signal ao fetch
				});

				if (!resp_tout.ok) {
					console.error(
						'getCompanyCustom: erro ao buscar dados (tout)',
						resp_tout.status,
						resp_tout.statusText,
					);
					return null;
				}

				return resp_tout.json();

			default:
				const resp_ipiranga = await api.get('Company/kpis/date-range', {
					searchParams: { startDate, endDate },
					next: { tags: ['company'], revalidate: 30 },
					headers: authHeaders,
					signal: controller.signal, // Passa o signal ao fetch
				});

				if (!resp_ipiranga.ok) {
					console.error(
						'getCompanyCustom: erro ao buscar dados (ipiranga)',
						resp_ipiranga.status,
						resp_ipiranga.statusText,
					);
					return null;
				}

				return resp_ipiranga.json();
		}
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			console.error('getCompanyCustom: request timeout');
			return null;
		}
		console.error('getCompanyCustom: erro inesperado', error);
		return null;
	} finally {
		clearTimeout(timeout); // Limpa o timeout
	}
}
