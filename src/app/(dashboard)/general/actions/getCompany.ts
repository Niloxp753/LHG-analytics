/** @format */

'use server';

import { getCompany } from '@/http/company/getCompany';
import { revalidateTag } from 'next/cache';

export async function getCompanyAction(period: string) {
	let newPeriod = '';

	if (period === '30days') {
		newPeriod = 'LAST_30_D';
	}

	if (period === '7days') {
		newPeriod = 'LAST_7_D';
	}

	if (period === '6months') {
		newPeriod = 'LAST_6_M';
	}

	try {
		const resp = await getCompany(newPeriod);
		revalidateTag('company')
		return resp;
	} catch (error) {
		console.error(error);
		return error;
	}
}
