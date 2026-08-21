/** @format */

import type { ShiftCleaning } from '../types';
import AfternoonCleaning from './kpis-geral/afternoon-cleaning';
import BigNumbersPageOp from './kpis-geral/big-numbers';
import CleaningAverageUnity from './kpis-geral/cleaning-average-unity';
import MorningCleaning from './kpis-geral/morning-cleaning';
import NightCleaning from './kpis-geral/night-cleaning ';
import PerformanceUnity from './kpis-geral/Performance-unity';
import TotalCleaningUnity from './kpis-geral/total-cleaning-unity';
import type { OperationalPageDataResult } from '../kpi-section';

export function OperationalKpiContent({
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
