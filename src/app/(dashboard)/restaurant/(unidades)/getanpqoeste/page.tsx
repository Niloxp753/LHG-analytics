/** @format */

import {
  DEFAULT_RANGE_TAG,
  formatDateInput,
  getRangeDescription,
} from "@/lib/date-range";
import { Suspense } from "react";
import RestaurantUnitDataFallback from "../../_components/unit-data-fallback";
import RestaurantUnitPageShell from "../../_components/unit-page-shell";
import RestaurantGetanParqueOesteDataSection from "./unit-data-section";

type RestaurantUnitSearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export default function GetanParqueOeste({
  searchParams,
}: {
  searchParams: RestaurantUnitSearchParams;
}) {
  const fallbackRangeDescription = getRangeDescription(DEFAULT_RANGE_TAG);

  return (
    <RestaurantUnitPageShell title="Getan Parque Oeste">
      <Suspense
        fallback={
          <RestaurantUnitDataFallback
            description={fallbackRangeDescription}
          />
        }
      >
        <RestaurantUnitDataFromSearchParams searchParams={searchParams} />
      </Suspense>
    </RestaurantUnitPageShell>
  );
}

async function RestaurantUnitDataFromSearchParams({
  searchParams,
}: {
  searchParams: RestaurantUnitSearchParams;
}) {
  const resolvedSearchParams = await searchParams;
  const preSet = resolvedSearchParams.set ?? DEFAULT_RANGE_TAG;
  const rangeDescription = getRangeDescription(preSet as string);

  return (
    <RestaurantGetanParqueOesteDataSection
      description={rangeDescription}
      endDate={formatDateInput(resolvedSearchParams.endDate as string)}
      preSet={preSet as string}
      startDate={formatDateInput(resolvedSearchParams.startDate as string)}
    />
  );
}
