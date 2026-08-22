/** @format */

import { getGeneralPageData } from '@/actions/initial-pages/general';
import { GeneralKpiContent } from './_components/general-kpi-content';

export type GeneralPageDataResult = Awaited<ReturnType<typeof getGeneralPageData>>;

export type GeneralKpiSectionProps = {
	endDate: string | null;
	rangeDescription: string;
	startDate: string | null;
	period: string;
};

async function resolveGeneralData({
	period,
	startDate,
	endDate,
}: {
	period: string;
	startDate: string | null;
	endDate: string | null;
}): Promise<GeneralPageDataResult> {
	if (startDate && endDate) {
		const customData = await getGeneralPageData({
			startDate,
			endDate,
		});

		if (customData) {
			return customData;
		}

		return { ok: false, data: null, error: 'Algo deu errado' };
	}

	const data = await getGeneralPageData({ period });
	if (data) {
		return data;
	}

	return { ok: false, data: null, error: 'Algo deu errado' };
}

export async function GeneralKpiSection({
	endDate,
	rangeDescription,
	startDate,
	period,
}: GeneralKpiSectionProps) {
	const resp = await resolveGeneralData({
		period,
		startDate,
		endDate,
	});

	return <GeneralKpiContent rangeDescription={rangeDescription} resp={resp} />;
}
