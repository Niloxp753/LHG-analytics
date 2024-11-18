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
				next: { tags: ['customCompany'] },
				cache:'no-store'
			},
		);
		return resp.json();
	} catch (error) {
		console.log(error);
		return null;
	}
}
