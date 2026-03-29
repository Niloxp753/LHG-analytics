/** @format */

import {
  DEFAULT_RANGE_TAG,
  formatDateInput,
  getRangeDescription,
} from "@/lib/date-range";
import { Suspense } from "react";
import GeneralUnitDataFallback from "../../_components/unit-data-fallback";
import GeneralUnitPageShell from "../../_components/unit-page-shell";
import GeneralLushIpirangaDataSection from "./unit-data-section";

export default async function LushIpiranga({
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
    <GeneralUnitPageShell title="Lush Ipiranga">
      <Suspense
        fallback={
          <GeneralUnitDataFallback rangeDescription={rangeDescription} />
        }
      >
        <GeneralLushIpirangaDataSection
          endDate={formattedEndDate}
          preSet={preSet as string}
          rangeDescription={rangeDescription}
          startDate={formattedStartDate}
        />
      </Suspense>
    </GeneralUnitPageShell>
  );
}
