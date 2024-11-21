/** @format */

'use server';

import { getCompanyCustom } from '@/_http/company/getCompanyCustom';
import { revalidatePath } from 'next/cache';

export async function getCompanyCustomAction(
	startDate: string | null,
	endDate: string | null,
) {
	try {
		if (startDate && endDate) {
			const resp = await getCompanyCustom(startDate, endDate);
			revalidatePath('/');
			return resp;
		}
	} catch (error) {
		console.log(error);
		return error;
	}
}
