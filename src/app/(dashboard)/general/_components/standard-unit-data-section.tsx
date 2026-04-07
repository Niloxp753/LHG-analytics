/** @format */

import { getCompanyAction } from "@/actions/getCompany";
import { getCompanyCustomAction } from "@/actions/getCompanyCustom";
import ErrorState from "@/app/(dashboard)/_components/ErrorState";
import GeneralUnitDataContent from "./unit-data-content";

export type StandardGeneralUnitDataSectionProps = {
  company?: string;
  endDate: string | null;
  preSet: string;
  rangeDescription: string;
  startDate: string | null;
};

async function getStandardGeneralUnitData({
  company,
  endDate,
  preSet,
  startDate,
}: Pick<
  StandardGeneralUnitDataSectionProps,
  "company" | "endDate" | "preSet" | "startDate"
>) {
  if (startDate && endDate) {
    return getCompanyCustomAction(startDate, endDate, company);
  }

  return getCompanyAction(preSet, company);
}

export async function StandardGeneralUnitDataSection({
  company,
  endDate,
  preSet,
  rangeDescription,
  startDate,
}: StandardGeneralUnitDataSectionProps) {
  const resp = await getStandardGeneralUnitData({
    company,
    endDate,
    preSet,
    startDate,
  });

  if (!resp) {
    return <ErrorState />;
  }

  return (
    <GeneralUnitDataContent data={resp} rangeDescription={rangeDescription} />
  );
}
