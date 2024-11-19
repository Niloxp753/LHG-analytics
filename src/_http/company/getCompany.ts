/** @format */

import { api } from '../api-client';

class HTTPError extends Error {}

export async function getCompany(period: string): Promise<any> {
	const resp = await api.get(`Company/kpis?period=${period}`, {
		next: { tags: ['company'] },
	});

	if (!resp.ok) {
		throw new HTTPError(`Fetch error: ${resp.statusText}`);
	}

	return resp.json();
}
