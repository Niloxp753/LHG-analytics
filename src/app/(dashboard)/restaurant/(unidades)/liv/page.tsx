/** @format */

import { DEFAULT_RANGE_TAG, getRangeDescription } from "@/lib/date-range";
import { Suspense } from "react";
import RestaurantUnitDataFallback from "../../_components/unit-data-fallback";
import RestaurantUnitPageShell from "../../_components/unit-page-shell";
import UnitDataFromSearchParams, {
  type UnitSearchParams,
} from "./unit-data-from-search-params";

export const instant = true;

export default function Liv({
  searchParams,
}: {
  searchParams: UnitSearchParams;
}) {
  const fallbackRangeDescription = getRangeDescription(DEFAULT_RANGE_TAG);

  return (
    <RestaurantUnitPageShell title="LIV">
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
  );
}
