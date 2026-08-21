/** @format */

import {
	DEFAULT_RANGE_TAG,
	formatDateInput,
	getRangeDescription,
} from '@/lib/date-range';
import { Suspense } from 'react';
import OperationalUnitDataFallback from '../../_components/unit-data-fallback';
import OperationalUnitPageShell from '../../_components/unit-page-shell';
import OperationalGetanGaraveloDataSection from './unit-data-section';

type OperationalUnitSearchParams = Promise<{
	[key: string]: string | string[] | undefined;
}>;

export default function GetanGaravelo({
	searchParams,
}: {
	searchParams: OperationalUnitSearchParams;
}) {
	const fallbackRangeDescription = getRangeDescription(DEFAULT_RANGE_TAG);

	return (
		<OperationalUnitPageShell title='Getan Garavelo'>
			<Suspense
				fallback={
					<OperationalUnitDataFallback
						description={fallbackRangeDescription}
					/>
				}>
				<OperationalUnitDataFromSearchParams
					searchParams={searchParams}
				/>
			</Suspense>
		</OperationalUnitPageShell>
	);
}

async function OperationalUnitDataFromSearchParams({
	searchParams,
}: {
	searchParams: OperationalUnitSearchParams;
}) {
	const resolvedSearchParams = await searchParams;
	const preSet = resolvedSearchParams.set ?? DEFAULT_RANGE_TAG;
	const rangeDescription = getRangeDescription(preSet as string);

	return (
		<OperationalGetanGaraveloDataSection
			description={rangeDescription}
			endDate={formatDateInput(resolvedSearchParams.endDate as string)}
			preSet={preSet as string}
			startDate={formatDateInput(resolvedSearchParams.startDate as string)}
		/>
	);
}
