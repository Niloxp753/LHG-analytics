/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { auth_api } from '../api-client';

export async function getBookingsUnified(
	startDate: string,
	endDate: string,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 60000);
	const cookieHeader = await buildAuthCookieHeader();
	const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;

	try {
		const resp = await auth_api.get('Bookings/kpis/date-range', {
			searchParams: { startDate, endDate },
			next: { tags: ['reservations'], revalidate: 30 },
			headers: authHeaders,
			signal: controller.signal,
			throwHttpErrors: false,
		});

		if (!resp.ok) {
			console.error(
				'getBookingsUnified: erro ao buscar dados',
				resp.status,
				resp.statusText,
			);
			return null;
		}

		return resp.json();
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			console.error('getBookingsUnified: request timeout');
			return null;
		}
		console.error('getBookingsUnified: erro inesperado', error);
		return null;
	} finally {
		clearTimeout(timeout);
	}
}
