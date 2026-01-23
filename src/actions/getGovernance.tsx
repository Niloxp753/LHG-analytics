/** @format */

'use server';

import { getOperationCustom } from '@/http/operation/get-governance-custom';
import {
	DEFAULT_RANGE_TAG,
	getRangeByTag,
	normalizeRangeTag,
} from '@/lib/date-range';
import { revalidatePath } from 'next/cache';

export async function getGovernanceAction(period: string, company?: string) {
	const normalized = normalizeRangeTag(period, DEFAULT_RANGE_TAG);
	const range = getRangeByTag(normalized);
	if (!range) {
		return null;
	}

	try {
		const resp = await getOperationCustom(range.startDate, range.endDate, company);
		revalidatePath('/operational');
		return resp;
	} catch (error) {
		console.log(error);
		return null;
	}
}

