/** @format */

'use server';

import { getOperationCustom } from '@/http/operation/get-governance-custom';
import { revalidatePath } from 'next/cache';

export async function getOperationCustomAction(
	startDate: string | null,
	endDate: string | null,
	company?: string,
) {
	try {
		if (startDate && endDate) {
			const resp = await getOperationCustom(startDate, endDate, company);
			revalidatePath('/operational');
			return resp;
		}
	} catch (error) {
		console.log(error);
		return error;
	}
}
