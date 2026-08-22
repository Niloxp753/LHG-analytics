/** @format */

import {
	DEFAULT_RANGE_TAG,
	formatDateInput,
	getRangeDescription,
} from '@/lib/date-range';
import { OperationalKpiSection } from '../kpi-section';
import type { OperationalSearchParams } from '../search-params';

export default async function OperationalKpisFromSearchParams({
	searchParams,
}: {
	searchParams: OperationalSearchParams;
}) {
	const resolvedSearchParams = await searchParams;
	const preSet = (resolvedSearchParams.set || DEFAULT_RANGE_TAG) as string;
	const rangeDescription = getRangeDescription(preSet);

	return (
		<OperationalKpiSection
			description={rangeDescription}
			endDate={formatDateInput(resolvedSearchParams.endDate as string)}
			period={preSet}
			startDate={formatDateInput(resolvedSearchParams.startDate as string)}
		/>
	);
}
