/** @format */

'use server';

import { revalidatePath } from 'next/cache';
import { getCompanyCustom } from '@/http/company/getCompanyCustom';
import {
	DEFAULT_RANGE_TAG,
	getRangeByTag,
	normalizeRangeTag,
} from '@/lib/date-range';

interface getGeneralPageDataProps {
	period?: string;
	startDate?: string | null;
	endDate?: string | null;
}

export async function getGeneralPageData({
	endDate,
	period,
	startDate,
}: getGeneralPageDataProps) {
	const normalized = normalizeRangeTag(period, DEFAULT_RANGE_TAG);
	const range = getRangeByTag(normalized);

	if (startDate && endDate) {
		const customDataIpiranga = await getCompanyCustom(startDate, endDate);
		const customDataLapa = await getCompanyCustom(startDate, endDate, 'lapa');
		const customDataAndarDeCima = await getCompanyCustom(
			startDate,
			endDate,
			'andar_de_cima',
		);
		const customDataTout = await getCompanyCustom(startDate, endDate, 'tout');

		if (
			customDataIpiranga &&
			customDataLapa &&
			customDataAndarDeCima &&
			customDataTout
		) {
			revalidatePath('/general');
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
		const customDataIpiranga = await getCompanyCustom(
			range.startDate,
			range.endDate,
		);
		const customDataLapa = await getCompanyCustom(
			range.startDate,
			range.endDate,
			'lapa',
		);
		const customDataAndarDeCima = await getCompanyCustom(
			range.startDate,
			range.endDate,
			'andar_de_cima',
		);
		const customDataTout = await getCompanyCustom(
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
			revalidatePath('/general');
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

