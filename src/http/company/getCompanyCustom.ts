/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { api, api_andar_de_cima, api_lapa, api_tout } from '../api-client';
import { isRetryableError, isRetryableStatus } from '../retry';

async function fetchCompanyKpis(
	client: typeof api,
	startDate: string,
	endDate: string,
	authHeaders: Record<string, string> | undefined,
	controller: AbortController,
): Promise<Response | null> {
	let resp: Response | null = null;
	for (let attempt = 0; attempt < 2; attempt += 1) {
		try {
			resp = await client.get('Company/kpis/date-range', {
				searchParams: { startDate, endDate },
				next: { tags: ['company'], revalidate: 30 },
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

export async function getCompanyCustom(
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
				const apiURL = api_lapa;
				const resp_lapa = await fetchCompanyKpis(
					apiURL,
					startDate,
					endDate,
					authHeaders,
					controller,
				);

				if (!resp_lapa || !resp_lapa.ok) {
					console.error(
						'getCompanyCustom: erro ao buscar dados (lapa)',
						resp_lapa?.status,
						resp_lapa?.statusText,
					);
					return null;
				}

				return resp_lapa.json();
			case 'andar_de_cima':
				const apiURL_andar_de_cima = api_andar_de_cima;
				const resp_andar_de_cima = await fetchCompanyKpis(
					apiURL_andar_de_cima,
					startDate,
					endDate,
					authHeaders,
					controller,
				);

				if (!resp_andar_de_cima || !resp_andar_de_cima.ok) {
					console.error(
						'getCompanyCustom: erro ao buscar dados (andar_de_cima)',
						resp_andar_de_cima?.status,
						resp_andar_de_cima?.statusText,
					);
					return null;
				}

				return resp_andar_de_cima.json();

			case 'tout':
				const apiURL_tout = api_tout;
				const resp_tout = await fetchCompanyKpis(
					apiURL_tout,
					startDate,
					endDate,
					authHeaders,
					controller,
				);

				if (!resp_tout || !resp_tout.ok) {
					console.error(
						'getCompanyCustom: erro ao buscar dados (tout)',
						resp_tout?.status,
						resp_tout?.statusText,
					);
					return null;
				}

				return resp_tout.json();

			default:
				const resp_ipiranga = await fetchCompanyKpis(
					api,
					startDate,
					endDate,
					authHeaders,
					controller,
				);

				if (!resp_ipiranga || !resp_ipiranga.ok) {
					console.error(
						'getCompanyCustom: erro ao buscar dados (ipiranga)',
						resp_ipiranga?.status,
						resp_ipiranga?.statusText,
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
