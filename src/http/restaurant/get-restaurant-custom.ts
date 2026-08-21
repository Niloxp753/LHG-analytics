/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { type DashboardCacheMode } from '@/lib/dashboard-cache-policy';
import { cacheLife, cacheTag } from 'next/cache';
import {
	api,
	getUnitApiClient,
} from '../api-client';
import { FetchFailedError } from '../conditional-cache';
import { logFetchFailed, logRequestTimeout } from '../logging';
import { isRetryableError, isRetryableStatus } from '../retry';
import { withKpiRequestTimeout } from '../kpi-request-timeout';
import {
	captureKpiCacheFailure,
	getKpiCacheIdentityTag,
	unwrapKpiCacheResult,
} from '../kpi-cache-result';

async function fetchRestaurantData(
	client: typeof api,
	startDate: string,
	endDate: string,
	authHeaders: Record<string, string> | undefined,
	controller: AbortController,
): Promise<Response | null> {
	let resp: Response | null = null;
	for (let attempt = 0; attempt < 2; attempt += 1) {
		try {
			resp = await client.get('Restaurants/restaurants/date-range', {
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

async function getRestaurantsCustomCached(
	startDate: string,
	endDate: string,
	cacheMode: DashboardCacheMode,
	company: string | undefined,
	cookieHeader: string | null,
) {
	'use cache';

	cacheTag('restaurant');
	const companyKey = company ?? 'ipiranga';
	const requestName = `getRestaurantsCustom (${companyKey})`;
	cacheTag(
		getKpiCacheIdentityTag(
			'restaurant-custom',
			startDate,
			endDate,
			cacheMode,
			companyKey,
			cookieHeader,
		),
	);

	const controller = new AbortController();
	const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;
	let failed = false;
	let result: unknown;

	try {
		const resp = await withKpiRequestTimeout(
			fetchRestaurantData(
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

		result = await resp.json();
	} catch (error) {
		failed = true;
		result = captureKpiCacheFailure(error, requestName);
	}

	if (failed) {
		cacheLife({ stale: 0, revalidate: 0, expire: 0 });
	} else if (cacheMode === 'historical') {
		cacheLife('dashboard_historical');
	} else {
		cacheLife('dashboard');
	}
	return result;
}

export async function getRestaurantsCustom(
	startDate: string,
	endDate: string,
	cacheMode: DashboardCacheMode,
	company?: string,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
	const cookieHeader = await buildAuthCookieHeader();
	try {
		const result = await getRestaurantsCustomCached(
			startDate,
			endDate,
			cacheMode,
			company,
			cookieHeader,
		);
		return unwrapKpiCacheResult(result);
	} catch (error) {
		if (error instanceof FetchFailedError) {
			logFetchFailed(error);
			return null;
		}
		if (error instanceof Error && error.name === 'AbortError') {
			logRequestTimeout('getRestaurantsCustom');
			return null;
		}
		console.error('getRestaurantsCustom: erro inesperado', error);
		return null;
	}
}
