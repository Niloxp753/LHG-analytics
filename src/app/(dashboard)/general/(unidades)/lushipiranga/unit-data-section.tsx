/** @format */

import {
  StandardGeneralUnitDataSection,
  type StandardGeneralUnitDataSectionProps,
} from "../../_components/standard-unit-data-section";

export default async function GeneralLushIpirangaDataSection(
  props: Omit<StandardGeneralUnitDataSectionProps, "company">,
) {
  return <StandardGeneralUnitDataSection {...props} />;
}
