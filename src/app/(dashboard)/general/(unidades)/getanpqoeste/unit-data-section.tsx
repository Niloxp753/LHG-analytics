/** @format */

import {
  StandardGeneralUnitDataSection,
  type StandardGeneralUnitDataSectionProps,
} from "../../_components/standard-unit-data-section";

export default async function GeneralGetanParqueOesteDataSection(
  props: Omit<StandardGeneralUnitDataSectionProps, "company">,
) {
  return (
    <StandardGeneralUnitDataSection
      {...props}
      company="getan_pq_oeste"
    />
  );
}
