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

export default function GetanGrid({
	searchParams,
}: {
	searchParams: UnitSearchParams;
}) {
	return (
		<DashboardPageSessionBoundary>
			<OperationalUnitPageShell title='Getan Grid'>
				<Suspense
					fallback={
						<OperationalUnitDataFallback
							description={getRangeDescription(DEFAULT_RANGE_TAG)}
						/>
					}>
					<UnitDataFromSearchParams searchParams={searchParams} />
				</Suspense>
			</OperationalUnitPageShell>
		</DashboardPageSessionBoundary>
	);
}

