/** @format */

import { getRestaurantsCustomAction } from "@/actions/restaurants/get-restaurant-custom";
import { getRestaurantsAction } from "@/actions/restaurants/get-restaurants";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { type CurrencyConfig } from "@/lib/currency-format";
import RestaurantUnitDataContent from "./unit-data-content";

export type StandardRestaurantUnitDataSectionProps = {
  company?: string;
  currencyConfig?: CurrencyConfig;
  description: string;
  endDate: string | null;
  preSet: string;
  startDate: string | null;
  unitName: string;
};

async function getStandardRestaurantUnitData({
  company,
  endDate,
  preSet,
  startDate,
}: Pick<
  StandardRestaurantUnitDataSectionProps,
  "company" | "endDate" | "preSet" | "startDate"
>) {
  if (startDate && endDate) {
    return getRestaurantsCustomAction(startDate, endDate, company);
  }

  return getRestaurantsAction(preSet, company);
}

export async function StandardRestaurantUnitDataSection({
  company,
  currencyConfig,
  description,
  endDate,
  preSet,
  startDate,
  unitName,
}: StandardRestaurantUnitDataSectionProps) {
  const resp = await getStandardRestaurantUnitData({
    company,
    endDate,
    preSet,
    startDate,
  });

  if (!resp) {
    return (
      <Alert variant="destructive" className="w-full">
        <AlertTitle>Erro ao carregar</AlertTitle>
        <AlertDescription>
          {`N\u00e3o foi poss\u00edvel carregar os dados do restaurante ${unitName}.`}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <RestaurantUnitDataContent
      currencyConfig={currencyConfig}
      data={resp}
      description={description}
    />
  );
}
