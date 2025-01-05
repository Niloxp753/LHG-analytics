/** @format */

import { api } from '../api-client';
class HTTPError extends Error {}

export async function getOperationCustom(
	startDate: string,
	endDate: string,
): Promise<any> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 60000);

	try {
		const resp = await api.get(
			`Governance/kpis/date-range?startDate=${startDate}&endDate=${endDate}`,
			{
				next: { tags: ['operational'] },
				cache: 'no-store',
				signal: controller.signal, // Passa o signal ao fetch
			},
		);

		if (!resp.ok) {
			throw new HTTPError(`Fetch error: ${resp.statusText}`);
		}

		return resp.json();
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
