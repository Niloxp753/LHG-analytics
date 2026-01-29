/** @format */

'use server';

import { getCompanyCustom } from '@/http/company/getCompanyCustom';
import {
	DEFAULT_RANGE_TAG,
	getRangeByTag,
	normalizeRangeTag,
} from '@/lib/date-range';
import { revalidatePath } from 'next/cache';

export async function getCompanyAction(period: string, company?: string) {
	const normalized = normalizeRangeTag(period, DEFAULT_RANGE_TAG);
	const range = getRangeByTag(normalized);
	if (!range) {
		return null;
	}

	try {
		const resp = await getCompanyCustom(range.startDate, range.endDate, company);
		revalidatePath('/general');
		return resp;
	} catch (error) {
		console.error('getCompanyAction: erro ao buscar dados', error);
		return null;
	}
}

