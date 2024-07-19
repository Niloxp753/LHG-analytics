/** @format */

import InvoicingXChannel from '@/app/(dashboard)/reservations/components/kpis/InvoicingXChannel';
import { Coins, HandCoins, Sigma, SquarePercent } from 'lucide-react';
import { SiGoogleads, SiMeta } from 'react-icons/si';
import CardDetails from '../components/CardDetails';
import { TableReservs } from '../components/kpis/TableReservs';
import HeaderReservations from './components/HeaderReservations';
import CategoriesXReservs from './components/kpis/CategoriesXReservs';
import InvoicingXReservs from './components/kpis/InvoicingXReservs';
import InvoicingXTypes from './components/kpis/InvoicingXTypes';
import LocationsXReservs from './components/kpis/LocationsXReservs';
import Representation from './components/kpis/Representation';
import InvoicingXLocations from './components/kpis/RepXReservs';
import EcommerceRevervs from './components/kpis/ecommerce-reservas';
import EcommerceRevenue from './components/kpis/ecommerce-receita';

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
					<HeaderReservations />
				</div>
				<div className=' w-full h-full flex gap-5 flex-col justify-start mt-60'>
					<div className='flex w-full gap-5 h-[340px]'>
						<div className='h-full w-full flex items-center justify-center'>
							<LocationsXReservs />
						</div>
						<div className='w-1/2'>
							<InvoicingXChannel />
						</div>
					</div>
					<div className='gap-5 h-fit w-full flex justify-between '>
						<div className='w-1/3'>
							<CategoriesXReservs />
						</div>

						<div className='w-2/3 h-full flex gap-5 justify-between flex-col '>
							<InvoicingXLocations />
							<InvoicingXReservs />
						</div>
					</div>
					<div className='flex items-center justify-between gap-5'>
						<Representation />
						<InvoicingXTypes />
					</div>
					<div>
						<TableReservs />
					</div>
					<div>
						<h2 className='text-4xl font-bold text-zinc-50 mt-10 mb-5'>
							Indicadores de E-Commerce
						</h2>
						<div className='flex flex-col items-start justify-between gap-5'>
							<div className='w-full flex  h-full justify-between gap-5'>
								<CardDetails
									title={'Reservas'}
									value={'572'}
									icon={<Sigma />}
								/>
								<CardDetails
									title={'Receita'}
									value={'R$414.752'}
									icon={<HandCoins />}
								/>
								<CardDetails
									title={'Ticket Médio'}
									value={'R$725'}
									icon={<SquarePercent />}
								/>
								<CardDetails
									title={'Total em mídia'}
									value={'R$24.640'}
									icon={<Coins />}
								/>
								<CardDetails
									title={'investimento Meta'}
									value={'R$14.610'}
									icon={<SiMeta />}
								/>
								<CardDetails
									title={'investimento Google'}
									value={'R$10.040'}
									icon={<SiGoogleads />}
								/>
							</div>
							<div className='w-full flex items-center justify-between gap-5'>
								<EcommerceRevervs />
								<EcommerceRevenue />
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
