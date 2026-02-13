/** @format */

import { buildBackendAuthHeaders } from '@/lib/auth-headers';
import type { LivCompanyKpisResponse } from '@/types/liv/company';
import { api_liv } from '../api-client';
import { FetchFailedError, withConditionalCache } from '../conditional-cache';
import { isRetryableError, isRetryableStatus } from '../retry';

export async function getLivCompanyKpis(
	startDate: string,
	endDate: string,
): Promise<LivCompanyKpisResponse | null> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 30000);
	const authHeaders = await buildBackendAuthHeaders();

	try {
		return await withConditionalCache(
			{
				keyParts: ['liv', 'company', startDate, endDate],
				tags: ['company_liv'],
				revalidate: 30,
			},
			async () => {
				let resp: Response | null = null;
				for (let attempt = 0; attempt < 2; attempt += 1) {
					try {
						resp = await api_liv.get('Company/kpis/date-range', {
							searchParams: { startDate, endDate },
							headers: authHeaders,
							signal: controller.signal,
							throwHttpErrors: false,
							cache: 'no-store',
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

				if (!resp || !resp.ok) {
					throw new FetchFailedError(
						'getLivCompanyKpis',
						resp?.status,
						resp?.statusText,
					);
				}

				return (await resp.json()) as LivCompanyKpisResponse;
			},
		);
	} catch (error) {
		if (error instanceof FetchFailedError) {
			console.error(
				`${error.message}: erro ao buscar dados`,
				error.status,
				error.statusText,
			);
			return null;
		}
		if (error instanceof Error && error.name === 'AbortError') {
			console.error('getLivCompanyKpis: request timeout');
			return null;
		}
		console.error('getLivCompanyKpis: erro inesperado', error);
		return null;
	} finally {
		clearTimeout(timeout);
	}
}

