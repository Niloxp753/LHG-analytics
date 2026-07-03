/** @format */

import { getLivReservationsPageData } from "@/actions/liv/get-liv-reservations-page";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LIV_USD_CURRENCY_CONFIG } from "@/lib/currency-format";
import BigNumbersEcommerce from "../../_components/big-numbers-ecommerce";
import BigNumbersReservation from "../../_components/big-numbers-reservations";
import CategoriesXReservs from "../../_components/kpis/CategoriesXReservs";
import EcommerceRevenue from "../../_components/kpis/ecommerce-receita";
import EcommerceRevervs from "../../_components/kpis/ecommerce-reservas";
import InvoicingXChannel from "../../_components/kpis/InvoicingXChannel";
import InvoicingXReservs from "../../_components/kpis/InvoicingXReservs";
import InvoicingXTypes from "../../_components/kpis/InvoicingXTypes";
import LocationsXReservs from "../../_components/kpis/LocationsXReservs";
import Representation from "../../_components/kpis/Representation";
import { TableReservs } from "./_components/TableReservs";

type ReservationsLivDataSectionProps = {
  description: string;
  endDate: string | null;
  preSet: string;
  startDate: string | null;
};

export default async function ReservationsLivDataSection({
  description,
  endDate,
  preSet,
  startDate,
}: ReservationsLivDataSectionProps) {
  const result = await getLivReservationsPageData({
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
          Não foi possível carregar os dados de reservas da LIV.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <BigNumbersReservation
        data={resp.BigNumbers ?? null}
        description={description}
        currencyConfig={LIV_USD_CURRENCY_CONFIG}
      />
      <CategoriesXReservs
        series={resp.ReservationsByRentalType?.series ?? null}
        categories={resp.ReservationsByRentalType?.categories}
      />
      <div className="flex flex-col md:flex-row w-full gap-5">
        <InvoicingXTypes
          series={resp.PaymentMethods?.series ?? null}
          categories={resp.PaymentMethods?.categories}
          currencyConfig={LIV_USD_CURRENCY_CONFIG}
        />
        <InvoicingXChannel
          series={resp.BillingPerChannel?.series ?? null}
          categories={resp.BillingPerChannel?.categories}
          currencyConfig={LIV_USD_CURRENCY_CONFIG}
        />
      </div>

      <div className="grid grid-cols-1 w-full gap-5">
        <InvoicingXReservs
          series={resp.BillingOfReservationsByPeriod?.series ?? null}
          categories={resp.BillingOfReservationsByPeriod?.categories}
          currencyConfig={LIV_USD_CURRENCY_CONFIG}
        />
        <Representation
          series={resp.RepresentativenessOfReservesByPeriod?.series ?? null}
          categories={resp.RepresentativenessOfReservesByPeriod?.categories}
        />
        <LocationsXReservs
          series={resp.NumberOfReservationsPerPeriod?.series ?? null}
          categories={resp.NumberOfReservationsPerPeriod?.categories}
        />
      </div>
      <div>
        <TableReservs
          data={resp.KpiTableByChannelType?.[0] ?? null}
          currencyConfig={LIV_USD_CURRENCY_CONFIG}
        />
      </div>
      <div>
        <h2 className="text-2xl md:text-4xl font-bold text-zinc-50 mt-10 mb-5">
          Indicadores de E-Commerce
        </h2>
        <div className="flex flex-col w-full items-start justify-between gap-5">
          <BigNumbersEcommerce
            data={resp.BigNumbersEcommerce ?? null}
            description={description}
            currencyConfig={LIV_USD_CURRENCY_CONFIG}
          />

          <div className="w-full flex flex-col items-center justify-between gap-5">
            <EcommerceRevervs
              series={resp.ReservationsOfEcommerceByPeriod?.series ?? null}
              categories={resp.ReservationsOfEcommerceByPeriod?.categories}
            />
            <EcommerceRevenue
              series={resp.BillingOfEcommerceByPeriod?.series ?? null}
              categories={resp.BillingOfEcommerceByPeriod?.categories}
              currencyConfig={LIV_USD_CURRENCY_CONFIG}
            />
          </div>
        </div>
      </div>
    </>
  );
}
