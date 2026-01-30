/** @format */

'use server';

import { getRestaurantsCustom } from '@/http/restaurant/get-restaurant-custom';
import {
	DEFAULT_RANGE_TAG,
	getRangeByTag,
	normalizeRangeTag,
} from '@/lib/date-range';

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
		return resp;
	} catch (error) {
		console.error('getRestaurantsAction: erro ao buscar dados', error);
		return null;
	}
}

