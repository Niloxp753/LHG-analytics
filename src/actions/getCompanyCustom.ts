/** @format */

'use server';

import { getCompanyCustom } from '@/http/company/getCompanyCustom';
import { resolveCustomDashboardCacheMode } from '@/lib/dashboard-cache-policy';
import type { DashboardCompanyKey } from '@/lib/dashboard-company';
import { requireKpiAccess } from '@/lib/kpi-authorization';

export async function getCompanyCustomAction(
	startDate: string | null,
	endDate: string | null,
	company?: DashboardCompanyKey,
) {
	await requireKpiAccess({ module: 'company', company });
	try {
		if (startDate && endDate) {
			const cacheMode = resolveCustomDashboardCacheMode(endDate);
			const resp = await getCompanyCustom(
				startDate,
				endDate,
				cacheMode,
				company,
			);
			return resp;
		}
	} catch (error) {
		console.error('getCompanyCustomAction: erro ao buscar dados', error);
		return null;
	}
}
