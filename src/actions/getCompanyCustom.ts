/** @format */

'use server';

import { getCompanyCustom } from '@/http/company/getCompanyCustom';
import { revalidateTag } from 'next/cache';

export async function getCompanyCustomAction(
	startDate: string,
	endDate: string,
) {
	try {
		const resp = await getCompanyCustom(startDate, endDate);
		revalidateTag('company');
		return resp;
	} catch (error) {
		console.error(error);
		throw new Error(`Algo deu errado ${error}`);
	}
}
