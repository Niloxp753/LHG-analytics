/** @format */

import {
  StandardGeneralUnitDataSection,
  type StandardGeneralUnitDataSectionProps,
} from "../../_components/standard-unit-data-section";

export default async function GeneralAltanaDataSection(
  props: Omit<StandardGeneralUnitDataSectionProps, "company">,
) {
  return <StandardGeneralUnitDataSection {...props} company="altana" />;
}
