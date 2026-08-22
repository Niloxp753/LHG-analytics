/** @format */

import {
	DEFAULT_RANGE_TAG,
	formatDateInput,
	getRangeDescription,
} from '@/lib/date-range';
import { ReservationsKpiSection } from '../kpi-section';
import type { ReservationsSearchParams } from '../search-params';

export default async function ReservationsKpisFromSearchParams({
	searchParams,
}: {
	searchParams: ReservationsSearchParams;
}) {
	const resolvedSearchParams = await searchParams;
	const preSet = (resolvedSearchParams.set || DEFAULT_RANGE_TAG) as string;
	const rangeDescription = getRangeDescription(preSet);

	return (
		<ReservationsKpiSection
			description={rangeDescription}
			endDate={formatDateInput(resolvedSearchParams.endDate as string)}
			period={preSet}
			startDate={formatDateInput(resolvedSearchParams.startDate as string)}
		/>
	);
}
