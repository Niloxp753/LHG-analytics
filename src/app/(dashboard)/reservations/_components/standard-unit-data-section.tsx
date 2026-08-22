/** @format */

import { getReservationsAction } from "@/actions/reservations/get-reservations";
import { getReservationsCustomAction } from "@/actions/reservations/get-reservations-custom";
import { TableReservs } from "@/app/(dashboard)/_components/kpis/TableReservs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { type CurrencyConfig } from "@/lib/currency-format";
import BigNumbersEcommerce from "./big-numbers-ecommerce";
import BigNumbersReservation from "./big-numbers-reservations";
import { hasEcommerceIndicatorsData } from "./ecommerce-visibility";
import { resolvePairedBarChartHeight } from "./paired-bar-chart-height";
import CategoriesXReservs from "./kpis/CategoriesXReservs";
import EcommerceRevenue from "./kpis/ecommerce-receita";
import EcommerceRevervs from "./kpis/ecommerce-reservas";
import InvoicingXChannel from "./kpis/InvoicingXChannel";
import InvoicingXReservs from "./kpis/InvoicingXReservs";
import InvoicingXTypes from "./kpis/InvoicingXTypes";
import LocationsXReservs from "./kpis/LocationsXReservs";
import Representation from "./kpis/Representation";

export type StandardReservationsUnitDataSectionProps = {
  company?: string;
  currencyConfig?: CurrencyConfig;
  description: string;
  endDate: string | null;
  preSet: string;
  startDate: string | null;
  unitName: string;
};

async function getStandardReservationsUnitData({
  company,
  endDate,
  preSet,
  startDate,
}: Pick<
  StandardReservationsUnitDataSectionProps,
  "company" | "endDate" | "preSet" | "startDate"
>) {
  if (startDate && endDate) {
    return getReservationsCustomAction(startDate, endDate, company);
  }

  return getReservationsAction(preSet, company);
}

export async function StandardReservationsUnitDataSection({
  company,
  currencyConfig,
  description,
  endDate,
  preSet,
  startDate,
  unitName,
}: StandardReservationsUnitDataSectionProps) {
  const resp = await getStandardReservationsUnitData({
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
          {`Não foi possível carregar os dados de reservas da ${unitName}.`}
        </AlertDescription>
      </Alert>
    );
  }

  const hasEcommerceData = hasEcommerceIndicatorsData({
    bigNumbers: resp.BigNumbersEcommerce,
    reservationsSeries: resp.ReservationsOfEcommerceByPeriod?.series,
    billingSeries: resp.BillingOfEcommerceByPeriod?.series,
  });
  const pairedBarChartHeight = resolvePairedBarChartHeight(
    resp.PaymentMethods?.categories,
    resp.BillingPerChannel?.categories,
  );

  return (
    <>
      <BigNumbersReservation
        data={resp.BigNumbers ?? null}
        description={description}
        currencyConfig={currencyConfig}
      />
      <CategoriesXReservs
        series={resp.ReservationsByRentalType?.series ?? null}
        categories={resp.ReservationsByRentalType?.categories}
      />
      <div className="flex flex-col md:flex-row w-full gap-5">
        <InvoicingXTypes
          height={pairedBarChartHeight}
          series={resp.PaymentMethods?.series ?? null}
          categories={resp.PaymentMethods?.categories}
          currencyConfig={currencyConfig}
        />
        <InvoicingXChannel
          height={pairedBarChartHeight}
          series={resp.BillingPerChannel?.series ?? null}
          categories={resp.BillingPerChannel?.categories}
          currencyConfig={currencyConfig}
        />
      </div>

      <div className="grid grid-cols-1 w-full gap-5">
        <InvoicingXReservs
          series={resp.BillingOfReservationsByPeriod?.series ?? null}
          categories={resp.BillingOfReservationsByPeriod?.categories}
          currencyConfig={currencyConfig}
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
          currencyConfig={currencyConfig}
        />
      </div>
      {hasEcommerceData && (
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-zinc-50 mt-10 mb-5">
            Indicadores de E-Commerce
          </h2>
          <div className="flex flex-col w-full items-start justify-between gap-5">
            <BigNumbersEcommerce
              data={resp.BigNumbersEcommerce ?? null}
              description={description}
              currencyConfig={currencyConfig}
            />

            <div className="w-full flex flex-col items-center justify-between gap-5">
              <EcommerceRevervs
                series={resp.ReservationsOfEcommerceByPeriod?.series ?? null}
                categories={resp.ReservationsOfEcommerceByPeriod?.categories}
              />
              <EcommerceRevenue
                series={resp.BillingOfEcommerceByPeriod?.series ?? null}
                categories={resp.BillingOfEcommerceByPeriod?.categories}
                currencyConfig={currencyConfig}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
