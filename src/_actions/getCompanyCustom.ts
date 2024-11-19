/** @format */

'use server';

import { getCompanyCustom } from '@/_http/company/getCompanyCustom';
import { revalidateTag } from 'next/cache';

export async function getCompanyCustomAction(
	startDate: string | null,
	endDate: string | null,
) {
	try {
		if (startDate && endDate) {
			const resp = await getCompanyCustom(startDate, endDate);
			revalidateTag('customCompany');
			return resp;
		}
	} catch (error) {
		console.error(error);
		return error;
	}
}
