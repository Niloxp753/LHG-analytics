/** @format */

'use server';

import { getReservationsCustom } from '@/http/reservations/get-bookings-custom';
import { resolveCustomDashboardCacheMode } from '@/lib/dashboard-cache-policy';
import type { DashboardCompanyKey } from '@/lib/dashboard-company';
import { requireKpiAccess } from '@/lib/kpi-authorization';

export async function getReservationsCustomAction(
	startDate: string | null,
	endDate: string | null,
	company?: DashboardCompanyKey,
) {
	await requireKpiAccess({ module: 'bookings', company });
	try {
		if (startDate && endDate) {
			const cacheMode = resolveCustomDashboardCacheMode(endDate);
			const resp = await getReservationsCustom(
				startDate,
				endDate,
				cacheMode,
				company,
			);
			return resp;
		}
	} catch (error) {
		console.error('getReservationsCustomAction: erro ao buscar dados', error);
		return null;
	}
}
