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
import { getGovernanceAction } from '@/_actions/getGovernance';
import { revalidatePath } from 'next/cache';
import { format } from 'date-fns';

export default async function LushIpiranga({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	searchParams.menu = 'operational';
	const preSet = searchParams.set ?? '7days';
	const startDate = searchParams.startDate;
	const endDate = searchParams.endDate;

	const formattedStartDate =
		startDate && format(new Date(startDate!), 'dd/MM/yyyy');
	const formattedEndDate = endDate && format(new Date(endDate!), 'dd/MM/yyyy');

	// async function getData() {
	// 	if (startDate && endDate) {
	// 		const customData = await getCompanyCustomAction(
	// 			formattedStartDate!,
	// 			formattedEndDate!,
	// 		);
	// 		if (customData) {
	// 			revalidatePath('/');
	// 			return customData;
	// 		}
	// 	} else {
	// 		const data = await getGovernanceAction(preSet ?? '7days');
	// 		if (data) {
	// 			revalidatePath('/');
	// 			return data;
	// 		}
	// 	}
	// }

	// const resp = await getData();

	const data = await getGovernanceAction(preSet ?? '7days');

	return (
		<main className='flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-center bg-zinc-950 overflow-x-hidden py-10 md:px-5'>
			<div className={`relative md:max-w-[82vw] flex md:ml-auto  w-full `}>
				<div
					className={`bg-zinc-950/50 py-4 w-full md:w-[82vw] backdrop-blur-md fixed top-0 z-40 flex flex-col gap-2 `}>
					<h2 className='text-zinc-50 font-bold md:text-3xl text-center py-1.5 text-xl'>
						Operacional - <span className='text-violet-400'>Lush Ipiranga</span>
					</h2>
					<Header />
				</div>
				<div className=' w-full h-full flex gap-5 flex-col px-3 md:px-0 mt-32'>
					<div className='flex items-center gap-5 justify-between flex-col md:flex-row'>
						<Performance data={data.SupervisorsPerformance} />
						<SuitesOutsourcedInternal data={data.ShiftCleaning} />
					</div>
					<div className='w-full h-full flex gap-5 justify-between flex-col '>
						<TotalCleaning data={data.CleaningByDate} />
					</div>
					<div className='flex gap-5 flex-col items-center'>
						<MorningCleaningWorkers
							categories={data.EmployeeCleaningByShift.categories}
							series={data.EmployeeCleaningByShift.series[0]}
						/>
						<AfternoonCleaningWorkers
							categories={data.EmployeeCleaningByShift.categories}
							series={data.EmployeeCleaningByShift.series[1]}
						/>
						<NightCleaningWorkers
							categories={data.EmployeeCleaningByShift.categories}
							series={data.EmployeeCleaningByShift.series[2]}
						/>
					</div>

					<div className='flex gap-5 flex-col w-full'>
						<TableWokersMorning dataTable={data.EmployeeReport.Manhã} />
						<TableWokersAfternoon dataTable={data.EmployeeReport.Tarde} />
						<TableWokersNight dataTable={data.EmployeeReport.Noite} />
						<TableWokersWeekly />
					</div>
				</div>
			</div>
		</main>
	);
}
