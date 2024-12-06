/** @format */

import { api } from '../api-client';

class HTTPError extends Error {}

export async function getGovernance(period: string): Promise<any> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 60000);

	try {
		const resp = await api.get(`Governance/operational?period=${period}`, {
			next: { tags: ['operational'] },
			cache: 'no-store',
			signal: controller.signal,
		});

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
