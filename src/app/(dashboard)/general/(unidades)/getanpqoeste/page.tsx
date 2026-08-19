/** @format */

import {
  DEFAULT_RANGE_TAG,
  formatDateInput,
  getRangeDescription,
} from "@/lib/date-range";
import { Suspense } from "react";
import GeneralUnitDataFallback from "../../_components/unit-data-fallback";
import GeneralUnitPageShell from "../../_components/unit-page-shell";
import GeneralGetanParqueOesteDataSection from "./unit-data-section";

type GetanParqueOesteSearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export default function GetanParqueOeste({
  searchParams,
}: {
  searchParams: GetanParqueOesteSearchParams;
}) {
  const fallbackRangeDescription = getRangeDescription(DEFAULT_RANGE_TAG);

  return (
    <GeneralUnitPageShell title="Getan Parque Oeste">
      <Suspense
        fallback={
          <GeneralUnitDataFallback
            rangeDescription={fallbackRangeDescription}
          />
        }
      >
        <GetanParqueOesteDataFromSearchParams searchParams={searchParams} />
      </Suspense>
    </GeneralUnitPageShell>
  );
}

async function GetanParqueOesteDataFromSearchParams({
  searchParams,
}: {
  searchParams: GetanParqueOesteSearchParams;
}) {
  const resolvedSearchParams = await searchParams;
  const preSet = resolvedSearchParams.set ?? DEFAULT_RANGE_TAG;
  const startDate = resolvedSearchParams.startDate;
  const endDate = resolvedSearchParams.endDate;
  const rangeDescription = getRangeDescription(preSet as string);

  const formattedStartDate = formatDateInput(startDate as string);
  const formattedEndDate = formatDateInput(endDate as string);

  return (
    <GeneralGetanParqueOesteDataSection
      endDate={formattedEndDate}
      preSet={preSet as string}
      rangeDescription={rangeDescription}
      startDate={formattedStartDate}
    />
  );
}
