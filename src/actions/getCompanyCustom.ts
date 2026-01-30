/** @format */

'use server';

import { getCompanyCustom } from '@/http/company/getCompanyCustom';

export async function getCompanyCustomAction(
	startDate: string | null,
	endDate: string | null,
	company?: string,
) {
	try {
		if (startDate && endDate) {
			const resp = await getCompanyCustom(startDate, endDate, company);
			return resp;
		}
	} catch (error) {
		console.error('getCompanyCustomAction: erro ao buscar dados', error);
		return null;
	}
}
