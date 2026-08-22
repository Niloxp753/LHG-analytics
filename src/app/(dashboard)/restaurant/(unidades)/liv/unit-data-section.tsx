/** @format */

import { LIV_USD_CURRENCY_CONFIG } from "@/lib/currency-format";
import {
  StandardRestaurantUnitDataSection,
  type StandardRestaurantUnitDataSectionProps,
} from "../../_components/standard-unit-data-section";

export default async function RestaurantLivDataSection(
  props: Omit<
    StandardRestaurantUnitDataSectionProps,
    "company" | "currencyConfig" | "unitName"
  >,
) {
  return (
    <StandardRestaurantUnitDataSection
      {...props}
      company="liv"
      currencyConfig={LIV_USD_CURRENCY_CONFIG}
      unitName="LIV"
    />
  );
}
