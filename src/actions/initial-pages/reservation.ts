/** @format */

'use server';

import { getBookings } from '@/http/reservations/get-bookings';
import { getReservationsCustom } from '@/http/reservations/get-bookings-custom';
import { revalidatePath } from 'next/cache';

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
	} else {
		const dataiIpiranga = await getBookings(newPeriod);
		const dataiLapa = await getBookings(newPeriod, 'lapa');
		const dataiAndar = await getBookings(newPeriod, 'andar_de_cima');
		const dataiTout = await getBookings(newPeriod, 'tout');
		if (dataiIpiranga && dataiLapa && dataiAndar && dataiTout) {
			revalidatePath('/reservations');
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
