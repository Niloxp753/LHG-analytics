/** @format */

import {
	DEFAULT_RANGE_TAG,
	formatDateInput,
	getRangeDescription,
} from '@/lib/date-range';
import { GeneralKpiSection } from '../kpi-section';
import type { GeneralSearchParams } from '../search-params';

export default async function GeneralKpisFromSearchParams({
	searchParams,
}: {
	searchParams: GeneralSearchParams;
}) {
	const resolvedSearchParams = await searchParams;
	const preSet = (resolvedSearchParams.set ?? DEFAULT_RANGE_TAG) as string;
	const rangeDescription = getRangeDescription(preSet);

	return (
		<GeneralKpiSection
			endDate={formatDateInput(resolvedSearchParams.endDate as string)}
			period={preSet}
			rangeDescription={rangeDescription}
			startDate={formatDateInput(resolvedSearchParams.startDate as string)}
		/>
	);
}
