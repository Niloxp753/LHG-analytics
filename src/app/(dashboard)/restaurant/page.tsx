/** @format */

import {
	DEFAULT_RANGE_TAG,
	formatDateInput,
	getRangeDescription,
} from '@/lib/date-range';
import { Suspense } from 'react';
import Header from '../_components/Header';
import UnitNavigation from '../_components/UnitNavigation';
import { RestaurantKpiFallback, RestaurantKpiSection } from './kpi-section';

type RestaurantSearchParams = Promise<{
	[key: string]: string | string[] | undefined;
}>;

export default function Restaurant({
	searchParams,
}: {
	searchParams: RestaurantSearchParams;
}) {
	const fallbackRangeDescription = getRangeDescription(DEFAULT_RANGE_TAG);

	return (
		<main className='flex h-full w-full min-h-screen gap-2 flex-col justify-start bg-zinc-950 overflow-x-hidden pt-20 pb-10 md:px-5 lg:pt-44'>
			<div className='relative md:max-w-[82vw] flex md:ml-auto w-full'>
				<div className='bg-zinc-950/50 py-4 w-full md:w-[82vw] backdrop-blur-md fixed z-20 top-0 flex flex-col gap-5 md:justify-end'>
					<h2 className='text-zinc-50 font-bold text-2xl md:text-3xl text-center pt-1'>
						Painel de
						<span className='text-violet-400'> {''}Restaurantes</span>
					</h2>
					<div className='hidden lg:block'>
						<Header />
					</div>
				</div>

				<div className='w-full flex flex-col gap-5'>
					<Suspense
						fallback={
							<UnitNavigation
								className='mx-3 md:mx-0 lg:hidden'
								modulePath='restaurant'
								preSet={DEFAULT_RANGE_TAG}
							/>
						}>
						<RestaurantUnitNavigationFromSearchParams
							searchParams={searchParams}
						/>
					</Suspense>
					<Suspense
						fallback={
							<RestaurantKpiFallback
								description={fallbackRangeDescription}
							/>
						}>
						<RestaurantKpisFromSearchParams searchParams={searchParams} />
					</Suspense>
				</div>
			</div>
		</main>
	);
}

async function RestaurantUnitNavigationFromSearchParams({
	searchParams,
}: {
	searchParams: RestaurantSearchParams;
}) {
	const resolvedSearchParams = await searchParams;
	const preSet = (resolvedSearchParams.set ?? DEFAULT_RANGE_TAG) as string;

	return (
		<UnitNavigation
			className='mx-3 md:mx-0 lg:hidden'
			endDate={resolvedSearchParams.endDate as string}
			modulePath='restaurant'
			preSet={preSet}
			startDate={resolvedSearchParams.startDate as string}
		/>
	);
}

async function RestaurantKpisFromSearchParams({
	searchParams,
}: {
	searchParams: RestaurantSearchParams;
}) {
	const resolvedSearchParams = await searchParams;
	const preSet = (resolvedSearchParams.set ?? DEFAULT_RANGE_TAG) as string;
	const rangeDescription = getRangeDescription(preSet);

	return (
		<RestaurantKpiSection
			description={rangeDescription}
			endDate={formatDateInput(resolvedSearchParams.endDate as string)}
			period={preSet}
			startDate={formatDateInput(resolvedSearchParams.startDate as string)}
		/>
	);
}
