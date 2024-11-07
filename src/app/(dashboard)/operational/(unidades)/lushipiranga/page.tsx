/** @format */

import { getCompanyAction } from '@/actions/getCompany';
import Header from '@/app/(dashboard)/components/Header';
import RevPar from '@/app/(dashboard)/components/kpis/RevPar';
import { TableKpiGiro } from '@/app/(dashboard)/components/kpis/TableKpiGiro';
import AfternoonCleaningWorkers from '../../_components/kpis-unidade/afternoon-cleaning-worker';
import MorningCleaningWorkers from '../../_components/kpis-unidade/morning-cleaning-worker';
import NightCleaningWorkers from '../../_components/kpis-unidade/night-cleaning-worker';
import TotalCleaning from '../../_components/kpis-unidade/total-cleaning';
import AvarageCleaning from '../../_components/kpis-unidade/avarage-cleaning';
import TableWokersMorning from '../../_components/kpis-unidade/table-workers-morning';
import TableWokersNight from '../../_components/kpis-unidade/table-workers-afternoon';
import TableWokersAfternoon from '../../_components/kpis-unidade/table-workers-afternoon';

export default async function LushIpiranga({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	const open = searchParams.open || 'true';
	const preSet = searchParams.set || '7days';

	const data = await getCompanyAction(preSet);

	return (
		<main className='flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-center bg-zinc-950 overflow-x-hidden py-10 md:px-5'>
			<div
				className={`relative  ${
					open == 'true' ? 'md:max-w-[82vw] ' : 'md:max-w-[90vw]'
				}   flex md:ml-auto  w-full `}>
				<div
					className={`bg-zinc-950/50 py-4 w-full ${
						open == 'true' ? 'md:w-[82vw]' : 'md:w-[90vw] '
					} backdrop-blur-md fixed top-0 z-40 flex flex-col gap-2 `}>
					<h2 className='text-zinc-50 font-bold md:text-3xl text-center py-1.5 text-xl'>
						Visão Operacional -{' '}
						<span className='text-violet-400'>Lush Ipiranga</span>
					</h2>
					<Header />
				</div>
				<div className=' w-full h-full flex gap-5 flex-col px-3 md:px-0 mt-28'>
					<div className='w-full h-full flex gap-5 justify-between flex-col '>
						<TotalCleaning />
						<AvarageCleaning />
					</div>
					<div className='flex gap-5 flex-col items-center'>
						<MorningCleaningWorkers />
						<AfternoonCleaningWorkers />
						<NightCleaningWorkers />
					</div>

					<div className='flex gap-5 flex-col w-full'>
						<TableWokersMorning />
						<TableWokersAfternoon />
						<TableWokersNight />
					</div>
				</div>
			</div>
		</main>
	);
}
