/** @format */

'use server';

import { getReservationsCustom } from '@/http/reservations/get-bookings-custom';
import {
	DEFAULT_RANGE_TAG,
	getRangeByTag,
	normalizeRangeTag,
} from '@/lib/date-range';
import { resolvePresetDashboardCacheMode } from '@/lib/dashboard-cache-policy';
import type { DashboardCompanyKey } from '@/lib/dashboard-company';
import { requireKpiAccess } from '@/lib/kpi-authorization';
import { connection } from 'next/server';

export async function getReservationsAction(
	period: string,
	company?: DashboardCompanyKey,
) {
	await requireKpiAccess({ module: 'bookings', company });
	const normalized = normalizeRangeTag(period, DEFAULT_RANGE_TAG);
	await connection();
	const range = getRangeByTag(normalized);
	if (!range) {
		return null;
	}

	try {
		const cacheMode = resolvePresetDashboardCacheMode(normalized);
		const resp = await getReservationsCustom(
			range.startDate,
			range.endDate,
			cacheMode,
			company,
		);
		return resp;
	} catch (error) {
		console.error('getReservationsAction: erro ao buscar dados', error);
		return null;
	}
}
