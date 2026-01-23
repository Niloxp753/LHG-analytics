/** @format */

import Header from '@/app/(dashboard)/_components/Header';
import AfternoonCleaningWorkers from '../../_components/kpis-unidade/afternoon-cleaning-worker';
import MorningCleaningWorkers from '../../_components/kpis-unidade/morning-cleaning-worker';
import NightCleaningWorkers from '../../_components/kpis-unidade/night-cleaning-worker';
import TableWokersMorning from '../../_components/kpis-unidade/table-workers-morning';
import TableWokersWeekly from '../../_components/kpis-unidade/table-workers-weekly';
import TotalCleaning from '../../_components/kpis-unidade/total-cleaning';
import Performance from '../../_components/kpis-unidade/performance';
import SuitesOutsourcedInternal from '../../_components/kpis-unidade/suites-outsourced-internal';
import TableWokersAfternoon from '../../_components/kpis-unidade/table-workers-afternoon';
import TableWokersNight from '../../_components/kpis-unidade/table-workers-nigh';
import { getGovernanceAction } from '@/actions/getGovernance';
import { revalidatePath } from 'next/cache';
import { DEFAULT_RANGE_TAG, formatDateInput, getRangeDescription } from '@/lib/date-range';
import BigNumbersOperation from '../../_components/kpis-unidade/big-numbers-operation';
import { getOperationCustomAction } from '@/actions/getoperationsCustom';

export default async function LushIpiranga({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	searchParams.menu = 'operational';
	const preSet = searchParams.set ?? DEFAULT_RANGE_TAG;
	const startDate = searchParams.startDate;
	const endDate = searchParams.endDate;
	const rangeDescription = getRangeDescription(preSet);

	const formattedStartDate = formatDateInput(startDate);
	const formattedEndDate = formatDateInput(endDate);

	async function getData() {
		if (formattedStartDate && formattedEndDate) {
			const customData = await getOperationCustomAction(
				formattedStartDate!,
				formattedEndDate!,
			);
			if (customData) {
				revalidatePath('/');
				return customData;
			}
		} else {
			const data = await getGovernanceAction(preSet ?? DEFAULT_RANGE_TAG);
			if (data) {
				revalidatePath('/');
				return data;
			}
		}
	}

	const resp = await getData();

	return (
		<main className='flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-center bg-zinc-950 overflow-x-hidden py-14 md:px-5 '>
			<div className={`relative md:max-w-[82vw] flex md:ml-auto  w-full `}>
				<div
					className={`bg-zinc-950/50 py-4 w-full md:w-[82vw] backdrop-blur-md fixed top-0 z-40 flex flex-col gap-2 `}>
					<h2 className='text-zinc-50 font-bold md:text-3xl text-center pb-1.5 pt-2.5 text-base'>
						Operacional -{' '}
						<span className='text-violet-400 text-base md:text-3xl'>
							Lush Ipiranga
						</span>
					</h2>
					<div className='hidden lg:block'>
						<Header />
					</div>
				</div>
				<div className=' w-full h-full flex gap-5 flex-col px-3 md:px-0 mt-12 md:mt-32'>
					<BigNumbersOperation
						data={resp?.BigNumbers}
						description={rangeDescription}
					/>
					<div className='flex items-center gap-5 justify-between flex-col md:flex-row'>
						<Performance data={resp?.SupervisorsPerformance} />
						<SuitesOutsourcedInternal data={resp?.ShiftCleaning} />
					</div>
					<div className='w-full h-full flex gap-5 justify-between flex-col '>
						<TotalCleaning data={resp?.CleaningByDate} />
					</div>
					<div className='flex gap-5 flex-col items-center'>
						<MorningCleaningWorkers
							categories={resp?.EmployeeCleaningByShift.categories}
							series={resp?.EmployeeCleaningByShift.series['Manhã']}
						/>
						<AfternoonCleaningWorkers
							categories={resp?.EmployeeCleaningByShift.categories}
							series={resp?.EmployeeCleaningByShift.series.Tarde}
						/>
						<NightCleaningWorkers
							categories={resp?.EmployeeCleaningByShift.categories}
							series={resp?.EmployeeCleaningByShift.series.Noite}
						/>
					</div>

					<div className='flex gap-5 flex-col w-full'>
						<TableWokersMorning dataTable={resp?.EmployeeReport.Manhã} />
						<TableWokersAfternoon dataTable={resp?.EmployeeReport.Tarde} />
						<TableWokersNight dataTable={resp?.EmployeeReport.Noite} />
						<TableWokersWeekly
							dataTable={resp?.TeamSizing}
							idealNumber={7}
						/>
					</div>
				</div>
			</div>
		</main>
	);
}




