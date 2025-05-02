/** @format */

'use server';

import { getGovernance } from '@/http/operation/get-governance';
import { getOperationCustom } from '@/http/operation/get-governance-custom';
import { revalidatePath } from 'next/cache';

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
	} else {
		const dataiIpiranga = await getGovernance(newPeriod);
		const dataiLapa = await getGovernance(newPeriod, 'lapa');
		const dataiAndar = await getGovernance(newPeriod, 'andar_de_cima');
		const dataiTout = await getGovernance(newPeriod, 'tout');
		if (dataiIpiranga && dataiLapa && dataiAndar && dataiTout) {
			revalidatePath('/operational');
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
