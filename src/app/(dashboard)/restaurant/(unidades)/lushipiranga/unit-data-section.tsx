/** @format */

import {
  StandardRestaurantUnitDataSection,
  type StandardRestaurantUnitDataSectionProps,
} from "../../_components/standard-unit-data-section";

export default async function RestaurantLushIpirangaDataSection(
  props: Omit<StandardRestaurantUnitDataSectionProps, "company" | "unitName">,
) {
  return (
    <StandardRestaurantUnitDataSection {...props} unitName="Lush Ipiranga" />
  );
}
