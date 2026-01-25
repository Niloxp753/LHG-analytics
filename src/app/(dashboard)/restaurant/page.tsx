/** @format */

import { getRestaurantPageData } from '@/actions/restaurants/get-restaurant-page';
import {
	DEFAULT_RANGE_TAG,
	formatDateInput,
	getRangeDescription,
} from '@/lib/date-range';
import CardLink from '../_components/CardLink';
import Header from '../_components/Header';
import BigNumbersPage from './_components/kpis/big-numbers-page';
import UnityxRevenue from './_components/kpis/UnityxRevenue';
import UnityxSales from './_components/kpis/UnityxSales';
import UnityxTKTxTime from './_components/kpis/UnityxTKTxTime';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import UnityxRevenuexTimeAB from './_components/kpis/UnityxRevenuexTimeAB';
import UnityxRevenuexTimeABPercent from './_components/kpis/UnityxRevenuexTimeABPercent';

const SparkChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/SparkChart'),
	{ ssr: false },
);

type UnitSeries = { categories: string[]; series: number[] };

type UnitPayload = {
	Company?: string;
	company?: string;
	name?: string;
	BigNumbers?: Array<{
		currentDate?: {
			totalAllValue?: number;
			totalAllSales?: number;
		};
	}>;
	RevenueAbByPeriod?: UnitSeries;
	TicketAverageByPeriod?: UnitSeries;
};

type UnitMap = {
	ipiranga?: UnitPayload;
	lapa?: UnitPayload;
	andar_de_cima?: UnitPayload;
	tout?: UnitPayload;
};

export default async function Restaurant({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	const menu = 'restaurant';
	const preSet = searchParams.set ?? DEFAULT_RANGE_TAG;
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

	const unifiedData = Array.isArray(resp.data) ? null : (resp.data as any);
	const bigNumbers = unifiedData?.BigNumbers ?? null;
	const revenueByCompanyAB = unifiedData?.RevenueAbByPeriod ?? null;
	const ticketAverageByPeriod = unifiedData.TicketAverageByPeriod ?? null;
	const revenueAbByPeriodPercent = unifiedData.RevenueAbByPeriodPercent ?? null;

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
							description={rangeDescription}
							data={bigNumbers}
						/>

						<div className='flex gap-5  flex-col md:flex-row mx-auto w-full h-full'>
							{/* <UnityxRevenue
								tout={
									units.tout?.BigNumbers?.[0]?.currentDate?.totalAllValue ?? 0
								}
								andar_de_cima={
									units.andar_de_cima?.BigNumbers?.[0]?.currentDate
										?.totalAllValue ?? 0
								}
								ipiranga={
									units.ipiranga?.BigNumbers?.[0]?.currentDate?.totalAllValue ??
									0
								}
								lapa={
									units.lapa?.BigNumbers?.[0]?.currentDate?.totalAllValue ?? 0
								}
							/> */}
							{/* <UnityxSales
								tout={
									units.tout?.BigNumbers?.[0]?.currentDate?.totalAllSales ?? 0
								}
								andar_de_cima={
									units.andar_de_cima?.BigNumbers?.[0]?.currentDate
										?.totalAllSales ?? 0
								}
								ipiranga={
									units.ipiranga?.BigNumbers?.[0]?.currentDate?.totalAllSales ??
									0
								}
								lapa={
									units.lapa?.BigNumbers?.[0]?.currentDate?.totalAllSales ?? 0
								}
							/> */}
						</div>

						<div className='flex flex-col gap-5'>
							<UnityxRevenuexTimeAB data={revenueByCompanyAB} />
							<UnityxRevenuexTimeABPercent data={revenueAbByPeriodPercent} />
							<UnityxTKTxTime data={ticketAverageByPeriod} />
						</div>
					</Suspense>
				</div>
			</div>
		</main>
	);
}
