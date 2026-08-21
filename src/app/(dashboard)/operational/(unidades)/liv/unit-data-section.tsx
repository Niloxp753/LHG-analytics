/** @format */

import {
  StandardOperationalUnitDataSection,
  type StandardOperationalUnitDataSectionProps,
} from "../../_components/standard-unit-data-section";

export default async function OperationalLivDataSection(
  props: Omit<
    StandardOperationalUnitDataSectionProps,
    "company" | "idealNumber" | "unitName"
  >,
) {
  return (
    <StandardOperationalUnitDataSection
      {...props}
      company="liv"
      idealNumber={18}
      unitName="LIV"
    />
  );
}
