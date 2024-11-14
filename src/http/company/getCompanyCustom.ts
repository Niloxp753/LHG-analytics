/** @format */

import { api } from '../api-client';

export async function getCompanyCustom(
	startDate: string,
	endDate: string,
): Promise<any> {
	try {
		const resp = await api.get(
			`Company/kpis/date-range?startDate=${startDate}&endDate=${endDate}`,
			{
				next: { tags: ['company'] },
				timeout: 45000,
				retry: 3,
			},
		);
		return resp.json();
	} catch (error) {
		console.log(error);
		throw new Error(`Algo deu errado - ${error}`);
	}
}
