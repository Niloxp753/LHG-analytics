/** @format */

import {
  StandardReservationsUnitDataSection,
  type StandardReservationsUnitDataSectionProps,
} from "../../_components/standard-unit-data-section";

export default async function ReservationsAndarDeCimaDataSection(
  props: Omit<StandardReservationsUnitDataSectionProps, "company" | "unitName">,
) {
  return (
    <StandardReservationsUnitDataSection
      {...props}
      company="andar_de_cima"
      unitName="Andar de Cima"
    />
  );
}
