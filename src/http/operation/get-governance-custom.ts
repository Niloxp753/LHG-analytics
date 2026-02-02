/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { api, api_andar_de_cima, api_lapa, api_tout } from '../api-client';
import { isRetryableError, isRetryableStatus } from '../retry';

async function fetchGovernanceKpis(
	client: typeof api,
	startDate: string,
	endDate: string,
	authHeaders: Record<string, string> | undefined,
	controller: AbortController,
	revalidate: number,
): Promise<Response | null> {
	let resp: Response | null = null;
	for (let attempt = 0; attempt < 2; attempt += 1) {
		try {
			resp = await client.get('Governance/kpis/date-range', {
				searchParams: { startDate, endDate },
				next: { tags: ['operational'], revalidate },
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

export async function getOperationCustom(
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
			case 'tout':
				const resp_tout = await fetchGovernanceKpis(
					api_tout,
					startDate,
					endDate,
					authHeaders,
					controller,
					0,
				);

				if (!resp_tout || !resp_tout.ok) {
					console.error(
						'getOperationCustom: erro ao buscar dados (tout)',
						resp_tout?.status,
						resp_tout?.statusText,
					);
					return null;
				}

				return resp_tout.json();

			case 'andar_de_cima':
				const resp_andar_de_cima = await fetchGovernanceKpis(
					api_andar_de_cima,
					startDate,
					endDate,
					authHeaders,
					controller,
					30,
				);

				if (!resp_andar_de_cima || !resp_andar_de_cima.ok) {
					console.error(
						'getOperationCustom: erro ao buscar dados (andar_de_cima)',
						resp_andar_de_cima?.status,
						resp_andar_de_cima?.statusText,
					);
					return null;
				}

				return resp_andar_de_cima.json();

			case 'lapa':
				const resp_lapa = await fetchGovernanceKpis(
					api_lapa,
					startDate,
					endDate,
					authHeaders,
					controller,
					30,
				);

				if (!resp_lapa || !resp_lapa.ok) {
					console.error(
						'getOperationCustom: erro ao buscar dados (lapa)',
						resp_lapa?.status,
						resp_lapa?.statusText,
					);
					return null;
				}

				return resp_lapa.json();

			default:
				const resp = await fetchGovernanceKpis(
					api,
					startDate,
					endDate,
					authHeaders,
					controller,
					30,
				);

				if (!resp || !resp.ok) {
					console.error(
						'getOperationCustom: erro ao buscar dados (ipiranga)',
						resp?.status,
						resp?.statusText,
					);
					return null;
				}

				return resp.json();
		}
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			console.error('getOperationCustom: request timeout');
			return null;
		}
		console.error('getOperationCustom: erro inesperado', error);
		return null;
	} finally {
		clearTimeout(timeout); // Limpa o timeout
	}
}
