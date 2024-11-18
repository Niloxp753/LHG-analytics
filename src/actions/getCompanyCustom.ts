/** @format */

'use server';

import { getCompanyCustom } from '@/http/company/getCompanyCustom';

export async function getCompanyCustomAction(
	startDate: string | null,
	endDate: string | null,
) {
	try {
		if (startDate && endDate) {
			const resp = await getCompanyCustom(startDate, endDate);
			console.log(resp);
			return resp;
		}
		return null;
	} catch (error) {
		console.error(error);
		return null;
	}
}
