/** @format */

import { LIV_USD_CURRENCY_CONFIG } from "@/lib/currency-format";
import {
  StandardReservationsUnitDataSection,
  type StandardReservationsUnitDataSectionProps,
} from "../../_components/standard-unit-data-section";

export default async function ReservationsLivDataSection(
  props: Omit<
    StandardReservationsUnitDataSectionProps,
    "company" | "currencyConfig" | "unitName"
  >,
) {
  return (
    <StandardReservationsUnitDataSection
      {...props}
      company="liv"
      currencyConfig={LIV_USD_CURRENCY_CONFIG}
      unitName="LIV"
    />
  );
}
