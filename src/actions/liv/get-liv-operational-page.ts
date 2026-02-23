/** @format */

'use server';

import { getLivOperationalKpis } from '@/http/liv/get-liv-operational';
import {
	DEFAULT_RANGE_TAG,
	getRangeByTag,
	normalizeRangeTag,
} from '@/lib/date-range';
import type { LivOperationalKpisResponse } from '@/types/liv/operational';

interface GetLivOperationalPageDataProps {
	period?: string;
	startDate?: string | null;
	endDate?: string | null;
}

export async function getLivOperationalPageData({
	endDate,
	period,
	startDate,
}: GetLivOperationalPageDataProps): Promise<{
	ok: boolean;
	data: LivOperationalKpisResponse | null;
	error: string | null;
}> {
	const normalized = normalizeRangeTag(period, DEFAULT_RANGE_TAG);
	const range = getRangeByTag(normalized);

	if (startDate && endDate) {
		const data = await getLivOperationalKpis(startDate, endDate);
		if (data) {
			return { ok: true, data, error: null };
		}
		return { ok: false, data: null, error: 'Erro ao encontrar dados' };
	}

	if (range) {
		const data = await getLivOperationalKpis(range.startDate, range.endDate);
		if (data) {
			return { ok: true, data, error: null };
		}
		return { ok: false, data: null, error: 'Erro ao encontrar dados' };
	}

	return { ok: false, data: null, error: 'Erro ao encontrar dados' };
}

