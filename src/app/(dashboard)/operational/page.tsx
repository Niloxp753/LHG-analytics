/** @format */

import {
	DEFAULT_RANGE_TAG,
	getRangeDescription,
} from '@/lib/date-range';
import { Suspense } from 'react';
import Header from '../_components/Header';
import UnitNavigation from '../_components/UnitNavigation';
import OperationalKpiFallback from './_components/operational-kpi-fallback';
import OperationalKpisFromSearchParams from './_components/operational-kpis-from-search-params';
import OperationalUnitNavigationFromSearchParams from './_components/operational-unit-navigation-from-search-params';
import type { OperationalSearchParams } from './search-params';

export const instant = true;

export default function Operational({
	searchParams,
}: {
	searchParams: OperationalSearchParams;
}) {
	const fallbackRangeDescription = getRangeDescription(DEFAULT_RANGE_TAG);

	return (
		<main className='flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-start bg-zinc-950 overflow-x-hidden pt-20 pb-10 md:px-5 lg:pt-44'>
			<div className='relative md:max-w-[82vw] flex md:ml-auto w-full'>
				<div className='bg-zinc-950/50 py-4 w-full md:w-[82vw] backdrop-blur-md fixed z-20 top-0 flex flex-col gap-5'>
					<h2 className='text-zinc-50 font-bold md:text-3xl text-center text-xl'>
						Visão Geral
						<span className='text-violet-400'> {''}Operacional </span>
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
								modulePath='operational'
								preSet={DEFAULT_RANGE_TAG}
							/>
						}>
						<OperationalUnitNavigationFromSearchParams
							searchParams={searchParams}
						/>
					</Suspense>
					<Suspense
						fallback={
							<OperationalKpiFallback
								description={fallbackRangeDescription}
							/>
						}>
						<OperationalKpisFromSearchParams
							searchParams={searchParams}
						/>
					</Suspense>
				</div>
			</div>
		</main>
	);
}
