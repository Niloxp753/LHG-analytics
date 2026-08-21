/** @format */

import {
  StandardRestaurantUnitDataSection,
  type StandardRestaurantUnitDataSectionProps,
} from "../../_components/standard-unit-data-section";

export default async function RestaurantGetanGaraveloDataSection(
  props: Omit<
    StandardRestaurantUnitDataSectionProps,
    "company" | "unitName"
  >,
) {
  return (
    <StandardRestaurantUnitDataSection
      {...props}
      company="getan_garavelo"
      unitName="Getan Garavelo"
    />
  );
}
