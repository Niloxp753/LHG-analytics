/** @format */

import { DEFAULT_RANGE_TAG, getRangeDescription } from "@/lib/date-range";
import { Suspense } from "react";
import GeneralUnitDataFallback from "../../_components/unit-data-fallback";
import GeneralUnitPageShell from "../../_components/unit-page-shell";
import UnitDataFromSearchParams, {
  type UnitSearchParams,
} from "./unit-data-from-search-params";

export const instant = true;

export default function LushLapa({
  searchParams,
}: {
  searchParams: UnitSearchParams;
}) {
  const fallbackRangeDescription = getRangeDescription(DEFAULT_RANGE_TAG);

  return (
    <GeneralUnitPageShell title="Lush Lapa">
      <Suspense
        fallback={
          <GeneralUnitDataFallback
            rangeDescription={fallbackRangeDescription}
          />
        }
      >
        <UnitDataFromSearchParams searchParams={searchParams} />
      </Suspense>
    </GeneralUnitPageShell>
  );
}
