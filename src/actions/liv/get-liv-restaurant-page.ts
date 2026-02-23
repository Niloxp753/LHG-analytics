/** @format */

'use server';

import { getLivRestaurantKpis } from '@/http/liv/get-liv-restaurant';
import {
	DEFAULT_RANGE_TAG,
	getRangeByTag,
	normalizeRangeTag,
} from '@/lib/date-range';
import type { LivRestaurantKpisResponse } from '@/types/liv/restaurant';

interface GetLivRestaurantPageDataProps {
	period?: string;
	startDate?: string | null;
	endDate?: string | null;
}

export async function getLivRestaurantPageData({
	endDate,
	period,
	startDate,
}: GetLivRestaurantPageDataProps): Promise<{
	ok: boolean;
	data: LivRestaurantKpisResponse | null;
	error: string | null;
}> {
	const normalized = normalizeRangeTag(period, DEFAULT_RANGE_TAG);
	const range = getRangeByTag(normalized);

	if (startDate && endDate) {
		const data = await getLivRestaurantKpis(startDate, endDate);
		if (data) {
			return { ok: true, data, error: null };
		}
		return { ok: false, data: null, error: 'Erro ao encontrar dados' };
	}

	if (range) {
		const data = await getLivRestaurantKpis(range.startDate, range.endDate);
		if (data) {
			return { ok: true, data, error: null };
		}
		return { ok: false, data: null, error: 'Erro ao encontrar dados' };
	}

	return { ok: false, data: null, error: 'Erro ao encontrar dados' };
}

