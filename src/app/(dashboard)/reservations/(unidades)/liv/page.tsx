/** @format */

import {
  DEFAULT_RANGE_TAG,
  formatDateInput,
  getRangeDescription,
} from "@/lib/date-range";
import { Suspense } from "react";
import ReservationsUnitDataFallback from "../../_components/unit-data-fallback";
import ReservationsUnitPageShell from "../../_components/unit-page-shell";
import ReservationsLivDataSection from "./unit-data-section";

type ReservationsUnitSearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export default function Liv({
  searchParams,
}: {
  searchParams: ReservationsUnitSearchParams;
}) {
  const fallbackRangeDescription = getRangeDescription(DEFAULT_RANGE_TAG);

  return (
    <ReservationsUnitPageShell title="LIV">
      <Suspense
        fallback={
          <ReservationsUnitDataFallback
            description={fallbackRangeDescription}
          />
        }
      >
        <ReservationsUnitDataFromSearchParams searchParams={searchParams} />
      </Suspense>
    </ReservationsUnitPageShell>
  );
}

async function ReservationsUnitDataFromSearchParams({
  searchParams,
}: {
  searchParams: ReservationsUnitSearchParams;
}) {
  const resolvedSearchParams = await searchParams;
  const preSet = resolvedSearchParams.set ?? DEFAULT_RANGE_TAG;
  const rangeDescription = getRangeDescription(preSet as string);

  return (
    <ReservationsLivDataSection
      description={rangeDescription}
      endDate={formatDateInput(resolvedSearchParams.endDate as string)}
      preSet={preSet as string}
      startDate={formatDateInput(resolvedSearchParams.startDate as string)}
    />
  );
}
