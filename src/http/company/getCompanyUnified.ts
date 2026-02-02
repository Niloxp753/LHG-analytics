/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { auth_api } from '../api-client';
import { isRetryableError, isRetryableStatus } from '../retry';

export async function getCompanyUnified(
	startDate: string,
	endDate: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 30000);
	const cookieHeader = await buildAuthCookieHeader();
	const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;

	try {
		let resp: Response | null = null;
		for (let attempt = 0; attempt < 2; attempt += 1) {
			try {
				resp = await auth_api.get('Company/kpis/date-range', {
					searchParams: { startDate, endDate },
					next: { tags: ['company'], revalidate: 30 },
					headers: authHeaders,
					signal: controller.signal,
					throwHttpErrors: false,
				});

				if (
					resp.ok ||
					!isRetryableStatus(resp.status) ||
					attempt === 1
				) {
					break;
				}
			} catch (error) {
				if (!isRetryableError(error) || attempt === 1) {
					throw error;
				}
			}
		}

		if (!resp || !resp.ok) {
			console.error(
				'getCompanyUnified: erro ao buscar dados',
				resp?.status,
				resp?.statusText,
			);
			return null;
		}

		return resp.json();
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			console.error('getCompanyUnified: request timeout');
			return null;
		}
		console.error('getCompanyUnified: erro inesperado', error);
		return null;
	} finally {
		clearTimeout(timeout);
	}
}
