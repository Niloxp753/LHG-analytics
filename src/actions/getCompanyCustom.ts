/** @format */

'use server';

import { getCompanyCustom } from '@/http/company/getCompanyCustom';
import { resolveCustomDashboardCacheMode } from '@/lib/dashboard-cache-policy';

export async function getCompanyCustomAction(
	startDate: string | null,
	endDate: string | null,
	company?: string,
) {
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
