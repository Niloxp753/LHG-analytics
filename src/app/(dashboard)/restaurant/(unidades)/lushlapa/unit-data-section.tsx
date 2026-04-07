/** @format */

import {
  StandardRestaurantUnitDataSection,
  type StandardRestaurantUnitDataSectionProps,
} from "../../_components/standard-unit-data-section";

export default async function RestaurantLushLapaDataSection(
  props: Omit<StandardRestaurantUnitDataSectionProps, "company" | "unitName">,
) {
  return (
    <StandardRestaurantUnitDataSection
      {...props}
      company="lapa"
      unitName="Lush Lapa"
    />
  );
}
