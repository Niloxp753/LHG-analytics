/** @format */

'use server';

import { getRestaurantsCustom } from '@/http/restaurant/get-restaurant-custom';
import { resolveCustomDashboardCacheMode } from '@/lib/dashboard-cache-policy';
import type { DashboardCompanyKey } from '@/lib/dashboard-company';
import { requireKpiAccess } from '@/lib/kpi-authorization';

export async function getRestaurantsCustomAction(
	startDate: string | null,
	endDate: string | null,
	company?: DashboardCompanyKey,
) {
	await requireKpiAccess({ module: 'restaurant', company });
	try {
		if (startDate && endDate) {
			const cacheMode = resolveCustomDashboardCacheMode(endDate);
			const resp = await getRestaurantsCustom(
				startDate,
				endDate,
				cacheMode,
				company,
			);
			return resp;
		}
	} catch (error) {
		console.error('getRestaurantsCustomAction: erro ao buscar dados', error);
		return null;
	}
}
