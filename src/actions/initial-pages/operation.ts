/** @format */

'use server';

import { getGovernanceUnified } from '@/http/operation/get-governance-unified';
import {
	DEFAULT_RANGE_TAG,
	getRangeByTag,
	normalizeRangeTag,
} from '@/lib/date-range';

interface getOperationalPageDataProps {
	period?: string;
	startDate?: string | null;
	endDate?: string | null;
}

export async function getOperationalPageData({
	endDate,
	period,
	startDate,
}: getOperationalPageDataProps) {
	const normalized = normalizeRangeTag(period, DEFAULT_RANGE_TAG);
	const range = getRangeByTag(normalized);

	if (startDate && endDate) {
		const unifiedData = await getGovernanceUnified(startDate, endDate);

		if (unifiedData) {
			return {
				ok: true,
				data: unifiedData,
				error: null,
			};
		} else {
			return {
				ok: false,
				data: null,
				error: 'Erro ao encontrar dados',
			};
		}
	} else if (range) {
		const unifiedData = await getGovernanceUnified(
			range.startDate,
			range.endDate,
		);

		if (unifiedData) {
			return {
				ok: true,
				data: unifiedData,
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
