/** @format */

'use server';

import { getRestaurantsCustom } from '@/http/restaurant/get-restaurant-custom';
import { revalidatePath } from 'next/cache';
import {
	DEFAULT_RANGE_TAG,
	getRangeByTag,
	normalizeRangeTag,
} from '@/lib/date-range';

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
	const normalized = normalizeRangeTag(period, DEFAULT_RANGE_TAG);
	const range = getRangeByTag(normalized);

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
	} else if (range) {
		const customDataIpiranga = await getRestaurantsCustom(
			range.startDate,
			range.endDate,
		);
		const customDataLapa = await getRestaurantsCustom(
			range.startDate,
			range.endDate,
			'lapa',
		);
		const customDataAndarDeCima = await getRestaurantsCustom(
			range.startDate,
			range.endDate,
			'andar_de_cima',
		);
		const customDataTout = await getRestaurantsCustom(
			range.startDate,
			range.endDate,
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
		}
		return {
			ok: false,
			data: null,
			error: 'Erro ao encontrar dados',
		};
	}
	return {
		ok: false,
		data: null,
		error: 'Erro ao encontrar dados',
	};
}

