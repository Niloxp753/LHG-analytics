/** @format */

import { getReservationsAction } from '@/actions/reservations/get-reservations';
import Header from '@/app/(dashboard)/_components/Header';
import InvoicingXChannel from '@/app/(dashboard)/reservations/_components/kpis/InvoicingXChannel';
import { format } from 'date-fns';
import { Blend, Coins, HandCoins, Sigma, SquarePercent } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import { SiGoogleads, SiMeta } from 'react-icons/si';
import CardDetails from '../../../_components/CardDetails';
import { TableReservs } from '../../../_components/kpis/TableReservs';
import CategoriesXReservs from '../../_components/kpis/CategoriesXReservs';
import EcommerceRevenue from '../../_components/kpis/ecommerce-receita';
import EcommerceRevervs from '../../_components/kpis/ecommerce-reservas';
import InvoicingXReservs from '../../_components/kpis/InvoicingXReservs';
import InvoicingXTypes from '../../_components/kpis/InvoicingXTypes';
import LocationsXReservs from '../../_components/kpis/LocationsXReservs';
import Representation from '../../_components/kpis/Representation';
import BigNumbersReservation from '../../_components/big-numbers-reservations';

export default async function Page({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	const preSet = searchParams.set || '7days';
	searchParams.menu = 'operational';

	async function getData() {
		const data = await getReservationsAction(preSet ?? '7days', 'ipiranga');
		if (data) {
			revalidatePath('/reservations');
			return data;
		} else {
			return null;
		}
	}

	const resp = await getData();
	console.log(resp.BigNumbersEcommerce);

	return (
		<main className='flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-center bg-zinc-950 overflow-x-hidden py-14 md:px-5 '>
			<div className={`relative md:max-w-[82vw] flex md:ml-auto  w-full `}>
				<div
					className={`bg-zinc-950/50 py-4 w-full md:w-[82vw] backdrop-blur-md fixed top-0 z-40 flex flex-col gap-2 `}>
					<h2 className='text-zinc-50 font-bold md:text-3xl text-center py-1.5 text-xl'>
						Reservas -{' '}
						<span className='text-violet-400'> {''}Lush Ipiranga</span>
					</h2>
					<Header />
				</div>
				<div className=' w-full h-full flex gap-5 flex-col px-3 md:px-0 mt-20 md:mt-32'>
					<BigNumbersReservation
						data={resp?.BigNumbers}
						description={`${preSet == '7days' ? '7 dias atrás ' : ''} ${
							preSet == '30days' ? '30 dias atrás ' : ''
						} ${preSet == '6months' ? '6 meses atrás ' : ''}${
							preSet == '12months' ? '12 meses atrás ' : ''
						}`}
					/>
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
