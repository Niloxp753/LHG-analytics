/** @format */

import { getOperationalPageData } from '@/actions/initial-pages/operation';
import { OperationalKpiContent } from './_components/operational-kpi-content';

export type OperationalPageDataResult = Awaited<
	ReturnType<typeof getOperationalPageData>
>;

export type OperationalKpiSectionProps = {
	description: string;
	endDate: string | null;
	startDate: string | null;
	period: string;
};

async function resolveOperationalData({
	period,
	startDate,
	endDate,
}: {
	period: string;
	startDate: string | null;
	endDate: string | null;
}): Promise<OperationalPageDataResult> {
	if (startDate && endDate) {
		const customData = await getOperationalPageData({
			startDate,
			endDate,
		});

		if (customData) {
			return customData;
		}

		return { ok: false, data: null, error: 'Algo deu errado' };
	}

	const data = await getOperationalPageData({ period });
	if (data) {
		return data;
	}

	return { ok: false, data: null, error: 'Algo deu errado' };
}

export async function OperationalKpiSection({
	description,
	endDate,
	startDate,
	period,
}: OperationalKpiSectionProps) {
	const resp = await resolveOperationalData({
		period,
		startDate,
		endDate,
	});

	return <OperationalKpiContent description={description} resp={resp} />;
}
