/** @format */

'use server';

import { getOperationCustom } from '@/http/operation/get-governance-custom';

export async function getOperationCustomAction(
	startDate: string | null,
	endDate: string | null,
	company?: string,
) {
	try {
		if (startDate && endDate) {
			const resp = await getOperationCustom(startDate, endDate, company);
			return resp;
		}
	} catch (error) {
		console.error('getOperationCustomAction: erro ao buscar dados', error);
		return null;
	}
}
