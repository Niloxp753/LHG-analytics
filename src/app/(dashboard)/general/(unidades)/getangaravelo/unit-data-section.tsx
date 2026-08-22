/** @format */

import {
  StandardGeneralUnitDataSection,
  type StandardGeneralUnitDataSectionProps,
} from "../../_components/standard-unit-data-section";

export default async function GeneralGetanGaraveloDataSection(
  props: Omit<StandardGeneralUnitDataSectionProps, "company">,
) {
  return (
    <StandardGeneralUnitDataSection
      {...props}
      company="getan_garavelo"
    />
  );
}
