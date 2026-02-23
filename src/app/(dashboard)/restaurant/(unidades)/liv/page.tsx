/** @format */

import { getLivRestaurantPageData } from '@/actions/liv/get-liv-restaurant-page';
import Header from '@/app/(dashboard)/_components/Header';
import {
	DEFAULT_RANGE_TAG,
	formatDateInput,
	getRangeDescription,
} from '@/lib/date-range';
import BigNumbers from '../../_components/kpi-unidade/big-numbers';
import { AReports } from '../../_components/kpis/AReports';
import { BReports } from '../../_components/kpis/BReports';
import { CReports } from '../../_components/kpis/CReports';
import CategoryA from '../../_components/kpis/CategoryA';
import CategoryB from '../../_components/kpis/CategoryB';
import { BestSellingDrinks } from '../../_components/kpis/BestSellingDrinks';
import { LeastSellingDrinks } from '../../_components/kpis/LeastSellingDrinks';
import { MinusSell } from '../../_components/kpis/MinusSell';
import { MostSell } from '../../_components/kpis/MostSell';
import RevenueABXCost from '../../_components/kpis/revenueABXCost';
import RevenuePercent from '../../_components/kpis/RevenuePercent';
import RevenueXGroup from '../../_components/kpis/RevenueXGroup';
import TKTXLocation from '../../_components/kpis/TKTXLocation';

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const preSet = (await searchParams).set ?? DEFAULT_RANGE_TAG;
	const startDate = (await searchParams).startDate;
	const endDate = (await searchParams).endDate;
	const rangeDescription = getRangeDescription(preSet as string);

	const formattedStartDate = formatDateInput(startDate as string);
	const formattedEndDate = formatDateInput(endDate as string);

	const result = await getLivRestaurantPageData({
		period: preSet as string,
		startDate: formattedStartDate,
		endDate: formattedEndDate,
	});
	const resp = result.ok ? result.data : null;

	if (!resp) {
		return (
			<main className='flex h-full w-full min-h-screen gap-2 flex-col justify-center bg-zinc-950 overflow-x-hidden px-3 md:px-5 py-10'>
				<div className='relative w-full  md:max-w-[82vw] md:ml-auto flex z-40 '>
					<div className='bg-zinc-950/50 z-40 py-4 ml-auto  w-full  md:w-[82vw] backdrop-blur-md fixed top-0 flex flex-col gap-2 justify-end '>
						<h2 className='text-zinc-50 font-bold md:text-3xl text-center py-2 text-base'>
							Restaurante -{' '}
							<span className='text-violet-400 text-base md:text-3xl'>
								LIV
							</span>
						</h2>
						<div className='hidden lg:block'>
							<Header />
						</div>
					</div>
					<div className=' w-full  flex gap-5 flex-col justify-start mt-12 lg:mt-32'>
						<p className='text-zinc-100'>Não foi possível carregar os dados.</p>
					</div>
				</div>
			</main>
		);
	}

	const revenueAbByPeriod = resp.RevenueAbByPeriod ?? { categories: [], series: [] };
	const revenueAbByPeriodPercent = resp.RevenueAbByPeriodPercent ?? {
		categories: [],
		series: [],
	};
	const ticketAverageByPeriod = resp.TicketAverageByPeriod ?? {
		categories: [],
		series: [],
	};
	const bestSellingFood = resp.BestSellingFood ?? [];
	const leastSellingFood = resp.LeastSellingFood ?? [];
	const bestSellingDrinks = resp.BestSellingDrinks ?? [];
	const leastSellingDrinks = resp.LeastSellingDrinks ?? [];
	const revenueByGroupPeriod = resp.RevenueByGroupPeriod ?? {
		categories: [],
		series: [],
	};
	const revenueFoodByPeriod = resp.RevenueFoodByPeriod ?? {
		categoriesFood: [],
		seriesFood: [],
	};
	const revenueDrinksByPeriod = resp.RevenueDrinksByPeriod ?? {
		categoriesDrink: [],
		seriesDrink: [],
	};
	const reportByFood = resp.ReportByFood ?? [];
	const reportByDrinks = resp.ReportByDrinks ?? [];
	const reportByOthers = resp.ReportByOthers ?? [];

	return (
		<main className='flex h-full w-full min-h-screen gap-2 flex-col justify-center bg-zinc-950 overflow-x-hidden px-3 md:px-5 py-10'>
			<div className={`relative w-full  md:max-w-[82vw] md:ml-auto flex z-40 `}>
				<div className='bg-zinc-950/50 z-40 py-4 ml-auto  w-full  md:w-[82vw] backdrop-blur-md fixed top-0 flex flex-col gap-2 justify-end '>
					<h2 className='text-zinc-50 font-bold md:text-3xl text-center py-2 text-base'>
						Restaurante -{' '}
						<span className='text-violet-400 text-base md:text-3xl'>LIV</span>
					</h2>
					<div className='hidden lg:block'>
						<Header />
					</div>
				</div>
				<div className=' w-full  flex gap-5 flex-col justify-start mt-12 lg:mt-32'>
					<BigNumbers
						data={resp?.BigNumbers[0]}
						description={rangeDescription}
					/>
					<div className='flex w-full gap-5 h-full'>
						<RevenueABXCost data={revenueAbByPeriod} />
					</div>

					<div className='gap-5 h-fit w-full flex justify-between flex-col'>
						<RevenuePercent data={revenueAbByPeriodPercent} />
						<TKTXLocation data={ticketAverageByPeriod} />
					</div>
					<div className='flex flex-col md:flex-row items-center justify-between gap-5 h-full w-full'>
						<div className='md:w-1/2 h-full'>
							<MostSell data={bestSellingFood} />
						</div>
						<div className='md:w-1/2 h-full'>
							<MinusSell data={leastSellingFood} />
						</div>
					</div>
					<div className='flex flex-col gap-5 mb-5'>
						<div className='flex flex-col md:flex-row items-start justify-between gap-5 w-full'>
							<div className='md:w-1/2 w-full'>
								<BestSellingDrinks data={bestSellingDrinks} />
							</div>
							<div className='md:w-1/2 w-full'>
								<LeastSellingDrinks data={leastSellingDrinks} />
							</div>
						</div>
						<RevenueXGroup data={revenueByGroupPeriod} />
						<CategoryA data={revenueFoodByPeriod} />
						<CategoryB data={revenueDrinksByPeriod} />
						<div className='flex items-start gap-5 flex-col'>
							<BReports data={reportByDrinks} />
							<CReports data={reportByOthers} />
						</div>
						<AReports data={reportByFood} />
					</div>
				</div>
			</div>
		</main>
	);
}
