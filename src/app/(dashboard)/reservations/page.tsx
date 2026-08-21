/** @format */

import {
	DEFAULT_RANGE_TAG,
	getRangeDescription,
} from '@/lib/date-range';
import { Suspense } from 'react';
import Header from '../_components/Header';
import UnitNavigation from '../_components/UnitNavigation';
import ReservationsKpiFallback from './_components/reservations-kpi-fallback';
import ReservationsKpisFromSearchParams from './_components/reservations-kpis-from-search-params';
import ReservationsUnitNavigationFromSearchParams from './_components/reservations-unit-navigation-from-search-params';
import type { ReservationsSearchParams } from './search-params';

export const instant = true;

export default function Reservations({
	searchParams,
}: {
	searchParams: ReservationsSearchParams;
}) {
	const fallbackRangeDescription = getRangeDescription(DEFAULT_RANGE_TAG);

	return (
		<main className='flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-start bg-zinc-950 overflow-x-hidden pt-20 pb-10 md:px-5 lg:pt-44'>
			<div className='relative md:max-w-[82vw] flex md:ml-auto w-full'>
				<div className='bg-zinc-950/50 py-4 w-full md:w-[82vw] backdrop-blur-md fixed z-10 top-0 flex flex-col gap-5 md:justify-end'>
					<h2 className='text-zinc-50 font-bold text-xl md:text-3xl text-center pt-1'>
						Painel de<span className='text-violet-400'> {''}Reservas</span>
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
								modulePath='reservations'
								preSet={DEFAULT_RANGE_TAG}
							/>
						}>
						<ReservationsUnitNavigationFromSearchParams
							searchParams={searchParams}
						/>
					</Suspense>
					<Suspense
						fallback={
							<ReservationsKpiFallback
								description={fallbackRangeDescription}
							/>
						}>
						<ReservationsKpisFromSearchParams
							searchParams={searchParams}
						/>
					</Suspense>
				</div>
			</div>
		</main>
	);
}
