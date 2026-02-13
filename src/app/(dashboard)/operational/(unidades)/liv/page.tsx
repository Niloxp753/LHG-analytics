/** @format */

import { getLivOperationalPageData } from '@/actions/liv/get-liv-operational-page';
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
import {
	DEFAULT_RANGE_TAG,
	formatDateInput,
	getRangeDescription,
} from '@/lib/date-range';
import BigNumbersOperation from '../../_components/kpis-unidade/big-numbers-operation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	(await searchParams).menu = 'operational';
	const preSet = (await searchParams).set ?? DEFAULT_RANGE_TAG;
	const startDate = (await searchParams).startDate;
	const endDate = (await searchParams).endDate;
	const rangeDescription = getRangeDescription(preSet as string);

	const formattedStartDate = formatDateInput(startDate as string);
	const formattedEndDate = formatDateInput(endDate as string);

	const result = await getLivOperationalPageData({
		period: preSet as string,
		startDate: formattedStartDate,
		endDate: formattedEndDate,
	});
	const resp = result.ok ? result.data : null;

	if (!resp) {
		return (
			<main className='flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-center bg-zinc-950 overflow-x-hidden py-14 md:px-5 '>
				<div className={`relative md:max-w-[82vw] flex md:ml-auto  w-full `}>
					<div
						className={`bg-zinc-950/50 py-4 w-full md:w-[82vw] backdrop-blur-md fixed top-0 z-40 flex flex-col gap-2 `}>
						<h2 className='text-zinc-50 font-bold md:text-3xl text-center pb-1.5 pt-2.5 text-base'>
							Operacional -{' '}
							<span className='text-violet-400 text-base md:text-3xl'>
								LIV
							</span>
						</h2>
						<div className='hidden lg:block'>
							<Header />
						</div>
					</div>
					<div className=' w-full h-full flex gap-5 flex-col px-3 md:px-0 mt-12 md:mt-32'>
						<p className='text-zinc-100'>Não foi possível carregar os dados.</p>
					</div>
				</div>
			</main>
		);
	}

	const employeeCleaningByShiftSeries = resp.EmployeeCleaningByShift?.series ?? {};
	const morningShiftKey =
		Object.keys(employeeCleaningByShiftSeries).find((key) =>
			key.toLowerCase().startsWith('manh'),
		) ?? 'Manhã';
	const employeeReport = resp.EmployeeReport ?? {};
	const morningReportKey =
		Object.keys(employeeReport).find((key) => key.toLowerCase().startsWith('manh')) ??
		'Manhã';
	const hasTeamSizing =
		!!resp.TeamSizing &&
		typeof resp.TeamSizing === 'object' &&
		'Totals' in resp.TeamSizing;

	return (
		<main className='flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-center bg-zinc-950 overflow-x-hidden py-14 md:px-5 '>
			<div className={`relative md:max-w-[82vw] flex md:ml-auto  w-full `}>
				<div
					className={`bg-zinc-950/50 py-4 w-full md:w-[82vw] backdrop-blur-md fixed top-0 z-40 flex flex-col gap-2 `}>
					<h2 className='text-zinc-50 font-bold md:text-3xl text-center pb-1.5 pt-2.5 text-base'>
						Operacional -{' '}
						<span className='text-violet-400 text-base md:text-3xl'>LIV</span>
					</h2>
					<div className='hidden lg:block'>
						<Header />
					</div>
				</div>
				<div className=' w-full h-full flex gap-5 flex-col px-3 md:px-0 mt-12 md:mt-32'>
					<BigNumbersOperation
						data={resp.BigNumbers}
						description={rangeDescription}
					/>
					<div className='flex items-center gap-5 justify-between flex-col md:flex-row'>
						<Performance data={resp.SupervisorsPerformance} />
						<SuitesOutsourcedInternal data={resp.ShiftCleaning} />
					</div>
					<div className='w-full h-full flex gap-5 justify-between flex-col '>
						<TotalCleaning data={resp.CleaningByDate} />
					</div>
					<div className='flex gap-5 flex-col items-center'>
						<MorningCleaningWorkers
							categories={resp.EmployeeCleaningByShift.categories}
							series={employeeCleaningByShiftSeries[morningShiftKey] ?? null}
						/>
						<AfternoonCleaningWorkers
							categories={resp.EmployeeCleaningByShift.categories}
							series={employeeCleaningByShiftSeries.Tarde ?? null}
						/>
						<NightCleaningWorkers
							categories={resp.EmployeeCleaningByShift.categories}
							series={employeeCleaningByShiftSeries.Noite ?? null}
						/>
					</div>

					<div className='flex gap-5 flex-col w-full'>
						<TableWokersMorning
							dataTable={employeeReport[morningReportKey] ?? null}
						/>
						<TableWokersAfternoon dataTable={employeeReport.Tarde ?? null} />
						<TableWokersNight dataTable={employeeReport.Noite ?? null} />
						{hasTeamSizing ? (
							<TableWokersWeekly dataTable={resp.TeamSizing} idealNumber={9} />
						) : (
							<Alert
								variant='destructive'
								className='w-full'>
								<AlertTitle>Erro ao carregar</AlertTitle>
								<AlertDescription>
									Não foi possível carregar o dimensionamento de equipe.
								</AlertDescription>
							</Alert>
						)}
					</div>
				</div>
			</div>
		</main>
	);
}
