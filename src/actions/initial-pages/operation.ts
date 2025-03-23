/** @format */

'use server';

import { getGovernance } from '@/http/operation/get-governance';
import { revalidatePath } from 'next/cache';
import { getOperationCustom } from '@/http/operation/get-governance-custom';

interface getOperationPageDataProps {
	period?: string;
	startDate?: string | null;
	endDate?: string | null;
}

export async function getOperationPageData({
	endDate,
	period,
	startDate,
}: getOperationPageDataProps) {
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
		if (customDataIpiranga && customDataLapa) {
			revalidatePath('/operational');
			return {
				ok: true,
				data: [customDataIpiranga, customDataLapa],
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
		if (dataiIpiranga && dataiLapa) {
			revalidatePath('/operational');
			return {
				ok: true,
				data: [dataiIpiranga, dataiLapa],
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
