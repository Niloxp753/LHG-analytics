/** @format */

'use server';

import { getRestaurantUnified } from '@/http/restaurant/getRestaurantUnified';
import { getLivRestaurantKpis } from '@/http/liv/get-liv-restaurant';
import {
	DEFAULT_RANGE_TAG,
	getRangeByTag,
	normalizeRangeTag,
} from '@/lib/date-range';
import { mergeLivIntoRestaurantConsolidated } from '@/lib/merge-liv-into-consolidated';

interface getRestaurantPageDataProps {
	period?: string;
	startDate?: string | null;
	endDate?: string | null;
}

async function getMergedRestaurantData(startDate: string, endDate: string) {
	const [data, livData] = await Promise.all([
		getRestaurantUnified(startDate, endDate),
		getLivRestaurantKpis(startDate, endDate),
	]);

	if (!data) {
		return null;
	}

	return mergeLivIntoRestaurantConsolidated(data, livData);
}

export async function getRestaurantPageData({
	endDate,
	period,
	startDate,
}: getRestaurantPageDataProps) {
	const normalized = normalizeRangeTag(period, DEFAULT_RANGE_TAG);
	const range = getRangeByTag(normalized);

	if (startDate && endDate) {
		const data = await getMergedRestaurantData(startDate, endDate);

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
		const data = await getMergedRestaurantData(range.startDate, range.endDate);

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
