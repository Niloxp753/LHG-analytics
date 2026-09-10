/** @format */

import DashboardPageSessionBoundary from '@/app/(dashboard)/_components/dashboard-page-session-boundary';
import { DEFAULT_RANGE_TAG, getRangeDescription } from '@/lib/date-range';
import { Suspense } from 'react';
import ReservationsUnitDataFallback from '../../_components/unit-data-fallback';
import ReservationsUnitPageShell from '../../_components/unit-page-shell';
import UnitDataFromSearchParams, {
	type UnitSearchParams,
} from './unit-data-from-search-params';

export const instant = true;

export default function GetanVeraCruz({
	searchParams,
}: {
	searchParams: UnitSearchParams;
}) {
	return (
		<DashboardPageSessionBoundary>
			<ReservationsUnitPageShell title='Getan Vera Cruz'>
				<Suspense
					fallback={
						<ReservationsUnitDataFallback
							description={getRangeDescription(DEFAULT_RANGE_TAG)}
						/>
					}>
					<UnitDataFromSearchParams searchParams={searchParams} />
				</Suspense>
			</ReservationsUnitPageShell>
		</DashboardPageSessionBoundary>
	);
}

