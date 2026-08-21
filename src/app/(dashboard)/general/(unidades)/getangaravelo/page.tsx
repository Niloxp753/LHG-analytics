/** @format */

import {
  DEFAULT_RANGE_TAG,
  formatDateInput,
  getRangeDescription,
} from "@/lib/date-range";
import { Suspense } from "react";
import GeneralUnitDataFallback from "../../_components/unit-data-fallback";
import GeneralUnitPageShell from "../../_components/unit-page-shell";
import GeneralGetanGaraveloDataSection from "./unit-data-section";

type GetanGaraveloSearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export default function GetanGaravelo({
  searchParams,
}: {
  searchParams: GetanGaraveloSearchParams;
}) {
  const fallbackRangeDescription = getRangeDescription(DEFAULT_RANGE_TAG);

  return (
    <GeneralUnitPageShell title="Getan Garavelo">
      <Suspense
        fallback={
          <GeneralUnitDataFallback
            rangeDescription={fallbackRangeDescription}
          />
        }
      >
        <GetanGaraveloDataFromSearchParams searchParams={searchParams} />
      </Suspense>
    </GeneralUnitPageShell>
  );
}

async function GetanGaraveloDataFromSearchParams({
  searchParams,
}: {
  searchParams: GetanGaraveloSearchParams;
}) {
  const resolvedSearchParams = await searchParams;
  const preSet = resolvedSearchParams.set ?? DEFAULT_RANGE_TAG;
  const startDate = resolvedSearchParams.startDate;
  const endDate = resolvedSearchParams.endDate;
  const rangeDescription = getRangeDescription(preSet as string);

  const formattedStartDate = formatDateInput(startDate as string);
  const formattedEndDate = formatDateInput(endDate as string);

  return (
    <GeneralGetanGaraveloDataSection
      endDate={formattedEndDate}
      preSet={preSet as string}
      rangeDescription={rangeDescription}
      startDate={formattedStartDate}
    />
  );
}
