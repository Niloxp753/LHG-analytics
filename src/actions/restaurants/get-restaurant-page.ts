/** @format */

'use server';

import { getRestaurantUnified } from '@/http/restaurant/getRestaurantUnified';
import {
	DEFAULT_RANGE_TAG,
	getRangeByTag,
	normalizeRangeTag,
} from '@/lib/date-range';
import {
	resolveCustomDashboardCacheMode,
	resolvePresetDashboardCacheMode,
} from '@/lib/dashboard-cache-policy';

interface getRestaurantPageDataProps {
	period?: string;
	startDate?: string | null;
	endDate?: string | null;
}

export async function getRestaurantPageData({
	endDate,
	period,
	startDate,
}: getRestaurantPageDataProps) {
	const normalized = normalizeRangeTag(period, DEFAULT_RANGE_TAG);
	const range = getRangeByTag(normalized);

	if (startDate && endDate) {
		const cacheMode = resolveCustomDashboardCacheMode(endDate);
		const data = await getRestaurantUnified(startDate, endDate, cacheMode);

		if (data) {
			return {
				ok: true,
				data,
				error: null,
			};
		}
		return {
			ok: false,
			data: null,
			error: 'Erro ao encontrar dados',
		};
	} else if (range) {
		const cacheMode = resolvePresetDashboardCacheMode(normalized);
		const data = await getRestaurantUnified(
			range.startDate,
			range.endDate,
			cacheMode,
		);

		if (data) {
			return {
				ok: true,
				data,
				error: null,
			};
		}
		return {
			ok: false,
			data: null,
			error: 'Erro ao encontrar dados',
		};
	}
	return {
		ok: false,
		data: null,
		error: 'Erro ao encontrar dados',
	};
}
