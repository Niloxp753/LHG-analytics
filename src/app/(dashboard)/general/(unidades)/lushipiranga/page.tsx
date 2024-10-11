/** @format */

import {
	Activity,
	AlarmClockCheck,
	Crown,
	Cylinder,
	Database,
	DatabaseZap,
	DoorClosed,
	HandCoins,
	Sigma,
	SquarePercent,
} from 'lucide-react';
import CardDetails from '@/app/(dashboard)/components/CardDetails';
import Header from '@/app/(dashboard)/components/Header';
import Invoicing from '@/app/(dashboard)/components/kpis/Invoicing';
import Categories from '@/app/(dashboard)/components/kpis/InvoicingXCategories';
import InvoicingXLocation from '@/app/(dashboard)/components/kpis/InvoicingXLocation';
import Locations from '@/app/(dashboard)/components/kpis/Locations';
import Occupation from '@/app/(dashboard)/components/kpis/Occupation';
import TRevPar from '@/app/(dashboard)/components/kpis/TRevPar';
import { TableKpiCategory } from '@/app/(dashboard)/components/kpis/TableKpiCategory';
import Ticket from '@/app/(dashboard)/components/kpis/Ticket';
import RevPar from '@/app/(dashboard)/components/kpis/RevPar';
import OccupationCasaLush from '@/app/(dashboard)/components/kpis/OccupationCasaLush';
import { TableKpiGiro } from '@/app/(dashboard)/components/kpis/TableKpiGiro';
import { TableKpiOccupation } from '@/app/(dashboard)/components/kpis/TableKpiOccupation';

export default function LushIpiranga({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const open = searchParams.open || 'true';
	const menu = searchParams.menu;
	const preSet = searchParams.set || '7days';
	return (
		<main className='flex h-full w-full min-h-screen gap-2 flex-col justify-center bg-zinc-950 overflow-x-hidden px-3 md:px-5 py-10'>
			<div
				className={`relative w-full  ${
					open == 'true' ? 'md:max-w-[82vw]' : 'md:max-w-[90vw]'
				}  md:ml-auto flex z-40 `}>
				<div
					className={`bg-zinc-950/50 z-40 py-4 ml-auto w-[94vw] ${
						open == 'true' ? 'w-[82vw]' : 'w-[90vw] '
					} backdrop-blur-md fixed top-0 flex flex-col gap-2 justify-end `}>
					<h2 className='text-zinc-50 font-bold md:text-3xl text-center py-3 text-lg'>
						Geral - Unidade{' '}
						<span className='text-violet-400'>Lush Ipiranga</span>
					</h2>
					<Header />
				</div>
				<div className=' w-full h-full flex gap-5 flex-col justify-start mt-28'>
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
						<CardDetails
							description={`${preSet == '7days' ? '7 dias atrás ' : ''} ${
								preSet == '30days' ? '30 dias atrás ' : ''
							} ${preSet == '6months' ? '6 meses atrás ' : ''}${
								preSet == '12months' ? '12 meses atrás ' : ''
							}`}
							type='money'
							icon={<HandCoins />}
							title={'Faturamento'}
							value={120000}
						/>
						<CardDetails
							description={`${preSet == '7days' ? '7 dias atrás ' : ''} ${
								preSet == '30days' ? '30 dias atrás ' : ''
							} ${preSet == '6months' ? '6 meses atrás ' : ''}${
								preSet == '12months' ? '12 meses atrás ' : ''
							}`}
							icon={<Sigma />}
							title={'Locações'}
							value={500}
						/>
						<CardDetails
							description={`${preSet == '7days' ? '7 dias atrás' : ''} ${
								preSet == '30days' ? '30 dias atrá s' : ''
							} ${preSet == '6months' ? '6 meses atrás ' : ''}${
								preSet == '12months' ? '12 meses atrás ' : ''
							}`}
							type='money'
							icon={<SquarePercent />}
							title={'Ticket Médio'}
							value={240}
						/>
						<CardDetails
							description={`${preSet == '7days' ? '7 dias atrás ' : ''} ${
								preSet == '30days' ? '30 dias atrás ' : ''
							} ${preSet == '6months' ? '6 meses atrás ' : ''}${
								preSet == '12months' ? '12 meses atrás ' : ''
							}`}
							type='money'
							icon={<Activity />}
							title={'RevPar'}
							value={320}
						/>
						<CardDetails
							description={`${preSet == '7days' ? '7 dias atrás' : ''} ${
								preSet == '30days' ? '30 dias atrás ' : ''
							} ${preSet == '6months' ? '6 meses atrás ' : ''}${
								preSet == '12months' ? '12 meses atrás ' : ''
							}`}
							icon={<DoorClosed />}
							title={'Tx de Ocupação'}
							value={'40%'}
						/>
						<CardDetails
							description={`${preSet == '7days' ? '7 dias atrás ' : ''} ${
								preSet == '30days' ? '30 dias atrás ' : ''
							} ${preSet == '6months' ? '6 meses atrás ' : ''}${
								preSet == '12months' ? '12 meses atrás ' : ''
							}`}
							icon={<AlarmClockCheck />}
							title={'TMO'}
							value={'4 horas'}
						/>
					</div>
					<div className='flex w-full gap-5 h-full'>
						<div className='h-full w-full flex flex-col gap-5 items-center justify-center'>
							<InvoicingXLocation />
							<Invoicing />
						</div>
					</div>
					<div className='gap-5 h-full w-full flex flex-col md:flex-row justify-between '>
						<div className='md:w-1/2'>
							<Categories />
						</div>

						<div className='md:w-1/2 h-full flex gap-5 justify-between flex-col '>
							<Locations />
							<RevPar />
						</div>
					</div>
					<div className='flex gap-5 flex-col items-center'>
						<Ticket />
						<TRevPar />
					</div>
					<div className='flex flex-col  h-full w-full gap-5'>
						<Occupation />
						<OccupationCasaLush />
					</div>
					<div className='w-full h-full flex-col gap-5 md:flex-row flex items-baseline justify-between'>
						<div className='w-full'>
							<TableKpiCategory />
						</div>
					</div>
					<div className='flex gap-5 flex-col w-full'>
						<TableKpiGiro />
						<TableKpiOccupation />
					</div>
				</div>
			</div>
		</main>
	);
}
