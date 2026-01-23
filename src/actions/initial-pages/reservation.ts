/** @format */

'use server';

import { getReservationsCustom } from '@/http/reservations/get-bookings-custom';
import { revalidatePath } from 'next/cache';
import {
	DEFAULT_RANGE_TAG,
	getRangeByTag,
	normalizeRangeTag,
} from '@/lib/date-range';

interface getReservationsPageDataProps {
	period?: string;
	startDate?: string | null;
	endDate?: string | null;
}

export async function getReservationsPageData({
	endDate,
	period,
	startDate,
}: getReservationsPageDataProps) {
	const normalized = normalizeRangeTag(period, DEFAULT_RANGE_TAG);
	const range = getRangeByTag(normalized);

	if (startDate && endDate) {
		const customDataIpiranga = await getReservationsCustom(startDate, endDate);
		const customDataLapa = await getReservationsCustom(
			startDate,
			endDate,
			'lapa',
		);
		const customDataAndarDeCima = await getReservationsCustom(
			startDate,
			endDate,
			'andar_de_cima',
		);
		const customDataTout = await getReservationsCustom(
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
			revalidatePath('/reservations');
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
		const customDataIpiranga = await getReservationsCustom(
			range.startDate,
			range.endDate,
		);
		const customDataLapa = await getReservationsCustom(
			range.startDate,
			range.endDate,
			'lapa',
		);
		const customDataAndarDeCima = await getReservationsCustom(
			range.startDate,
			range.endDate,
			'andar_de_cima',
		);
		const customDataTout = await getReservationsCustom(
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
			revalidatePath('/reservations');
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

