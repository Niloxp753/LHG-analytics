/** @format */

'use server';

import { getCompanyUnified } from '@/http/company/getCompanyUnified';
import {
	DEFAULT_RANGE_TAG,
	getRangeByTag,
	normalizeRangeTag,
} from '@/lib/date-range';

interface getGeneralPageDataProps {
	period?: string;
	startDate?: string | null;
	endDate?: string | null;
}

export async function getGeneralPageData({
	endDate,
	period,
	startDate,
}: getGeneralPageDataProps) {
	const normalized = normalizeRangeTag(period, DEFAULT_RANGE_TAG);
	const range = getRangeByTag(normalized);

	if (startDate && endDate) {
		const data = await getCompanyUnified(startDate, endDate);

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
		const data = await getCompanyUnified(range.startDate, range.endDate);

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
