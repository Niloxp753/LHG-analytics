/** @format */

import {
  StandardRestaurantUnitDataSection,
  type StandardRestaurantUnitDataSectionProps,
} from "../../_components/standard-unit-data-section";

export default async function RestaurantAltanaDataSection(
  props: Omit<StandardRestaurantUnitDataSectionProps, "company" | "unitName">,
) {
  return (
    <StandardRestaurantUnitDataSection
      {...props}
      company="altana"
      unitName="Altana"
    />
  );
}
