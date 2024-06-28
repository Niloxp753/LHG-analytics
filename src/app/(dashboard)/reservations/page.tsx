/** @format */

import { Crown, Cylinder, Database, DatabaseZap } from 'lucide-react';
import CardDetails from '../components/CardDetails';
import Header from '../components/Header';
import Invoicing from '../components/kpis/Invoicing';
import Categories from '../components/kpis/InvoicingXCategories';
import InvoicingXLocation from '../components/kpis/InvoicingXLocation';
import Locations from '../components/kpis/Locations';
import Occupation from '../components/kpis/Occupation';
import OccupationCasaLush from '../components/kpis/OccupationCasaLush';
import RevPar from '../components/kpis/RevPar';
import TRevPar from '../components/kpis/TRevPar';
import Ticket from '../components/kpis/Ticket';
import { TableKpiCategory } from '../components/kpis/TableKpiCategory';
import { TableKpiGiro } from '../components/kpis/TableKpiGiro';
import { TableKpiOccupation } from '../components/kpis/TableKpiOccupation';
import InvoicingXChannel from '../components/kpis/InvoicingXChannel';

export default function Reservations({
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
						Painel de <span className='text-violet-400'>Reservas</span>
					</h2>
					<Header />
				</div>
				<div className=' w-full h-full flex gap-5 flex-col justify-start mt-60'>
					<div className='flex w-full gap-5 h-[340px]'>
						<div className='h-full w-full flex items-center justify-center'>
							<InvoicingXLocation />
						</div>
						<div className='w-1/2'>
							<InvoicingXChannel />
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

					<div>
						<Invoicing />
					</div>
				</div>
			</div>
		</main>
	);
}
