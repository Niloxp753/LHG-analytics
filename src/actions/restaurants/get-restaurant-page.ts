/** @format */

'use server';

import { getRestaurantsCustom } from '@/http/restaurant/get-restaurant-custom';
import { getRestaurants } from '@/http/restaurant/get-restaurants';
import { revalidatePath } from 'next/cache';

interface getReservationPageDataProps {
	period?: string;
	startDate?: string | null;
	endDate?: string | null;
}

export async function getRestaurantPageData({
	endDate,
	period,
	startDate,
}: getReservationPageDataProps) {
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

	if (startDate && endDate) {
		const customDataIpiranga = await getRestaurantsCustom(startDate, endDate);
		const customDataLapa = await getRestaurantsCustom(
			startDate,
			endDate,
			'lapa',
		);
		const customDataAndarDeCima = await getRestaurantsCustom(
			startDate,
			endDate,
			'andar_de_cima',
		);
		const customDataTout = await getRestaurantsCustom(
			startDate,
			endDate,
			'tout',
		);

		if (
			customDataIpiranga &&
			customDataLapa &&
			customDataAndarDeCima &&
			customDataTout
		) {
			revalidatePath('/restaurant');
			return {
				ok: true,
				data: [
					customDataIpiranga,
					customDataLapa,
					customDataAndarDeCima,
					customDataTout,
				],
				error: null,
			};
		} else {
			return {
				ok: false,
				data: null,
				error: 'Erro ao encontrar dados',
			};
		}
	} else {
		const dataiIpiranga = await getRestaurants(newPeriod);
		const dataiLapa = await getRestaurants(newPeriod, 'lapa');
		const dataiAndar = await getRestaurants(newPeriod, 'andar_de_cima');
		const dataiTout = await getRestaurants(newPeriod, 'tout');
		if (dataiIpiranga && dataiLapa && dataiAndar && dataiTout) {
			revalidatePath('/restaurant');
			return {
				ok: true,
				data: [dataiIpiranga, dataiLapa, dataiAndar, dataiTout],
				error: null,
			};
		} else {
			return {
				ok: false,
				data: null,
				error: 'Erro ao encontrar dados',
			};
		}
	}
}
