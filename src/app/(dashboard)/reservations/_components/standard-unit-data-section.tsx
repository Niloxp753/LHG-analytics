/** @format */

import { getReservationsAction } from "@/actions/reservations/get-reservations";
import { getReservationsCustomAction } from "@/actions/reservations/get-reservations-custom";
import { TableReservs } from "@/app/(dashboard)/_components/kpis/TableReservs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import BigNumbersEcommerce from "./big-numbers-ecommerce";
import BigNumbersReservation from "./big-numbers-reservations";
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
          {`N\u00e3o foi poss\u00edvel carregar os dados de reservas da ${unitName}.`}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <BigNumbersReservation
        data={resp.BigNumbers ?? null}
        description={description}
      />
      <CategoriesXReservs
        series={resp.ReservationsByRentalType?.series ?? null}
        categories={resp.ReservationsByRentalType?.categories}
      />
      <div className="flex flex-col md:flex-row w-full gap-5">
        <InvoicingXTypes
          series={resp.PaymentMethods?.series ?? null}
          categories={resp.PaymentMethods?.categories}
        />
        <InvoicingXChannel
          series={resp.BillingPerChannel?.series ?? null}
          categories={resp.BillingPerChannel?.categories}
        />
      </div>

      <div className="grid grid-cols-1 w-full gap-5">
        <InvoicingXReservs
          series={resp.BillingOfReservationsByPeriod?.series ?? null}
          categories={resp.BillingOfReservationsByPeriod?.categories}
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
        <TableReservs data={resp.KpiTableByChannelType?.[0] ?? null} />
      </div>
      <div>
        <h2 className="text-2xl md:text-4xl font-bold text-zinc-50 mt-10 mb-5">
          Indicadores de E-Commerce
        </h2>
        <div className="flex flex-col w-full items-start justify-between gap-5">
          <BigNumbersEcommerce
            data={resp.BigNumbersEcommerce ?? null}
            description={description}
          />

          <div className="w-full flex flex-col items-center justify-between gap-5">
            <EcommerceRevervs
              series={resp.ReservationsOfEcommerceByPeriod?.series ?? null}
              categories={resp.ReservationsOfEcommerceByPeriod?.categories}
            />
            <EcommerceRevenue
              series={resp.BillingOfEcommerceByPeriod?.series ?? null}
              categories={resp.BillingOfEcommerceByPeriod?.categories}
            />
          </div>
        </div>
      </div>
    </>
  );
}
