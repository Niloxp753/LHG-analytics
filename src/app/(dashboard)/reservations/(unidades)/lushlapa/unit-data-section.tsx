/** @format */

import {
  StandardReservationsUnitDataSection,
  type StandardReservationsUnitDataSectionProps,
} from "../../_components/standard-unit-data-section";

export default async function ReservationsLushLapaDataSection(
  props: Omit<StandardReservationsUnitDataSectionProps, "company" | "unitName">,
) {
  return (
    <StandardReservationsUnitDataSection
      {...props}
      company="lapa"
      unitName="Lush Lapa"
    />
  );
}
