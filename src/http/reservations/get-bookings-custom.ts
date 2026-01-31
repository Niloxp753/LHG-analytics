/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { api, api_andar_de_cima, api_lapa, api_tout } from '../api-client';

export async function getReservationsCustom(
	startDate: string,
	endDate: string,
	company?: string,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 60000);
	const cookieHeader = await buildAuthCookieHeader();
	const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;

	try {
		switch (company) {
			case 'lapa':
				const resp_lapa = await api_lapa.get('Bookings/bookings/date-range', {
					searchParams: { startDate, endDate },
					next: { tags: ['reservations'], revalidate: 30 },
					headers: authHeaders,
					signal: controller.signal, // Passa o signal ao fetch
				});

				if (!resp_lapa.ok) {
					console.error(
						'getReservationsCustom: erro ao buscar dados (lapa)',
						resp_lapa.status,
						resp_lapa.statusText,
					);
					return null;
				}

				return resp_lapa.json();

			case 'tout':
				const resp_tout = await api_tout.get('Bookings/bookings/date-range', {
					searchParams: { startDate, endDate },
					next: { tags: ['reservations'], revalidate: 30 },
					headers: authHeaders,
					signal: controller.signal, // Passa o signal ao fetch
				});

				if (!resp_tout.ok) {
					console.error(
						'getReservationsCustom: erro ao buscar dados (tout)',
						resp_tout.status,
						resp_tout.statusText,
					);
					return null;
				}

				return resp_tout.json();

			case 'andar_de_cima':
				const resp_andar_de_cima = await api_andar_de_cima.get(
					'Bookings/bookings/date-range',
					{
						searchParams: { startDate, endDate },
						next: { tags: ['reservations'], revalidate: 30 },
						headers: authHeaders,
						signal: controller.signal, // Passa o signal ao fetch
					},
				);

				if (!resp_andar_de_cima.ok) {
					console.error(
						'getReservationsCustom: erro ao buscar dados (andar_de_cima)',
						resp_andar_de_cima.status,
						resp_andar_de_cima.statusText,
					);
					return null;
				}

				return resp_andar_de_cima.json();

			default:
				const resp = await api.get('Bookings/bookings/date-range', {
					searchParams: { startDate, endDate },
					next: { tags: ['reservations'], revalidate: 30 },
					headers: authHeaders,
					signal: controller.signal, // Passa o signal ao fetch
				});

				if (!resp.ok) {
					console.error(
						'getReservationsCustom: erro ao buscar dados (ipiranga)',
						resp.status,
						resp.statusText,
					);
					return null;
				}

				return resp.json();
		}
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			console.error('getReservationsCustom: request timeout');
			return null;
		}
		console.error('getReservationsCustom: erro inesperado', error);
		return null;
	} finally {
		clearTimeout(timeout); // Limpa o timeout
	}
}
