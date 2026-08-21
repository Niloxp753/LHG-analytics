/** @format */

import {
  StandardReservationsUnitDataSection,
  type StandardReservationsUnitDataSectionProps,
} from "../../_components/standard-unit-data-section";

export default async function ReservationsGetanGaraveloDataSection(
  props: Omit<
    StandardReservationsUnitDataSectionProps,
    "company" | "unitName"
  >,
) {
  return (
    <StandardReservationsUnitDataSection
      {...props}
      company="getan_garavelo"
      unitName="Getan Garavelo"
    />
  );
}
