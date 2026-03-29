/** @format */

'use server';

import { getCompanyUnified } from '@/http/company/getCompanyUnified';
import { getLivCompanyKpis } from '@/http/liv/get-liv-company';
import {
	DEFAULT_RANGE_TAG,
	getRangeByTag,
	normalizeRangeTag,
} from '@/lib/date-range';
import { mergeLivIntoGeneralConsolidated } from '@/lib/merge-liv-into-consolidated';

interface getGeneralPageDataProps {
	period?: string;
	startDate?: string | null;
	endDate?: string | null;
}

async function getMergedGeneralData(startDate: string, endDate: string) {
	const [data, livData] = await Promise.all([
		getCompanyUnified(startDate, endDate),
		getLivCompanyKpis(startDate, endDate),
	]);

	if (!data) {
		return null;
	}

	return mergeLivIntoGeneralConsolidated(data, livData);
}

export async function getGeneralPageData({
	endDate,
	period,
	startDate,
}: getGeneralPageDataProps) {
	const normalized = normalizeRangeTag(period, DEFAULT_RANGE_TAG);
	const range = getRangeByTag(normalized);

	if (startDate && endDate) {
		const data = await getMergedGeneralData(startDate, endDate);

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
		const data = await getMergedGeneralData(range.startDate, range.endDate);

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

