/** @format */

import { getOperationalPageData } from '@/actions/initial-pages/operation';
import type { ShiftCleaning } from './types';
import AfternoonCleaning from './_components/kpis-geral/afternoon-cleaning';
import BigNumbersPageOp from './_components/kpis-geral/big-numbers';
import CleaningAverageUnity from './_components/kpis-geral/cleaning-average-unity';
import MorningCleaning from './_components/kpis-geral/morning-cleaning';
import NightCleaning from './_components/kpis-geral/night-cleaning ';
import PerformanceUnity from './_components/kpis-geral/Performance-unity';
import TotalCleaningUnity from './_components/kpis-geral/total-cleaning-unity';

type OperationalPageDataResult = Awaited<
	ReturnType<typeof getOperationalPageData>
>;

type OperationalKpiSectionProps = {
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

function OperationalKpiContent({
	description,
	resp,
}: {
	description: string;
	resp?: OperationalPageDataResult;
}) {
	const isLoading = typeof resp === 'undefined';
	const hasError = !isLoading && (!resp.ok || !resp.data);
	const errorMessage =
		!isLoading && hasError
			? resp.error
				? resp.error
				: 'Não foi possível carregar os dados.'
			: undefined;

	const unifiedData = !isLoading && !hasError ? resp.data : null;
	const bigNumbers = isLoading
		? undefined
		: hasError
			? null
			: unifiedData?.BigNumbers;
	const cleaningsByCompany = isLoading
		? undefined
		: hasError
			? null
			: unifiedData?.CleaningsByCompany;
	const averageCleaningByCompany = isLoading
		? undefined
		: hasError
			? null
			: unifiedData?.AverageCleaningByCompany;
	const inspectionsByCompany = isLoading
		? undefined
		: hasError
			? null
			: unifiedData?.InspectionsByCompany;
	const shiftCleaning: ShiftCleaning | null | undefined = isLoading
		? undefined
		: hasError
			? null
			: unifiedData?.ShiftCleaning;

	return (
		<div
			data-testid={isLoading ? 'operational-kpis-loading' : undefined}
			className='w-full h-full flex gap-5 flex-col px-3 md:px-0'>
			<div className='flex gap-5 flex-col w-full h-full'>
				<BigNumbersPageOp data={bigNumbers} description={description} />
				<div className='w-full h-full flex gap-5 flex-col md:flex-row'>
					<TotalCleaningUnity
						data={cleaningsByCompany}
						error={errorMessage}
					/>
					<CleaningAverageUnity
						data={averageCleaningByCompany}
						error={errorMessage}
					/>
					<PerformanceUnity
						data={inspectionsByCompany}
						error={errorMessage}
					/>
				</div>
			</div>
			<div className='flex flex-col gap-5'>
				<MorningCleaning error={errorMessage} data={shiftCleaning} />
				<AfternoonCleaning error={errorMessage} data={shiftCleaning} />
				<NightCleaning error={errorMessage} data={shiftCleaning} />
			</div>
		</div>
	);
}

export function OperationalKpiFallback({
	description,
}: Pick<OperationalKpiSectionProps, 'description'>) {
	return <OperationalKpiContent description={description} />;
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
