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
			revalidateTag('company');
			return resp;
		}
	} catch (error) {
		console.log(error);
		return error;
	}
}
