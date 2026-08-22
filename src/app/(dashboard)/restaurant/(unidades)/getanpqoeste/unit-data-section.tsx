/** @format */

import {
  StandardRestaurantUnitDataSection,
  type StandardRestaurantUnitDataSectionProps,
} from "../../_components/standard-unit-data-section";

export default async function RestaurantGetanParqueOesteDataSection(
  props: Omit<
    StandardRestaurantUnitDataSectionProps,
    "company" | "unitName"
  >,
) {
  return (
    <StandardRestaurantUnitDataSection
      {...props}
      company="getan_pq_oeste"
      unitName="Getan Parque Oeste"
    />
  );
}
