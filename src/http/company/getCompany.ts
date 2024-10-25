/** @format */

import { api } from '../api-client';

export async function getCompany(period: string): Promise<any> {
	const resp = await api.get(`Company/kpis?period=${period}`, {
		next: { tags: ['company'] },
	});

	return resp.json();
}
