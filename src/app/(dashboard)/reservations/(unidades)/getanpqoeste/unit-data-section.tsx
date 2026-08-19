/** @format */

import {
  StandardReservationsUnitDataSection,
  type StandardReservationsUnitDataSectionProps,
} from "../../_components/standard-unit-data-section";

export default async function ReservationsGetanParqueOesteDataSection(
  props: Omit<
    StandardReservationsUnitDataSectionProps,
    "company" | "unitName"
  >,
) {
  return (
    <StandardReservationsUnitDataSection
      {...props}
      company="getan_pq_oeste"
      unitName="Getan Parque Oeste"
    />
  );
}
