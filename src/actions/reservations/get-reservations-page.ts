/** @format */

'use server';

import { getBookingsUnified } from '@/http/reservations/getBookingsUnified';
import {
	DEFAULT_RANGE_TAG,
	getRangeByTag,
	normalizeRangeTag,
} from '@/lib/date-range';

interface getReservationPageDataProps {
	period?: string;
	startDate?: string | null;
	endDate?: string | null;
}

export async function getReservationPageData({
	endDate,
	period,
	startDate,
}: getReservationPageDataProps) {
	const normalized = normalizeRangeTag(period, DEFAULT_RANGE_TAG);
	const range = getRangeByTag(normalized);

	if (startDate && endDate) {
		const data = await getBookingsUnified(startDate, endDate);

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
		const data = await getBookingsUnified(range.startDate, range.endDate);

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
