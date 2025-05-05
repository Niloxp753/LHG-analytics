/** @format */

import CardDetails from '@/app/(dashboard)/_components/CardDetails';
import Header from '@/app/(dashboard)/_components/Header';
import {
	DiamondPercent,
	HandCoins,
	Sigma,
	SquarePercent,
	TrendingUp,
} from 'lucide-react';
import { AReports } from '../../_components/kpis/AReports';
import { BReports } from '../../_components/kpis/BReports';
import CategoryA from '../../_components/kpis/CategoryA';
import CategoryB from '../../_components/kpis/CategoryB';
import Cmv from '../../_components/kpis/cmv';
import CoustDayXWorker from '../../_components/kpis/CoustDayXWorker';
import CoustXAB from '../../_components/kpis/CoustXAB';
import CoustXWorker from '../../_components/kpis/CoustXWorker';
import { CReports } from '../../_components/kpis/CReports';
import { MinusSell } from '../../_components/kpis/MinusSell';
import { MostSell } from '../../_components/kpis/MostSell';
import RevenueABXCost from '../../_components/kpis/revenueABXCost';
import RevenuePercent from '../../_components/kpis/RevenuePercent';
import RevenueXGroup from '../../_components/kpis/RevenueXGroup';
import TKTXLocation from '../../_components/kpis/TKTXLocation';
import GenerateBadge from '@/app/(dashboard)/general/_components/generate-badge';

export default function Restaurant({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const preSet = searchParams.set || '7days';
	const menu = 'restaurant';

	return (
		<main className='flex h-full w-full min-h-screen gap-2 flex-col justify-center bg-zinc-950 overflow-x-hidden px-3 md:px-5 py-10'>
			<div className={`relative w-full  md:max-w-[82vw] md:ml-auto flex z-40 `}>
				<div
					className={`bg-zinc-950/50 z-40 py-4 ml-auto w-full  md:w-[82vw] backdrop-blur-md fixed top-0 flex flex-col gap-2 justify-end `}>
					<h2 className='text-zinc-50 font-bold md:text-3xl text-center py-2 text-lg'>
						Restaurante - <span className='text-violet-400'>Andar de Cima</span>
					</h2>
					<div className='hidden lg:block'>
						<Header />
					</div>
				</div>
				<div className=' w-full  flex gap-5 flex-col justify-start mt-12 lg:mt-32'>
					<div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>
						<CardDetails
							description={`${
								preSet == '7days' ? '7 dias atrás R$ 321.005,00' : ''
							} ${preSet == '30days' ? '30 dias atrás ' : ''} ${
								preSet == '6months' ? '6 meses atrás ' : ''
							}${preSet == '12months' ? '12 meses atrás ' : ''}`}
							type='money'
							icon={<HandCoins />}
							title={'Receita De A&B'}
							value={341518}
							Badge={
								<GenerateBadge
									val={341518}
									previousVal={321005}
								/>
							}
						/>
						<CardDetails
							description={`${preSet == '7days' ? '7 dias atrás 254' : ''} ${
								preSet == '30days' ? '30 dias atrás ' : ''
							} ${preSet == '6months' ? '6 meses atrás ' : ''}${
								preSet == '12months' ? '12 meses atrás ' : ''
							}`}
							icon={<Sigma />}
							title={'Nº De Vendas'}
							value={397}
							Badge={
								<GenerateBadge
									val={397}
									previousVal={254}
								/>
							}
						/>
						<CardDetails
							description={`${
								preSet == '7days' ? '7 dias atrás R$ 794,00' : ''
							} ${preSet == '30days' ? '30 dias atrá s' : ''} ${
								preSet == '6months' ? '6 meses atrás ' : ''
							}${preSet == '12months' ? '12 meses atrás ' : ''}`}
							type='money'
							icon={<SquarePercent />}
							title={'Ticket Médio A&B'}
							value={860}
							Badge={
								<GenerateBadge
									val={860}
									previousVal={794}
								/>
							}
						/>

						<CardDetails
							description={`${
								preSet == '7days' ? '7 dias atrás R$ 598,00' : ''
							} ${preSet == '30days' ? '30 dias atrás ' : ''} ${
								preSet == '6months' ? '6 meses atrás ' : ''
							}${preSet == '12months' ? '12 meses atrás ' : ''}`}
							icon={<DiamondPercent />}
							type='money'
							title={'TKT Médio A&B / Locação'}
							value={668}
							Badge={
								<GenerateBadge
									val={668}
									previousVal={598}
								/>
							}
						/>
					</div>
					<div className='flex w-full gap-5 h-full'>
						<RevenueABXCost />
					</div>
					{/* <div className='h-full w-full flex items-center justify-center'>
						<Cmv />
					</div> */}
					<div className='gap-5 h-fit w-full flex justify-between flex-col xl:flex-row'>
						<RevenuePercent />
						<TKTXLocation />
					</div>
					<div className='flex flex-col md:flex-row items-center justify-between gap-5 h-full w-full'>
						<div className='md:w-1/2 h-full'>
							<MostSell />
						</div>
						<div className='md:w-1/2 h-full'>
							<MinusSell />
						</div>
					</div>
					<div className='flex flex-col gap-5 mb-5'>
						<RevenueXGroup />
						<CategoryA />
						<CategoryB />
						<div className='flex items-start gap-5 flex-col'>
							<BReports />
							<CReports />
						</div>
						<AReports />
						<div className='flex flex-col gap-5'>
							{/* <h2 className='text-zinc-50 font-bold text-2xl mt-10'>
								Gastos E Custos Gerais
							</h2> */}
							{/* <CoustDayXWorker />
							<CoustXWorker /> */}
							<div className='flex-col xl:flex-row flex gap-5'>
								{/* <div className='w-full'>
									<CoustXAB />
								</div> */}
								{/* <div className='xl:w-1/3 w-full flex flex-col justify-between gap-5'>
									<CardDetails
										title={'Compras Enxoval A&B - 2023'}
										value={'R$44.554'}
										icon={undefined}
									/>
									<CardDetails
										title={'Compras Enxoval A&B - 2024'}
										value={'R$15.948'}
										icon={undefined}
									/>
									<CardDetails
										title={'Compras Utensílios - 2023'}
										value={'R$20.083'}
										icon={undefined}
									/>
									<CardDetails
										title={'Compras Utensílios - 2024'}
										value={'R$1.943'}
										icon={undefined}
									/>
								</div> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
