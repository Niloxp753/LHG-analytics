/** @format */

import React from 'react';
import Invoicing from '../components/kpis/Invoicing';
import Categories from '../components/kpis/InvoicingXCategories';
import InvoicingXLocation from '../components/kpis/InvoicingXLocation';
import LocationXRevPar from '../components/kpis/LocationXRevPar';
import LocationsXLocationsName from '../components/kpis/LocationsXLocationsName';
import Occupation from '../components/kpis/Occupation';
import TicketXRevPar from '../components/kpis/TicketXTRevPar';
import Header from '../components/Header';

export default function LushGuaruja({
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
					<h2 className='text-zinc-50 font-bold text-2xl'>
						Unidade <span className='text-violet-400'>Lush Guarujá</span>
					</h2>
					<Header />
				</div>
				<div className=' w-full h-full flex gap-2 flex-col justify-start mt-44'>
					<div className='flex w-full gap-2 h-full'>
						<div className='h-full w-1/2 flex items-center justify-center'>
							<InvoicingXLocation />
						</div>
						<div className='w-1/2'>
							<Invoicing />
						</div>
					</div>
					<div className='gap-2 h-full w-full flex justify-between'>
						<div className='w-1/3'>
							<Categories />
						</div>

						<div className='w-2/3 h-full gap-2 flex items-center justify-center flex-col'>
							<LocationXRevPar />
							<TicketXRevPar />
						</div>
					</div>
					<div className='flex h-full w-full gap-2'>
						<Occupation />
						<LocationsXLocationsName />
					</div>
				</div>
			</div>
		</main>
	);
}
