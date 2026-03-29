/** @format */

'use server';

import { getGovernanceUnified } from '@/http/operation/get-governance-unified';
import { getLivOperationalKpis } from '@/http/liv/get-liv-operational';
import {
	DEFAULT_RANGE_TAG,
	getRangeByTag,
	normalizeRangeTag,
} from '@/lib/date-range';
import { mergeLivIntoOperationalConsolidated } from '@/lib/merge-liv-into-consolidated';

interface getOperationalPageDataProps {
	period?: string;
	startDate?: string | null;
	endDate?: string | null;
}

async function getMergedOperationalData(startDate: string, endDate: string) {
	const [unifiedData, livData] = await Promise.all([
		getGovernanceUnified(startDate, endDate),
		getLivOperationalKpis(startDate, endDate),
	]);

	if (!unifiedData) {
		return null;
	}

	return mergeLivIntoOperationalConsolidated(unifiedData, livData);
}

export async function getOperationalPageData({
	endDate,
	period,
	startDate,
}: getOperationalPageDataProps) {
	const normalized = normalizeRangeTag(period, DEFAULT_RANGE_TAG);
	const range = getRangeByTag(normalized);

	if (startDate && endDate) {
		const unifiedData = await getMergedOperationalData(startDate, endDate);

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
		const unifiedData = await getMergedOperationalData(
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
