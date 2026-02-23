/** @format */

'use server';

import { getLivCompanyKpis } from '@/http/liv/get-liv-company';
import {
	DEFAULT_RANGE_TAG,
	getRangeByTag,
	normalizeRangeTag,
} from '@/lib/date-range';
import type { LivCompanyKpisResponse } from '@/types/liv/company';

interface GetLivCompanyPageDataProps {
	period?: string;
	startDate?: string | null;
	endDate?: string | null;
}

export async function getLivCompanyPageData({
	endDate,
	period,
	startDate,
}: GetLivCompanyPageDataProps): Promise<{
	ok: boolean;
	data: LivCompanyKpisResponse | null;
	error: string | null;
}> {
	const normalized = normalizeRangeTag(period, DEFAULT_RANGE_TAG);
	const range = getRangeByTag(normalized);

	if (startDate && endDate) {
		const data = await getLivCompanyKpis(startDate, endDate);
		if (data) {
			return { ok: true, data, error: null };
		}
		return { ok: false, data: null, error: 'Erro ao encontrar dados' };
	}

	if (range) {
		const data = await getLivCompanyKpis(range.startDate, range.endDate);
		if (data) {
			return { ok: true, data, error: null };
		}
		return { ok: false, data: null, error: 'Erro ao encontrar dados' };
	}

	return { ok: false, data: null, error: 'Erro ao encontrar dados' };
}

