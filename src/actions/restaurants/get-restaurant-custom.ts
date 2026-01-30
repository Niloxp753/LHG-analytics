/** @format */

'use server';

import { getRestaurantsCustom } from '@/http/restaurant/get-restaurant-custom';

export async function getRestaurantsCustomAction(
	startDate: string | null,
	endDate: string | null,
	company?: string,
) {
	try {
		if (startDate && endDate) {
			const resp = await getRestaurantsCustom(startDate, endDate, company);
			return resp;
		}
	} catch (error) {
		console.error('getRestaurantsCustomAction: erro ao buscar dados', error);
		return null;
	}
}
