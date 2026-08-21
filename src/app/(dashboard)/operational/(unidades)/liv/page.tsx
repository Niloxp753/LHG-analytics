/** @format */

import { DEFAULT_RANGE_TAG, getRangeDescription } from '@/lib/date-range';
import { Suspense } from 'react';
import OperationalUnitDataFallback from '../../_components/unit-data-fallback';
import OperationalUnitPageShell from '../../_components/unit-page-shell';
import UnitDataFromSearchParams, {
	type UnitSearchParams,
} from './unit-data-from-search-params';

export const instant = true;

export default function Liv({
	searchParams,
}: {
	searchParams: UnitSearchParams;
}) {
	const fallbackRangeDescription = getRangeDescription(DEFAULT_RANGE_TAG);

	return (
		<OperationalUnitPageShell title='LIV'>
			<Suspense
				fallback={
					<OperationalUnitDataFallback
						description={fallbackRangeDescription}
					/>
				}>
				<UnitDataFromSearchParams
					searchParams={searchParams}
				/>
			</Suspense>
		</OperationalUnitPageShell>
	);
}
