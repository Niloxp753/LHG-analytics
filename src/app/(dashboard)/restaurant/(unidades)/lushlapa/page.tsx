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
import { format } from 'date-fns';
import { getRestaurantsAction } from '@/actions/restaurants/get-restaurants';
import { revalidatePath } from 'next/cache';
import BigNumbers from '../../_components/kpi-unidade/big-numbers';

export default async function Restaurant({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	searchParams.menu = 'restaurant';
	const preSet = searchParams.set ?? '7days';
	const startDate = searchParams.startDate;
	const endDate = searchParams.endDate;

	const formattedStartDate =
		startDate && format(new Date(startDate!), 'dd/MM/yyyy');
	const formattedEndDate = endDate && format(new Date(endDate!), 'dd/MM/yyyy');

	async function getData() {
		if (startDate && endDate) {
			const customData = await getRestaurantsAction(
				formattedStartDate!,
				formattedEndDate!,
			);
			if (customData) {
				revalidatePath('/');
				return customData;
			}
		} else {
			const data = await getRestaurantsAction(preSet ?? '7days', 'lapa');
			if (data) {
				revalidatePath('/');
				return data;
			}
		}
	}

	const resp = await getData();

	return (
		<main className='flex h-full w-full min-h-screen gap-2 flex-col justify-center bg-zinc-950 overflow-x-hidden px-3 md:px-5 py-10'>
			<div className={`relative w-full  md:max-w-[82vw] md:ml-auto flex z-40 `}>
				<div
					className={`bg-zinc-950/50 z-40 py-4 ml-auto w-full  md:w-[82vw] backdrop-blur-md fixed top-0 flex flex-col gap-2 justify-end `}>
					<h2 className='text-zinc-50 font-bold md:text-3xl text-center py-2 text-xl'>
						Restaurante - <span className='text-violet-400'>Lush Lapa</span>
					</h2>
					<div className='hidden lg:block'>
						<Header />
					</div>
				</div>
				<div className=' w-full  flex gap-5 flex-col justify-start mt-12 lg:mt-32'>
					<BigNumbers
						data={resp?.BigNumbers}
						description={`${preSet == '7days' ? '7 dias atrás ' : ''} ${
							preSet == '30days' ? '30 dias atrás ' : ''
						} ${preSet == '6months' ? '6 meses atrás ' : ''}${
							preSet == '12months' ? '12 meses atrás ' : ''
						}`}
					/>
					<div className='flex w-full gap-5 h-full'>
						<RevenueABXCost data={resp.RevenueAbByPeriod} />
					</div>
					{/* <div className='h-full w-full flex items-center justify-center'>
						<Cmv />
					</div> */}
					<div className='gap-5 h-fit w-full flex justify-between flex-col xl:flex-row'>
						<RevenuePercent data={resp.RevenueAbByPeriodPercent} />
						<TKTXLocation data={resp.TicketAverageByPeriod} />
					</div>
					<div className='flex flex-col md:flex-row items-center justify-between gap-5 h-full w-full'>
						<div className='md:w-1/2 h-full'>
							<MostSell data={resp.BestSellingItems} />
						</div>
						<div className='md:w-1/2 h-full'>
							<MinusSell data={resp.LeastSellingItems} />
						</div>
					</div>
					<div className='flex flex-col gap-5 mb-5'>
						<RevenueXGroup data={resp.RevenueByGroupPeriod} />
						<CategoryA data={resp.RevenueFoodByPeriod} />
						<CategoryB data={resp.RevenueDrinksByPeriod} />
						<div className='flex items-start gap-5 flex-col'>
							<BReports data={resp.ReportByDrinks} />
							<CReports data={resp.ReportByOthers} />
						</div>
						<AReports data={resp.ReportByFood} />
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
