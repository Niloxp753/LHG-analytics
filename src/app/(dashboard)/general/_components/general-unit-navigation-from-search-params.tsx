/** @format */

import UnitNavigation from '@/app/(dashboard)/_components/UnitNavigation';
import { DEFAULT_RANGE_TAG } from '@/lib/date-range';
import type { GeneralSearchParams } from '../search-params';

export default async function GeneralUnitNavigationFromSearchParams({
	searchParams,
}: {
	searchParams: GeneralSearchParams;
}) {
	const resolvedSearchParams = await searchParams;
	const preSet = (resolvedSearchParams.set ?? DEFAULT_RANGE_TAG) as string;

	return (
		<UnitNavigation
			className='lg:hidden'
			endDate={resolvedSearchParams.endDate as string}
			modulePath='general'
			preSet={preSet}
			startDate={resolvedSearchParams.startDate as string}
		/>
	);
}
