/** @format */

import {
  StandardRestaurantUnitDataSection,
  type StandardRestaurantUnitDataSectionProps,
} from "../../_components/standard-unit-data-section";

export default async function RestaurantToutDataSection(
  props: Omit<StandardRestaurantUnitDataSectionProps, "company" | "unitName">,
) {
  return (
    <StandardRestaurantUnitDataSection
      {...props}
      company="tout"
      unitName="Tout"
    />
  );
}
