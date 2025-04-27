/** @format */

'use server';

import { getCompany } from '@/http/company/getCompany';
import { revalidatePath } from 'next/cache';
import { getCompanyCustom } from '@/http/company/getCompanyCustom';

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
	} else {
		const dataiIpiranga = await getCompany(newPeriod);
		const dataiLapa = await getCompany(newPeriod, 'lapa');
		const dataiAndar = await getCompany(newPeriod, 'andar_de_cima');
		const dataiTout = await getCompany(newPeriod, 'tout');
		if (dataiIpiranga && dataiLapa && dataiAndar && dataiTout) {
			revalidatePath('/general');
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
