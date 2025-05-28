/** @format */

'use server';

import { getRestaurants } from '@/http/restaurant/get-restaurants';
import { revalidatePath } from 'next/cache';

export async function getRestaurantsAction(period: string, company?: string) {
	let newPeriod = '';

	if (period === '30days') {
		newPeriod = 'LAST_30_D';
	}

	if (period === '7days') {
		newPeriod = 'LAST_7_D';
	}

	if (period === '6months') {
		newPeriod = 'LAST_6_M';
	}

	try {
		const resp = await getRestaurants(newPeriod, company);
		revalidatePath('/reservations');
		return resp;
	} catch (error) {
		console.log(error);
		return null;
	}
}
