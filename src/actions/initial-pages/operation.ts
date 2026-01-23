/** @format */

'use server';

import { getOperationCustom } from '@/http/operation/get-governance-custom';
import { revalidatePath } from 'next/cache';
import {
	DEFAULT_RANGE_TAG,
	getRangeByTag,
	normalizeRangeTag,
} from '@/lib/date-range';

interface getOperationalPageDataProps {
	period?: string;
	startDate?: string | null;
	endDate?: string | null;
}

export async function getOperationalPageData({
	endDate,
	period,
	startDate,
}: getOperationalPageDataProps) {
	const normalized = normalizeRangeTag(period, DEFAULT_RANGE_TAG);
	const range = getRangeByTag(normalized);

	if (startDate && endDate) {
		const customDataIpiranga = await getOperationCustom(startDate, endDate);
		const customDataLapa = await getOperationCustom(startDate, endDate, 'lapa');
		const customDataAndarDeCima = await getOperationCustom(
			startDate,
			endDate,
			'andar_de_cima',
		);
		const customDataTout = await getOperationCustom(startDate, endDate, 'tout');

		if (
			customDataIpiranga &&
			customDataLapa &&
			customDataAndarDeCima &&
			customDataTout
		) {
			revalidatePath('/operational');
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
		const customDataIpiranga = await getOperationCustom(
			range.startDate,
			range.endDate,
		);
		const customDataLapa = await getOperationCustom(
			range.startDate,
			range.endDate,
			'lapa',
		);
		const customDataAndarDeCima = await getOperationCustom(
			range.startDate,
			range.endDate,
			'andar_de_cima',
		);
		const customDataTout = await getOperationCustom(
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
			revalidatePath('/operational');
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

