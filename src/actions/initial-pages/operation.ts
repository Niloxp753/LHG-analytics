/** @format */

'use server';

import { getGovernanceUnified } from '@/http/operation/get-governance-unified';
import {
	DEFAULT_RANGE_TAG,
	getRangeByTag,
	normalizeRangeTag,
} from '@/lib/date-range';
import {
	resolveCustomDashboardCacheMode,
	resolvePresetDashboardCacheMode,
} from '@/lib/dashboard-cache-policy';
import { requireKpiAccess } from '@/lib/kpi-authorization';
import { connection } from 'next/server';

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
	await requireKpiAccess({ module: 'governance', consolidated: true });
	const normalized = normalizeRangeTag(period, DEFAULT_RANGE_TAG);

	if (startDate && endDate) {
		const cacheMode = resolveCustomDashboardCacheMode(endDate);
		const unifiedData = await getGovernanceUnified(
			startDate,
			endDate,
			cacheMode,
		);

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
	}

	await connection();
	const range = getRangeByTag(normalized);
	if (range) {
		const cacheMode = resolvePresetDashboardCacheMode(normalized);
		const unifiedData = await getGovernanceUnified(
			range.startDate,
			range.endDate,
			cacheMode,
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
