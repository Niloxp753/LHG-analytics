/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { api, api_altana, api_andar_de_cima, api_lapa, api_tout } from '../api-client';
import { FetchFailedError } from '../conditional-cache';
import { applyPrivateDashboardCache } from '../cache-profiles';
import { logFetchFailed, logRequestTimeout } from '../logging';
import { isRetryableError, isRetryableStatus } from '../retry';

async function fetchReservationsData(
	client: typeof api,
	startDate: string,
	endDate: string,
	authHeaders: Record<string, string> | undefined,
	controller: AbortController,
): Promise<Response | null> {
	let resp: Response | null = null;
	for (let attempt = 0; attempt < 2; attempt += 1) {
		try {
			resp = await client.get('Bookings/bookings/date-range', {
				searchParams: { startDate, endDate },
				headers: authHeaders,
				signal: controller.signal,
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

async function getReservationsCustomCached(
	startDate: string,
	endDate: string,
	company: string | undefined,
	cookieHeader: string | null,
) {
	'use cache: private';

	applyPrivateDashboardCache(['reservations'], 'dashboard');

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 30000);
	const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;

	try {
		const companyKey = company ?? 'ipiranga';
		let resp: Response | null = null;
		switch (companyKey) {
			case 'lapa':
				resp = await fetchReservationsData(
					api_lapa,
					startDate,
					endDate,
					authHeaders,
					controller,
				);
				break;
			case 'tout':
				resp = await fetchReservationsData(
					api_tout,
					startDate,
					endDate,
					authHeaders,
					controller,
				);
				break;
			case 'altana':
				resp = await fetchReservationsData(
					api_altana,
					startDate,
					endDate,
					authHeaders,
					controller,
				);
				break;
			case 'andar_de_cima':
				resp = await fetchReservationsData(
					api_andar_de_cima,
					startDate,
					endDate,
					authHeaders,
					controller,
				);
				break;
			default:
				resp = await fetchReservationsData(
					api,
					startDate,
					endDate,
					authHeaders,
					controller,
				);
				break;
		}

		if (!resp || !resp.ok) {
			throw new FetchFailedError(
				`getReservationsCustom (${companyKey})`,
				resp?.status,
				resp?.statusText,
			);
		}

		return resp.json();
	} finally {
		clearTimeout(timeout);
	}
}

export async function getReservationsCustom(
	startDate: string,
	endDate: string,
	company?: string,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
	const cookieHeader = await buildAuthCookieHeader();

	try {
		return await getReservationsCustomCached(
			startDate,
			endDate,
			company,
			cookieHeader,
		);
	} catch (error) {
		if (error instanceof FetchFailedError) {
			logFetchFailed(error);
			return null;
		}
		if (error instanceof Error && error.name === 'AbortError') {
			logRequestTimeout('getReservationsCustom');
			return null;
		}
		console.error('getReservationsCustom: erro inesperado', error);
		return null;
	}
}
