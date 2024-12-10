/** @format */

'use server';

import { getGovernance } from '@/_http/operation/get-governance';
import { revalidatePath } from 'next/cache';

export async function getGovernanceAction(period: string) {
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
		const resp = await getGovernance(newPeriod);
		revalidatePath('/');
		return resp;
	} catch (error) {
		console.log(error);
		return null;
	}
}
