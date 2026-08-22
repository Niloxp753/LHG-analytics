/** @format */

import { DEFAULT_RANGE_TAG, getRangeDescription } from "@/lib/date-range";
import { Suspense } from "react";
import ReservationsUnitDataFallback from "../../_components/unit-data-fallback";
import ReservationsUnitPageShell from "../../_components/unit-page-shell";
import UnitDataFromSearchParams, {
  type UnitSearchParams,
} from "./unit-data-from-search-params";

export const instant = true;

export default function GetanParqueOeste({
  searchParams,
}: {
  searchParams: UnitSearchParams;
}) {
  const fallbackRangeDescription = getRangeDescription(DEFAULT_RANGE_TAG);

  return (
    <ReservationsUnitPageShell title="Getan Parque Oeste">
      <Suspense
        fallback={
          <ReservationsUnitDataFallback
            description={fallbackRangeDescription}
          />
        }
      >
        <UnitDataFromSearchParams searchParams={searchParams} />
      </Suspense>
    </ReservationsUnitPageShell>
  );
}
