/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { auth_api } from '../api-client';

export async function getRestaurantUnified(
	startDate: string,
	endDate: string,
): Promise<any | null> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 60000);
	const cookieHeader = buildAuthCookieHeader();
	const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;

	try {
		const resp = await auth_api.get('Restaurant/kpis/date-range', {
			searchParams: { startDate, endDate },
			next: { tags: ['restaurant'], revalidate: 30 },
			headers: authHeaders,
			signal: controller.signal,
		});

		if (!resp.ok) {
			console.error(
				'getRestaurantUnified: erro ao buscar dados',
				resp.status,
				resp.statusText,
			);
			return null;
		}

		return resp.json();
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			console.error('getRestaurantUnified: request timeout');
			return null;
		}
		console.error('getRestaurantUnified: erro inesperado', error);
		return null;
	} finally {
		clearTimeout(timeout);
	}
}
