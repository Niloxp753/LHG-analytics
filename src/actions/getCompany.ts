/** @format */

'use server';

import { getCompanyCustom } from '@/http/company/getCompanyCustom';
import {
	DEFAULT_RANGE_TAG,
	getRangeByTag,
	normalizeRangeTag,
} from '@/lib/date-range';
import { resolvePresetDashboardCacheMode } from '@/lib/dashboard-cache-policy';

export async function getCompanyAction(period: string, company?: string) {
	const normalized = normalizeRangeTag(period, DEFAULT_RANGE_TAG);
	const range = getRangeByTag(normalized);
	if (!range) {
		return null;
	}

	try {
		const cacheMode = resolvePresetDashboardCacheMode(normalized);
		const resp = await getCompanyCustom(
			range.startDate,
			range.endDate,
			cacheMode,
			company,
		);
		return resp;
	} catch (error) {
		console.error('getCompanyAction: erro ao buscar dados', error);
		return null;
	}
}
