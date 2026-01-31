/** @format */

import { getRestaurantsCustomAction } from '@/actions/restaurants/get-restaurant-custom';
import { getRestaurantsAction } from '@/actions/restaurants/get-restaurants';
import Header from '@/app/(dashboard)/_components/Header';
import {
	DEFAULT_RANGE_TAG,
	formatDateInput,
	getRangeDescription,
} from '@/lib/date-range';
import BigNumbers from '../../_components/kpi-unidade/big-numbers';
import { AReports } from '../../_components/kpis/AReports';
import { BReports } from '../../_components/kpis/BReports';
import CategoryA from '../../_components/kpis/CategoryA';
import CategoryB from '../../_components/kpis/CategoryB';
import { CReports } from '../../_components/kpis/CReports';
import { BestSellingDrinks } from '../../_components/kpis/BestSellingDrinks';
import { LeastSellingDrinks } from '../../_components/kpis/LeastSellingDrinks';
import { MinusSell } from '../../_components/kpis/MinusSell';
import { MostSell } from '../../_components/kpis/MostSell';
import RevenueABXCost from '../../_components/kpis/revenueABXCost';
import RevenuePercent from '../../_components/kpis/RevenuePercent';
import RevenueXGroup from '../../_components/kpis/RevenueXGroup';
import TKTXLocation from '../../_components/kpis/TKTXLocation';

export default async function Restaurant({
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

	async function getData() {
		if (formattedStartDate && formattedEndDate) {
			const customData = await getRestaurantsCustomAction(
				formattedStartDate!,
				formattedEndDate!,
				'lapa',
			);
			if (customData) {
				return customData;
			}
		} else {
			const data = await getRestaurantsAction(
				(preSet as string) ?? DEFAULT_RANGE_TAG,
				'lapa',
			);
			if (data) {
				return data;
			}
		}
	}

	const resp = await getData();

	if (!resp) {
		return (
			<main className='flex h-full w-full min-h-screen gap-2 flex-col justify-center bg-zinc-950 overflow-x-hidden px-3 md:px-5 py-10'>
				<div
					className={`relative w-full  md:max-w-[82vw] md:ml-auto flex z-40 `}>
					<div
						className={`bg-zinc-950/50 z-40 py-4 ml-auto w-full  md:w-[82vw] backdrop-blur-md fixed top-0 flex flex-col gap-2 justify-end `}>
						<h2 className='text-zinc-50 font-bold md:text-3xl text-center py-2 text-base'>
							Restaurante -{' '}
							<span className='text-violet-400 text-base md:text-3xl'>
								Lush Lapa
							</span>
						</h2>
						<div className='hidden lg:block'>
							<Header />
						</div>
					</div>
					<div className=' w-full  flex gap-5 flex-col justify-start mt-12 lg:mt-32'>
						<p className='text-zinc-100'>Nao foi possivel carregar os dados.</p>
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className='flex h-full w-full min-h-screen gap-2 flex-col justify-center bg-zinc-950 overflow-x-hidden px-3 md:px-5 py-10'>
			<div className={`relative w-full  md:max-w-[82vw] md:ml-auto flex z-40 `}>
				<div
					className={`bg-zinc-950/50 z-40 py-4 ml-auto w-full  md:w-[82vw] backdrop-blur-md fixed top-0 flex flex-col gap-2 justify-end `}>
					<h2 className='text-zinc-50 font-bold md:text-3xl text-center py-2 text-base'>
						Restaurante -{' '}
						<span className='text-violet-400 text-base md:text-3xl'>
							Lush Lapa
						</span>
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
						<RevenueABXCost data={resp.RevenueAbByPeriod} />
					</div>

					<div className='gap-5 h-fit w-full flex justify-between flex-col'>
						<RevenuePercent data={resp.RevenueAbByPeriodPercent} />
						<TKTXLocation data={resp.TicketAverageByPeriod} />
					</div>
					<div className='flex flex-col md:flex-row items-center justify-between gap-5 h-full w-full'>
						<div className='md:w-1/2 h-full'>
							<MostSell data={resp.BestSellingFood} />
						</div>
						<div className='md:w-1/2 h-full'>
							<MinusSell data={resp.LeastSellingFood} />
						</div>
					</div>
					<div className='flex flex-col gap-5 mb-5'>
						<div className='flex flex-col md:flex-row items-start justify-between gap-5 w-full'>
							<div className='md:w-1/2 w-full'>
								<BestSellingDrinks data={resp.BestSellingDrinks} />
							</div>
							<div className='md:w-1/2 w-full'>
								<LeastSellingDrinks data={resp.LeastSellingDrinks} />
							</div>
						</div>
						<RevenueXGroup data={resp.RevenueByGroupPeriod} />
						<CategoryA data={resp.RevenueFoodByPeriod} />
						<CategoryB data={resp.RevenueDrinksByPeriod} />
						<div className='flex items-start gap-5 flex-col'>
							<BReports data={resp.ReportByDrinks} />
							<CReports data={resp.ReportByOthers} />
						</div>
						<AReports data={resp.ReportByFood} />
					</div>
				</div>
			</div>
		</main>
	);
}
