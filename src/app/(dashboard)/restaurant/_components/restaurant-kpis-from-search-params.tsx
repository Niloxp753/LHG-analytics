/** @format */

import {
	DEFAULT_RANGE_TAG,
	formatDateInput,
	getRangeDescription,
} from '@/lib/date-range';
import { RestaurantKpiSection } from '../kpi-section';
import type { RestaurantSearchParams } from '../search-params';

export default async function RestaurantKpisFromSearchParams({
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
