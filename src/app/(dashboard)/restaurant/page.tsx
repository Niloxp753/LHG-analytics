/** @format */

import { TableReservs } from '../components/kpis/TableReservs';
import CategoriesXReservs from '../reservations/components/kpis/CategoriesXReservs';
import InvoicingXChannel from '../reservations/components/kpis/InvoicingXChannel';
import InvoicingXReservs from '../reservations/components/kpis/InvoicingXReservs';
import InvoicingXTypes from '../reservations/components/kpis/InvoicingXTypes';
import Representation from '../reservations/components/kpis/Representation';
import HeaderRestaurants from './components/HeaderRestaurants';
import CMV from './components/kpis/cmv';
import { MinusSell } from './components/kpis/MinusSell';
import { MostSell } from './components/kpis/MostSell';
import RevenueABXCost from './components/kpis/revenueABXCost';
import RevenuePercent from './components/kpis/RevenuePercent';
import RevenueXGroup from './components/kpis/RevenueXGroup';
import TKTXLocation from './components/kpis/TKTXLocation';

export default function Restaurant({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const open = searchParams.open || 'true';

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
						Painel de <span className='text-violet-400'>Restaurantes</span>
					</h2>
					<HeaderRestaurants />
				</div>
				<div className=' w-full  flex gap-5 flex-col justify-start mt-60'>
					<div className='flex w-full gap-5 h-[320px]'>
						<div className='h-full w-full flex items-center justify-center'>
							<RevenueABXCost />
						</div>
					</div>
					<div className='h-full w-full flex items-center justify-center'>
						<CMV />
					</div>
					<div className='gap-5 h-fit w-full flex justify-between '>
						<RevenuePercent />
						<TKTXLocation />
					</div>
					<div className='flex items-center justify-between gap-5 h-full w-full'>
						<div className='w-1/2 h-full'>
							<MostSell />
						</div>
						<div className='w-1/2 h-full'>
							<MinusSell />
						</div>
					</div>
					<div className=''>
						<RevenueXGroup />
					</div>
				</div>
			</div>
		</main>
	);
}
