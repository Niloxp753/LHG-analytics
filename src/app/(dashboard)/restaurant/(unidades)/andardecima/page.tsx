/** @format */

import DashboardPageSessionBoundary from '@/app/(dashboard)/_components/dashboard-page-session-boundary';
import { DEFAULT_RANGE_TAG, getRangeDescription } from "@/lib/date-range";
import { Suspense } from "react";
import RestaurantUnitDataFallback from "../../_components/unit-data-fallback";
import RestaurantUnitPageShell from "../../_components/unit-page-shell";
import UnitDataFromSearchParams, {
  type UnitSearchParams,
} from "./unit-data-from-search-params";

export const instant = true;

export default function AndarDeCima({
  searchParams,
}: {
  searchParams: UnitSearchParams;
}) {
  const fallbackRangeDescription = getRangeDescription(DEFAULT_RANGE_TAG);

  return (
    <DashboardPageSessionBoundary>
      <RestaurantUnitPageShell title="Andar de Cima">
      <Suspense
        fallback={
          <RestaurantUnitDataFallback
            description={fallbackRangeDescription}
          />
        }
      >
        <UnitDataFromSearchParams searchParams={searchParams} />
      </Suspense>
      </RestaurantUnitPageShell>
    </DashboardPageSessionBoundary>
  );
}
