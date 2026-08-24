/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { type DashboardCacheMode } from '@/lib/dashboard-cache-policy';
import {
	resolveDashboardCompanyKey,
	type DashboardCompanyKey,
} from '@/lib/dashboard-company';
import { cacheLife, cacheTag } from 'next/cache';
import {
	api,
	getUnitApiClient,
} from '../api-client';
import { FetchFailedError } from '../conditional-cache';
import { handleKpiFetchFailure } from '../kpi-fetch-failure';
import { logRequestTimeout } from '../logging';
import { isRetryableError, isRetryableStatus } from '../retry';
import { withKpiRequestTimeout } from '../kpi-request-timeout';
import {
	captureKpiCacheFailure,
	getKpiCacheIdentityTag,
	unwrapKpiCacheResult,
} from '../kpi-cache-result';

async function fetchCompanyKpis(
	client: typeof api,
	startDate: string,
	endDate: string,
	authHeaders: Record<string, string> | undefined,
	controller: AbortController,
): Promise<Response | null> {
	let resp: Response | null = null;
	for (let attempt = 0; attempt < 2; attempt += 1) {
		try {
			resp = await client.get('Company/kpis/date-range', {
				searchParams: { startDate, endDate },
				headers:
					attempt === 0
						? authHeaders
						: {
								...(authHeaders ?? {}),
								'x-lhg-retry-attempt': String(attempt),
						  },
				signal: controller.signal,
				cache: 'no-store',
				throwHttpErrors: false,
			});

			if (resp.ok || !isRetryableStatus(resp.status) || attempt === 1) {
				break;
			}
		} catch (error) {
			if (!isRetryableError(error) || attempt === 1) {
				throw error;
			}
		}
	}
	return resp;
}

async function getCompanyCustomCached(
	startDate: string,
	endDate: string,
	cacheMode: DashboardCacheMode,
	company: DashboardCompanyKey,
) {
	'use cache: private';

	cacheTag('company');
	const companyKey = company;
	const requestName = `getCompanyCustom (${companyKey})`;
	cacheTag(
		getKpiCacheIdentityTag(
			'company-custom',
			startDate,
			endDate,
			cacheMode,
			companyKey,
		),
	);
	const cookieHeader = await buildAuthCookieHeader();
	const controller = new AbortController();
	const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;

	try {
		const resp = await withKpiRequestTimeout(
			fetchCompanyKpis(
				getUnitApiClient(companyKey),
				startDate,
				endDate,
				authHeaders,
				controller,
			),
			controller,
		);

		if (!resp || !resp.ok) {
			throw new FetchFailedError(
				requestName,
				resp?.status,
				resp?.statusText,
			);
		}

		const result = await resp.json();
		cacheLife('dashboard_session');
		return result;
	} catch (error) {
		cacheLife({ stale: 0, revalidate: 0, expire: 0 });
		return captureKpiCacheFailure(error, requestName);
	}
}

export async function getCompanyCustom(
	startDate: string,
	endDate: string,
	cacheMode: DashboardCacheMode,
	company?: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
	const companyKey = resolveDashboardCompanyKey(company);
	try {
		const result = await getCompanyCustomCached(
			startDate,
			endDate,
			cacheMode,
			companyKey,
		);
		return unwrapKpiCacheResult(result);
	} catch (error) {
		if (error instanceof FetchFailedError) {
			return handleKpiFetchFailure(error);
		}
		if (error instanceof Error && error.name === 'AbortError') {
			logRequestTimeout('getCompanyCustom');
			return null;
		}
		console.error('getCompanyCustom: erro inesperado', error);
		return null;
	}
}
