/** @format */

'use server';

import { getReservationsCustom } from '@/http/reservations/get-bookings-custom';
import { revalidatePath } from 'next/cache';

export async function getReservationsCustomAction(
	startDate: string | null,
	endDate: string | null,
	company?: string,
) {
	try {
		if (startDate && endDate) {
			const resp = await getReservationsCustom(startDate, endDate, company);
			revalidatePath('/reservations');
			return resp;
		}
	} catch (error) {
		console.log(error);
		return error;
	}
}
