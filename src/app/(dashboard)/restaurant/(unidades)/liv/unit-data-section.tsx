/** @format */

import { getLivRestaurantPageData } from "@/actions/liv/get-liv-restaurant-page";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LIV_USD_CURRENCY_CONFIG } from "@/lib/currency-format";
import RestaurantUnitDataContent from "../../_components/unit-data-content";

type RestaurantLivDataSectionProps = {
  description: string;
  endDate: string | null;
  preSet: string;
  startDate: string | null;
};

export default async function RestaurantLivDataSection({
  description,
  endDate,
  preSet,
  startDate,
}: RestaurantLivDataSectionProps) {
  const result = await getLivRestaurantPageData({
    period: preSet,
    startDate,
    endDate,
  });
  const resp = result.ok ? result.data : null;

  if (!resp) {
    return (
      <Alert variant="destructive" className="w-full">
        <AlertTitle>Erro ao carregar</AlertTitle>
        <AlertDescription>
          Não foi possível carregar os dados do restaurante LIV.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <RestaurantUnitDataContent
      data={resp}
      description={description}
      currencyConfig={LIV_USD_CURRENCY_CONFIG}
    />
  );
}
