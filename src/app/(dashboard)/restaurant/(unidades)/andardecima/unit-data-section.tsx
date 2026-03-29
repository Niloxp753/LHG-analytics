/** @format */

import {
  StandardRestaurantUnitDataSection,
  type StandardRestaurantUnitDataSectionProps,
} from "../../_components/standard-unit-data-section";

export default async function RestaurantAndarDeCimaDataSection(
  props: Omit<StandardRestaurantUnitDataSectionProps, "company" | "unitName">,
) {
  return (
    <StandardRestaurantUnitDataSection
      {...props}
      company="andar_de_cima"
      unitName="Andar de Cima"
    />
  );
}
