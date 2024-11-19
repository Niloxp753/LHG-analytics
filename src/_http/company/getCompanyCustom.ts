/** @format */

import { api } from '../api-client';
class HTTPError extends Error {}

export async function getCompanyCustom(
	startDate: string,
	endDate: string,
): Promise<any> {
	const resp = await api.get(
		`Company/kpis/date-range?startDate=${startDate}&endDate=${endDate}`,
		{
			next: { tags: ['customCompany'] },
			cache: 'no-store',
		},
	);

	if (!resp.ok) {
		throw new HTTPError(`Fetch error: ${resp.statusText}`);
	}

	return resp.json();
}
