/** @format */

import { getLivCompanyPageData } from "@/actions/liv/get-liv-company-page";
import ErrorState from "@/app/(dashboard)/_components/ErrorState";
import GeneralUnitDataContent from "../../_components/unit-data-content";
import { LIV_USD_CURRENCY_CONFIG } from "@/lib/currency-format";

type GeneralLivDataSectionProps = {
  endDate: string | null;
  preSet: string;
  rangeDescription: string;
  startDate: string | null;
};

export default async function GeneralLivDataSection({
  endDate,
  preSet,
  rangeDescription,
  startDate,
}: GeneralLivDataSectionProps) {
  const result = await getLivCompanyPageData({
    period: preSet,
    startDate,
    endDate,
  });
  const resp = result.ok ? result.data : null;

  if (!resp) {
    return <ErrorState />;
  }

  return (
    <GeneralUnitDataContent
      data={resp}
      rangeDescription={rangeDescription}
      currencyConfig={LIV_USD_CURRENCY_CONFIG}
    />
  );
}
