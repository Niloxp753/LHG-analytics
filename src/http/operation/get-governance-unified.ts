/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { auth_api } from '../api-client';
import { isRetryableError, isRetryableStatus } from '../retry';

export async function getGovernanceUnified(
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
				resp = await auth_api.get('Governance/kpis/date-range', {
					searchParams: { startDate, endDate },
					next: { tags: ['operational'], revalidate: 30 },
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
				'getGovernanceUnified: erro ao buscar dados',
				resp?.status,
				resp?.statusText,
			);
			return null;
		}

		return resp.json();
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			console.error('getGovernanceUnified: request timeout');
			return null;
		}
		console.error('getGovernanceUnified: erro inesperado', error);
		return null;
	} finally {
		clearTimeout(timeout);
	}
}
