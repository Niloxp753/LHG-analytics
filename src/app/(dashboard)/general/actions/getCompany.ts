/** @format */

'use server';

import { getCompany } from '@/http/company/getCompany';

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
	const resp = await getCompany(newPeriod);
	if (resp) {
		return resp;
	}
	return null;
}
