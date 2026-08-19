/** @format */

import {
  DEFAULT_RANGE_TAG,
  formatDateInput,
  getRangeDescription,
} from "@/lib/date-range";
import { Suspense } from "react";
import GeneralUnitDataFallback from "../../_components/unit-data-fallback";
import GeneralUnitPageShell from "../../_components/unit-page-shell";
import GeneralAndarDeCimaDataSection from "./unit-data-section";

type GeneralUnitSearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export default function AndarDeCima({
  searchParams,
}: {
  searchParams: GeneralUnitSearchParams;
}) {
  const fallbackRangeDescription = getRangeDescription(DEFAULT_RANGE_TAG);

  return (
    <GeneralUnitPageShell title="Andar de Cima">
      <Suspense
        fallback={
          <GeneralUnitDataFallback
            rangeDescription={fallbackRangeDescription}
          />
        }
      >
        <GeneralUnitDataFromSearchParams searchParams={searchParams} />
      </Suspense>
    </GeneralUnitPageShell>
  );
}

async function GeneralUnitDataFromSearchParams({
  searchParams,
}: {
  searchParams: GeneralUnitSearchParams;
}) {
  const resolvedSearchParams = await searchParams;
  const preSet = resolvedSearchParams.set ?? DEFAULT_RANGE_TAG;
  const rangeDescription = getRangeDescription(preSet as string);

  return (
    <GeneralAndarDeCimaDataSection
      endDate={formatDateInput(resolvedSearchParams.endDate as string)}
      preSet={preSet as string}
      rangeDescription={rangeDescription}
      startDate={formatDateInput(resolvedSearchParams.startDate as string)}
    />
  );
}
