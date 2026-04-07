/** @format */

import {
  DEFAULT_RANGE_TAG,
  formatDateInput,
  getRangeDescription,
} from "@/lib/date-range";
import { Suspense } from "react";
import RestaurantUnitDataFallback from "../../_components/unit-data-fallback";
import RestaurantUnitPageShell from "../../_components/unit-page-shell";
import RestaurantToutDataSection from "./unit-data-section";

export default async function Tout({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const preSet = resolvedSearchParams.set ?? DEFAULT_RANGE_TAG;
  const startDate = resolvedSearchParams.startDate;
  const endDate = resolvedSearchParams.endDate;
  const rangeDescription = getRangeDescription(preSet as string);

  const formattedStartDate = formatDateInput(startDate as string);
  const formattedEndDate = formatDateInput(endDate as string);

  return (
    <RestaurantUnitPageShell title="Tout">
      <Suspense
        fallback={<RestaurantUnitDataFallback description={rangeDescription} />}
      >
        <RestaurantToutDataSection
          description={rangeDescription}
          endDate={formattedEndDate}
          preSet={preSet as string}
          startDate={formattedStartDate}
        />
      </Suspense>
    </RestaurantUnitPageShell>
  );
}
