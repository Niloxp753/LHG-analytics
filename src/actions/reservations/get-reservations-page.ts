/** @format */

'use server';

import { getBookingsUnified } from '@/http/reservations/getBookingsUnified';
import { getLivReservationsKpis } from '@/http/liv/get-liv-reservations';
import {
	DEFAULT_RANGE_TAG,
	getRangeByTag,
	normalizeRangeTag,
} from '@/lib/date-range';
import { mergeLivIntoReservationsConsolidated } from '@/lib/merge-liv-into-consolidated';

interface getReservationPageDataProps {
	period?: string;
	startDate?: string | null;
	endDate?: string | null;
}

async function getMergedReservationsData(startDate: string, endDate: string) {
	const [data, livData] = await Promise.all([
		getBookingsUnified(startDate, endDate),
		getLivReservationsKpis(startDate, endDate),
	]);

	if (!data) {
		return null;
	}

	return mergeLivIntoReservationsConsolidated(data, livData);
}

export async function getReservationPageData({
	endDate,
	period,
	startDate,
}: getReservationPageDataProps) {
	const normalized = normalizeRangeTag(period, DEFAULT_RANGE_TAG);
	const range = getRangeByTag(normalized);

	if (startDate && endDate) {
		const data = await getMergedReservationsData(startDate, endDate);

		if (data) {
			return {
				ok: true,
				data,
				error: null,
			};
		}
		return {
			ok: false,
			data: null,
			error: 'Erro ao encontrar dados',
		};
	} else if (range) {
		const data = await getMergedReservationsData(range.startDate, range.endDate);

		if (data) {
			return {
				ok: true,
				data,
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

