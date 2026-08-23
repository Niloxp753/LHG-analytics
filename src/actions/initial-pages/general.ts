/** @format */

'use server';

import { getCompanyUnified } from '@/http/company/getCompanyUnified';
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
	await requireKpiAccess({ module: 'company', consolidated: true });
	const normalized = normalizeRangeTag(period, DEFAULT_RANGE_TAG);

	if (startDate && endDate) {
		const cacheMode = resolveCustomDashboardCacheMode(endDate);
		const data = await getCompanyUnified(startDate, endDate, cacheMode);

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

	await connection();
	const range = getRangeByTag(normalized);
	if (range) {
		const cacheMode = resolvePresetDashboardCacheMode(normalized);
		const data = await getCompanyUnified(
			range.startDate,
			range.endDate,
			cacheMode,
		);

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
