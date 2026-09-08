/** @format */

import {
	DEFAULT_RANGE_TAG,
	formatDateInput,
	getRangeDescription,
} from '@/lib/date-range';
import { StandardGeneralUnitDataSection } from '../../_components/standard-unit-data-section';

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

	return (
		<StandardGeneralUnitDataSection
			company='getan_independencia'
			rangeDescription={getRangeDescription(preSet as string)}
			endDate={formatDateInput(resolvedSearchParams.endDate as string)}
			preSet={preSet as string}
			startDate={formatDateInput(resolvedSearchParams.startDate as string)}
		/>
	);
}

