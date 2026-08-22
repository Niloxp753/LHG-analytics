/** @format */

import UnitNavigation from '@/app/(dashboard)/_components/UnitNavigation';
import { DEFAULT_RANGE_TAG } from '@/lib/date-range';
import type { RestaurantSearchParams } from '../search-params';

export default async function RestaurantUnitNavigationFromSearchParams({
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
