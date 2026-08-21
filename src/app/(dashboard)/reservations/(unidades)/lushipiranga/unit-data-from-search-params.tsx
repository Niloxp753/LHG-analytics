/** @format */

import {
	DEFAULT_RANGE_TAG,
	formatDateInput,
	getRangeDescription,
} from '@/lib/date-range';
import ReservationsLushIpirangaDataSection from './unit-data-section';

export type UnitSearchParams = Promise<{
	[key: string]: string | string[] | undefined;
}>;

export default async function UnitDataFromSearchParams({
	searchParams,
}: {
	searchParams: UnitSearchParams;
}) {
	const resolvedSearchParams = await searchParams;
	const preSet = resolvedSearchParams.set ?? DEFAULT_RANGE_TAG;
	const rangeDescription = getRangeDescription(preSet as string);

	return (
		<ReservationsLushIpirangaDataSection
			description={rangeDescription}
			endDate={formatDateInput(resolvedSearchParams.endDate as string)}
			preSet={preSet as string}
			startDate={formatDateInput(resolvedSearchParams.startDate as string)}
		/>
	);
}
