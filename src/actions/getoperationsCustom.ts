/** @format */

'use server';

import { getOperationCustom } from '@/http/operation/get-governance-custom';
import { resolveCustomDashboardCacheMode } from '@/lib/dashboard-cache-policy';
import type { DashboardCompanyKey } from '@/lib/dashboard-company';
import { requireKpiAccess } from '@/lib/kpi-authorization';

export async function getOperationCustomAction(
	startDate: string | null,
	endDate: string | null,
	company?: DashboardCompanyKey,
) {
	await requireKpiAccess({ module: 'governance', company });
	try {
		if (startDate && endDate) {
			const cacheMode = resolveCustomDashboardCacheMode(endDate);
			const resp = await getOperationCustom(
				startDate,
				endDate,
				cacheMode,
				company,
			);
			return resp;
		}
	} catch (error) {
		console.error('getOperationCustomAction: erro ao buscar dados', error);
		return null;
	}
}
