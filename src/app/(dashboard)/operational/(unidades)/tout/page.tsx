/** @format */

import DashboardPageSessionBoundary from '@/app/(dashboard)/_components/dashboard-page-session-boundary';
import { DEFAULT_RANGE_TAG, getRangeDescription } from '@/lib/date-range';
import { Suspense } from 'react';
import OperationalUnitDataFallback from '../../_components/unit-data-fallback';
import OperationalUnitPageShell from '../../_components/unit-page-shell';
import UnitDataFromSearchParams, {
	type UnitSearchParams,
} from './unit-data-from-search-params';

export const instant = true;

export default function Tout({
	searchParams,
}: {
	searchParams: UnitSearchParams;
}) {
	const fallbackRangeDescription = getRangeDescription(DEFAULT_RANGE_TAG);

	return (
		<DashboardPageSessionBoundary>
			<OperationalUnitPageShell title='Tout'>
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
		</DashboardPageSessionBoundary>
	);
}
