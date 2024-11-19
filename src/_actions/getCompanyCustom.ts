/** @format */

'use server';

import { getCompanyCustom } from '@/_http/company/getCompanyCustom';

export async function getCompanyCustomAction(
	startDate: string | null,
	endDate: string | null,
) {
	try {
		if (startDate && endDate) {
			const resp = await getCompanyCustom(startDate, endDate);
			return resp;
		}
	} catch (error) {
		console.error(error);
		return error;
	}
}
