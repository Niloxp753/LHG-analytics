/** @format */

'use server';

import { getReservationsCustom } from '@/http/reservations/get-bookings-custom';
import {
	DEFAULT_RANGE_TAG,
	getRangeByTag,
	normalizeRangeTag,
} from '@/lib/date-range';
import { revalidatePath } from 'next/cache';

export async function getReservationsAction(period: string, company?: string) {
	const normalized = normalizeRangeTag(period, DEFAULT_RANGE_TAG);
	const range = getRangeByTag(normalized);
	if (!range) {
		return null;
	}

	try {
		const resp = await getReservationsCustom(
			range.startDate,
			range.endDate,
			company,
		);
		revalidatePath('/reservations');
		return resp;
	} catch (error) {
		console.error('getReservationsAction: erro ao buscar dados', error);
		return null;
	}
}
