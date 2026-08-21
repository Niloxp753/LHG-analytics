/** @format */

import { LIV_USD_CURRENCY_CONFIG } from "@/lib/currency-format";
import {
  StandardGeneralUnitDataSection,
  type StandardGeneralUnitDataSectionProps,
} from "../../_components/standard-unit-data-section";

export default async function GeneralLivDataSection(
  props: Omit<
    StandardGeneralUnitDataSectionProps,
    "company" | "currencyConfig"
  >,
) {
  return (
    <StandardGeneralUnitDataSection
      {...props}
      company="liv"
      currencyConfig={LIV_USD_CURRENCY_CONFIG}
    />
  );
}
