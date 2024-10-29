/** @format */

import { Crown, Cylinder, Database, DatabaseZap } from 'lucide-react';
import CardDetails from '@/app/(dashboard)/components/CardDetails';
import Header from '@/app/(dashboard)/components/Header';
import Invoicing from '@/app/(dashboard)/components/kpis/Invoicing';
import Categories from '@/app/(dashboard)/components/kpis/InvoicingXCategories';
import InvoicingXLocation from '@/app/(dashboard)/components/kpis/InvoicingXLocation';
import Locations from '@/app/(dashboard)/components/kpis/Locations';
import Occupation from '@/app/(dashboard)/components/kpis/Occupation';
import OccupationCasaLush from '@/app/(dashboard)/components/kpis/OccupationCasaLush';
import RevPar from '@/app/(dashboard)/components/kpis/RevPar';
import TRevPar from '@/app/(dashboard)/components/kpis/TRevPar';

import { TableKpiGiro } from '@/app/(dashboard)/components/kpis/TableKpiGiro';
import { TableKpiOccupation } from '@/app/(dashboard)/components/kpis/TableKpiOccupation';
import Ticket from '@/app/(dashboard)/components/kpis/Ticket';

export default function AndarDeCima({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const open = searchParams.open || 'true';
	const menu = searchParams.menu;

	return (
		<main className='flex h-full w-full min-h-screen gap-2 flex-col justify-center bg-zinc-950 overflow-x-hidden px-5 py-10'>
			<div
				className={`relative w-full ${
					open == 'true' ? 'max-w-[82vw]' : 'max-w-[90vw]'
				}  ml-auto flex `}>
				<div
					className={`bg-zinc-950/50 py-4 ml-auto ${
						open == 'true' ? 'w-[82vw]' : 'w-[90vw] '
					} backdrop-blur-md fixed z-50 top-0 flex flex-col gap-2 justify-end `}>
					<h2 className='text-zinc-50 font-bold text-3xl'>
						Geral - Unidade
						<span className='text-violet-400'>Andar De Cima</span>
					</h2>
					<Header />
				</div>
				<div className=' w-full h-full flex gap-5 flex-col justify-start mt-52'>
					<div className='flex w-full gap-5 h-full'>
						<div className='h-full w-1/2 flex items-center justify-center'>
							<InvoicingXLocation />
						</div>
						<div className='w-1/2'>
							<Invoicing />
						</div>
					</div>
					<div className='gap-5 h-fit w-full flex justify-between '>
						<div className='w-1/3'>
							<Categories />
						</div>

						<div className='w-2/3 h-full flex gap-5 justify-between flex-col '>
							<Locations />

							<RevPar />
						</div>
					</div>
					<div className='flex gap-5 items-center'>
						<Ticket />
						<TRevPar />
					</div>
					<div className='flex h-full w-full gap-5'>
						<Occupation />
						<OccupationCasaLush />
					</div>
					<div className='w-full h-full flex items-baseline justify-between'>
						<div className='w-2/3'></div>
						<div className='w-1/4 flex flex-col h-full justify-between gap-5'>
							<CardDetails
								title={'Econômicas'}
								value={'37%'}
								icon={<Cylinder />}
								description='Lush Pop - Lush - Lush Hidro'
							/>
							<CardDetails
								title={'Intermediárias'}
								value={'36%'}
								icon={<Database />}
								description='Lush Lounge - Lush Spa - Lush Cine'
							/>
							<CardDetails
								title={'Premium'}
								value={'26%'}
								icon={<DatabaseZap />}
								description='Lush Splash - Lush Spa Splash'
							/>
							<CardDetails
								title={'Casa Lush'}
								value={'1%'}
								icon={<Crown />}
								description='Análise Separada Casa Lush'
							/>
						</div>
					</div>
					<div className='flex gap-5 flex-col'>
						<TableKpiGiro />
						<TableKpiOccupation />
					</div>
				</div>
			</div>
		</main>
	);
}
