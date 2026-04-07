/** @format */

import {
  StandardReservationsUnitDataSection,
  type StandardReservationsUnitDataSectionProps,
} from "../../_components/standard-unit-data-section";

export default async function ReservationsToutDataSection(
  props: Omit<StandardReservationsUnitDataSectionProps, "company" | "unitName">,
) {
  return (
    <StandardReservationsUnitDataSection
      {...props}
      company="tout"
      unitName="Tout"
    />
  );
}
