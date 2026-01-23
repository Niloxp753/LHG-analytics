/** @format */

'use server';

import { getRestaurantsCustom } from '@/http/restaurant/get-restaurant-custom';
import {
	DEFAULT_RANGE_TAG,
	getRangeByTag,
	normalizeRangeTag,
} from '@/lib/date-range';
import { revalidatePath } from 'next/cache';

export async function getRestaurantsAction(period: string, company?: string) {
	const normalized = normalizeRangeTag(period, DEFAULT_RANGE_TAG);
	const range = getRangeByTag(normalized);
	if (!range) {
		return null;
	}

	try {
		const resp = await getRestaurantsCustom(
			range.startDate,
			range.endDate,
			company,
		);
		revalidatePath('/restaurant');
		return resp;
	} catch (error) {
		console.log(error);
		return null;
	}
}

