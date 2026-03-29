/** @format */

import {
  DEFAULT_RANGE_TAG,
  formatDateInput,
  getRangeDescription,
} from "@/lib/date-range";
import { Suspense } from "react";
import ReservationsUnitDataFallback from "../../_components/unit-data-fallback";
import ReservationsUnitPageShell from "../../_components/unit-page-shell";
import ReservationsLushLapaDataSection from "./unit-data-section";

export default async function LushLapa({
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
    <ReservationsUnitPageShell title="Lush Lapa">
      <Suspense
        fallback={
          <ReservationsUnitDataFallback description={rangeDescription} />
        }
      >
        <ReservationsLushLapaDataSection
          description={rangeDescription}
          endDate={formattedEndDate}
          preSet={preSet as string}
          startDate={formattedStartDate}
        />
      </Suspense>
    </ReservationsUnitPageShell>
  );
}
