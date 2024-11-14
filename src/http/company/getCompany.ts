/** @format */

import { api } from '../api-client';

export async function getCompany(period: string): Promise<any> {
	try {
		const resp = await api.get(`Company/kpis?period=${period}`, {
			next: { tags: ['company'] },
		});

		return resp.json();
	} catch (error) {
		console.log(error);
		throw new Error(`Algo deu errado - ${error}`);
	}
}
