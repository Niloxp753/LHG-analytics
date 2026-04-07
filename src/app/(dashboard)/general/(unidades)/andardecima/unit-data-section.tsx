/** @format */

import {
  StandardGeneralUnitDataSection,
  type StandardGeneralUnitDataSectionProps,
} from "../../_components/standard-unit-data-section";

export default async function GeneralAndarDeCimaDataSection(
  props: Omit<StandardGeneralUnitDataSectionProps, "company">,
) {
  return <StandardGeneralUnitDataSection {...props} company="andar_de_cima" />;
}
