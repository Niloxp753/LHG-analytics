/** @format */

'use server';

import { getReservationsCustom } from '@/http/reservations/get-bookings-custom';

export async function getReservationsCustomAction(
	startDate: string | null,
	endDate: string | null,
	company?: string,
) {
	try {
		if (startDate && endDate) {
			const resp = await getReservationsCustom(startDate, endDate, company);
			return resp;
		}
	} catch (error) {
		console.error('getReservationsCustomAction: erro ao buscar dados', error);
		return null;
	}
}
