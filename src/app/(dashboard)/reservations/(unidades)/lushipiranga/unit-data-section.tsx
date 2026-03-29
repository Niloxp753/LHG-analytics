/** @format */

import {
  StandardReservationsUnitDataSection,
  type StandardReservationsUnitDataSectionProps,
} from "../../_components/standard-unit-data-section";

export default async function ReservationsLushIpirangaDataSection(
  props: Omit<StandardReservationsUnitDataSectionProps, "company" | "unitName">,
) {
  return (
    <StandardReservationsUnitDataSection {...props} unitName="Lush Ipiranga" />
  );
}
