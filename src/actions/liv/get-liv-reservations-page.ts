/** @format */

'use server';

import { getLivReservationsKpis } from '@/http/liv/get-liv-reservations';
import {
	DEFAULT_RANGE_TAG,
	getRangeByTag,
	normalizeRangeTag,
} from '@/lib/date-range';
import type { LivReservationsKpisResponse } from '@/types/liv/reservations';

interface GetLivReservationsPageDataProps {
	period?: string;
	startDate?: string | null;
	endDate?: string | null;
}

export async function getLivReservationsPageData({
	endDate,
	period,
	startDate,
}: GetLivReservationsPageDataProps): Promise<{
	ok: boolean;
	data: LivReservationsKpisResponse | null;
	error: string | null;
}> {
	const normalized = normalizeRangeTag(period, DEFAULT_RANGE_TAG);
	const range = getRangeByTag(normalized);

	if (startDate && endDate) {
		const data = await getLivReservationsKpis(startDate, endDate);
		if (data) {
			return { ok: true, data, error: null };
		}
		return { ok: false, data: null, error: 'Erro ao encontrar dados' };
	}

	if (range) {
		const data = await getLivReservationsKpis(range.startDate, range.endDate);
		if (data) {
			return { ok: true, data, error: null };
		}
		return { ok: false, data: null, error: 'Erro ao encontrar dados' };
	}

	return { ok: false, data: null, error: 'Erro ao encontrar dados' };
}

