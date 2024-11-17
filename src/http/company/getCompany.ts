/** @format */

import { api } from '../api-client';

export async function getCompany(period: string): Promise<any> {
	try {
		const resp = await api.get(`Company/kpis?period=${period}`, {
			next: { tags: ['company'] },
			timeout: 45000,
			retry: 3,
		});

		return resp.json();
	} catch (error) {
		console.log(error);
		return null;
	}
}
