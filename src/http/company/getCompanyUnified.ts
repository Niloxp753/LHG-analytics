/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { auth_api } from '../api-client';

export async function getCompanyUnified(
	startDate: string,
	endDate: string,
): Promise<any | null> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 60000);
	const cookieHeader = buildAuthCookieHeader();
	const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;

	try {
		const resp = await auth_api.get('Company/kpis/date-range', {
			searchParams: { startDate, endDate },
			next: { tags: ['company'], revalidate: 30 },
			headers: authHeaders,
			signal: controller.signal,
		});

		if (!resp.ok) {
			console.error(
				'getCompanyUnified: erro ao buscar dados',
				resp.status,
				resp.statusText,
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
