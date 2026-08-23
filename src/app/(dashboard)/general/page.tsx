/** @format */

import DashboardPageSessionBoundary from '@/app/(dashboard)/_components/dashboard-page-session-boundary';
import {
	DEFAULT_RANGE_TAG,
	getRangeDescription,
} from '@/lib/date-range';
import { Suspense } from 'react';
import Header from '../_components/Header';
import UnitNavigation from '../_components/UnitNavigation';
import GeneralKpiFallback from './_components/general-kpi-fallback';
import GeneralKpisFromSearchParams from './_components/general-kpis-from-search-params';
import GeneralUnitNavigationFromSearchParams from './_components/general-unit-navigation-from-search-params';
import type { GeneralSearchParams } from './search-params';

export const instant = true;

export default function General({
	searchParams,
}: {
	searchParams: GeneralSearchParams;
}) {
	const fallbackRangeDescription = getRangeDescription(DEFAULT_RANGE_TAG);

	return (
		<DashboardPageSessionBoundary>
			<main className='flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-start bg-zinc-950 overflow-x-hidden pt-20 pb-10 md:px-5 lg:pt-44'>
			<div className='relative md:max-w-[82vw] flex md:ml-auto w-full'>
				<div className='bg-zinc-950/50 p-4 w-full md:max-w-[82vw] backdrop-blur-md fixed z-20 top-0 flex flex-col gap-5'>
					<h2 className='text-zinc-50 font-bold text-2xl text-center'>
						Visão <span className='text-violet-400'> Geral</span>
					</h2>
					<div className='hidden lg:block'>
						<Header />
					</div>
				</div>
				<div className='flex flex-col gap-5 w-full px-3'>
					<Suspense
						fallback={
							<UnitNavigation
								className='lg:hidden'
								modulePath='general'
								preSet={DEFAULT_RANGE_TAG}
							/>
						}>
						<GeneralUnitNavigationFromSearchParams
							searchParams={searchParams}
						/>
					</Suspense>
					<Suspense
						fallback={
							<GeneralKpiFallback
								rangeDescription={fallbackRangeDescription}
							/>
						}>
						<GeneralKpisFromSearchParams searchParams={searchParams} />
					</Suspense>
				</div>
			</div>
			</main>
		</DashboardPageSessionBoundary>
	);
}
