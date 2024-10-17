/** @format */

import InvoicingXChannel from '@/app/(dashboard)/reservations/components/kpis/InvoicingXChannel';
import { Blend, Coins, HandCoins, Sigma, SquarePercent } from 'lucide-react';
import { SiGoogleads, SiMeta } from 'react-icons/si';
import CardDetails from '../../../components/CardDetails';
import { TableReservs } from '../../../components/kpis/TableReservs';
import CategoriesXReservs from '../../components/kpis/CategoriesXReservs';
import EcommerceRevenue from '../../components/kpis/ecommerce-receita';
import EcommerceRevervs from '../../components/kpis/ecommerce-reservas';
import InvoicingXReservs from '../../components/kpis/InvoicingXReservs';
import InvoicingXTypes from '../../components/kpis/InvoicingXTypes';
import LocationsXReservs from '../../components/kpis/LocationsXReservs';
import Representation from '../../components/kpis/Representation';
import Header from '@/app/(dashboard)/components/Header';

export default function Page({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const open = searchParams.open || 'true';
	const menu = searchParams.menu;
	const preSet = searchParams.set || '7days';

	return (
		<main className='flex h-full w-full min-h-screen gap-2 flex-col justify-center bg-zinc-950 overflow-x-hidden md:px-5 py-10'>
			<div
				className={`relative w-full ${
					open == 'true' ? 'md:max-w-[82vw]' : 'md:max-w-[90vw]'
				}  md:ml-auto flex `}>
				<div
					className={`bg-zinc-950/50 py-4 w-full  ${
						open == 'true' ? 'md:w-[82vw]' : 'md:w-[90vw] '
					} backdrop-blur-md fixed z-40 top-0 flex flex-col items-center gap-5 md:justify-end `}>
					<h2 className='text-zinc-50 font-bold text-xl md:text-3xl text-center py-1.5'>
						Reservas -{' '}
						<span className='text-violet-400'> {''}Lush Ipiranga</span>
					</h2>
					<Header />
				</div>
				<div className=' w-full  flex gap-5 flex-col justify-start mt-28  px-3 md:px-0'>
					<div>
						{' '}
						<div
							className={`justify-between  items-center grid md:grid-cols-5 gap-5 grid-cols-1 `}>
							<CardDetails
								description={`${preSet == '7days' ? '7 dias atrás ' : ''} ${
									preSet == '30days' ? '30 dias atrás ' : ''
								} ${preSet == '6months' ? '6 meses atrás ' : ''}${
									preSet == '12months' ? '12 meses atrás ' : ''
								}`}
								type='money'
								icon={<HandCoins />}
								title={'Receita De Reservas'}
								value={341518}
							/>
							<CardDetails
								description={`${preSet == '7days' ? '7 dias atrás ' : ''} ${
									preSet == '30days' ? '30 dias atrás ' : ''
								} ${preSet == '6months' ? '6 meses atrás ' : ''}${
									preSet == '12months' ? '12 meses atrás ' : ''
								}`}
								icon={<Sigma />}
								title={'Número De Reservas'}
								value={397}
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
								value={860}
							/>

							<CardDetails
								description={`${preSet == '7days' ? '7 dias atrás' : ''} ${
									preSet == '30days' ? '30 dias atrás ' : ''
								} ${preSet == '6months' ? '6 meses atrás ' : ''}${
									preSet == '12months' ? '12 meses atrás ' : ''
								}`}
								icon={<Blend />}
								title={'Representatividade'}
								value={19}
							/>

							<CardDetails
								description={`${preSet == '7days' ? '7 dias atrás' : ''} ${
									preSet == '30days' ? '30 dias atrás ' : ''
								} ${preSet == '6months' ? '6 meses atrás ' : ''}${
									preSet == '12months' ? '12 meses atrás ' : ''
								}`}
								icon={<Blend />}
								title={'Meta de Repres.'}
								value={22}
							/>
						</div>
					</div>
					<div className='flex flex-col md:flex-row w-full gap-5'>
						<InvoicingXTypes />
						<InvoicingXChannel />
					</div>
					<div className='gap-5 h-fit w-full flex flex-col justify-between '>
						<CategoriesXReservs />
						<InvoicingXReservs />
					</div>
					<div className='flex items-center flex-col md:flex-row justify-between gap-5 h-full w-full'>
						<Representation />
						<LocationsXReservs />
					</div>
					<div>
						<TableReservs />
					</div>
					<div>
						<h2 className='text-2xl md:text-4xl font-bold text-zinc-50 mt-10 mb-5'>
							Indicadores de E-Commerce
						</h2>
						<div className='flex flex-col items-start justify-between gap-5'>
							<div className='w-full grid grid-cols-1 md:grid-cols-3  h-full justify-between gap-5'>
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
							<div className='w-full flex flex-col items-center justify-between gap-5'>
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
