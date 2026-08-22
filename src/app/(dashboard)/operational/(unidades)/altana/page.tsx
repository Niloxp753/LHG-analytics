/** @format */

import Header from '@/app/(dashboard)/_components/Header';
import { DEFAULT_RANGE_TAG, getRangeDescription } from '@/lib/date-range';
import { Suspense } from 'react';
import UnitDataFromSearchParams, {
	type UnitSearchParams,
} from './unit-data-from-search-params';
import { OperationalAltanaDataFallback } from './unit-data-fallback';

export const instant = true;

export default function Page({
	searchParams,
}: {
	searchParams: UnitSearchParams;
}) {
	const fallbackRangeDescription = getRangeDescription(DEFAULT_RANGE_TAG);

	return (
		<main className='flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-start bg-zinc-950 overflow-x-hidden pt-20 pb-14 md:px-5 lg:pt-44'>
			<div className='relative md:max-w-[82vw] flex md:ml-auto w-full'>
				<div className='bg-zinc-950/50 py-4 w-full md:w-[82vw] backdrop-blur-md fixed top-0 z-40 flex flex-col gap-2'>
					<h2 className='text-zinc-50 font-bold md:text-3xl text-center pb-1.5 pt-2.5 text-base'>
						Operacional -{' '}
						<span className='text-violet-400 text-base md:text-3xl'>
							Altana
						</span>
					</h2>
					<div className='hidden lg:block'>
						<Header />
					</div>
				</div>
				<div className='w-full h-full flex gap-5 flex-col px-3 md:px-0'>
					<Suspense
						fallback={
							<OperationalAltanaDataFallback
								description={fallbackRangeDescription}
							/>
						}>
						<UnitDataFromSearchParams
							searchParams={searchParams}
						/>
					</Suspense>
				</div>
			</div>
		</main>
	);
}
