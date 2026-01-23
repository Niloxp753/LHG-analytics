/** @format */

import { getRestaurantPageData } from '@/actions/restaurants/get-restaurant-page';
import { DEFAULT_RANGE_TAG, formatDateInput, getRangeDescription } from '@/lib/date-range';
import CardLink from '../_components/CardLink';
import SparkChart from '../_components/charts/SparkChart';
import Header from '../_components/Header';
import BigNumbersPage from './_components/kpis/big-numbers-page';
import UnityxRevenue from './_components/kpis/UnityxRevenue';
import UnityxRevenuexTime from './_components/kpis/UnityxRevenuexTime';
import UnityxSales from './_components/kpis/UnityxSales';
import UnityxTKTxTime from './_components/kpis/UnityxTKTxTime';
import { Suspense } from 'react';

export default async function Restaurant({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	const menu = 'restaurant';
	const preSet = searchParams.set || DEFAULT_RANGE_TAG;
	const startDate = searchParams.startDate;
	const endDate = searchParams.endDate;
	const rangeDescription = getRangeDescription(preSet);

	const formattedStartDate = formatDateInput(startDate);
	const formattedEndDate = formatDateInput(endDate);

	async function getData() {
		if (formattedStartDate && formattedEndDate) {
			const customData = await getRestaurantPageData({
				startDate: formattedStartDate,
				endDate: formattedEndDate,
			});
			if (customData) {
				return customData;
			}
			return { ok: false, data: null, error: 'Algo deu errado' };
		} else {
			const data = await getRestaurantPageData({ period: preSet });
			if (data) {
				return data;
			}
			return { ok: false, data: null, error: 'Algo deu errado' };
		}
	}

	const resp = await getData();

	if (!resp.ok || !resp.data) {
		console.log(resp.error);
		return (
			<div className='text-muted-foreground'>
				Não foi possível encontrar os dados
			</div>
		);
	}

	return (
		<main className='flex h-full w-full min-h-screen gap-2 flex-col justify-center bg-zinc-950 overflow-x-hidden md:px-5 py-10'>
			<div className={`relative  md:max-w-[82vw] flex  md:ml-auto w-full `}>
				<div
					className={`bg-zinc-950/50 py-4 w-full md:w-[82vw] backdrop-blur-md fixed z-20 top-0 flex flex-col gap-5 md:justify-end `}>
					<h2 className='text-zinc-50 font-bold text-2xl md:text-3xl text-center pt-1'>
						Painel de <span className='text-violet-400'> {''}Restaurantes</span>
					</h2>
					<div className='hidden lg:block'>
						<Header />
					</div>
				</div>

				<div className='w-full flex flex-col mt-12 lg:mt-32 h-full gap-5 px-3 md:px-0'>
					<div className='grid md:grid-cols-4 gap-5'>
						<CardLink
							href={`/restaurant/lushipiranga?menu=${menu}&set=${preSet}`}
							title={'Lush Ipiranga'}
							content={
								<SparkChart serie={[35, 40, 55, 45, 50, 40]} />
							}></CardLink>
						<CardLink
							href={`/restaurant/lushlapa?menu=${menu}&set=${preSet}`}
							title={'Lush Lapa'}
							content={
								<SparkChart serie={[45, 30, 55, 35, 60, 40]} />
							}></CardLink>
						<CardLink
							href={`/restaurant/tout?menu=${menu}&set=${preSet}`}
							title={'Tout'}
							content={
								<SparkChart serie={[45, 40, 55, 35, 55, 30]} />
							}></CardLink>{' '}
						<CardLink
							href={`/restaurant/andardecima?menu=${menu}&set=${preSet}`}
							title={'Andar de Cima'}
							content={
								<SparkChart serie={[55, 30, 55, 45, 50, 60]} />
							}></CardLink>
					</div>
					<Suspense>
						<BigNumbersPage
							tout={resp.data[3].BigNumbers}
							andar_de_cima={resp.data[2].BigNumbers}
							description={rangeDescription}
							ipiranga={resp.data[0].BigNumbers}
							lapa={resp.data[1].BigNumbers}
						/>
					</Suspense>
					<div className='flex gap-5  flex-col md:flex-row mx-auto w-full h-full'>
						<UnityxRevenue
							tout={resp.data[3].BigNumbers[0].currentDate.totalAllValue}
							andar_de_cima={
								resp.data[2].BigNumbers[0].currentDate.totalAllValue
							}
							ipiranga={resp.data[0].BigNumbers[0].currentDate.totalAllValue}
							lapa={resp.data[1].BigNumbers[0].currentDate.totalAllValue}
						/>
						<UnityxSales
							tout={resp.data[3].BigNumbers[0].currentDate.totalAllSales}
							andar_de_cima={
								resp.data[2].BigNumbers[0].currentDate.totalAllSales
							}
							ipiranga={resp.data[0].BigNumbers[0].currentDate.totalAllSales}
							lapa={resp.data[1].BigNumbers[0].currentDate.totalAllSales}
						/>
						{/* <UnityxCMV /> */}
					</div>
					<div className='flex flex-col gap-5'>
						<UnityxRevenuexTime
							ipiranga={resp.data[0].RevenueAbByPeriod}
							lapa={resp.data[1].RevenueAbByPeriod}
							andar_de_cima={resp.data[2].RevenueAbByPeriod}
							tout={resp.data[3].RevenueAbByPeriod}
						/>
						<UnityxTKTxTime
							ipiranga={resp.data[0].TicketAverageByPeriod}
							lapa={resp.data[1].TicketAverageByPeriod}
							andar_de_cima={resp.data[2].TicketAverageByPeriod}
							tout={resp.data[3].TicketAverageByPeriod}
						/>
						{/* <UnityxCMVxTime /> */}
					</div>
				</div>
			</div>
		</main>
	);
}

