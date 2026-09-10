/** @format */

import type { ComponentProps } from "react";
import BigNumbers from "@/app/(dashboard)/_components/bignumber";
import GiroByDate from "@/app/(dashboard)/_components/kpis/GiroByDate";
import Invoicing from "@/app/(dashboard)/_components/kpis/Invoicing";
import Categories from "@/app/(dashboard)/_components/kpis/InvoicingXCategories";
import InvoicingXLocation from "@/app/(dashboard)/_components/kpis/InvoicingXLocation";
import Locations from "@/app/(dashboard)/_components/kpis/Locations";
import Occupation from "@/app/(dashboard)/_components/kpis/Occupation";
import OccupationCasaLush from "@/app/(dashboard)/_components/kpis/OccupationCasaLush";
import RevPar from "@/app/(dashboard)/_components/kpis/RevPar";
import TableKpiCategory from "@/app/(dashboard)/_components/kpis/TableKpiCategory";
import { TableKpiGiro } from "@/app/(dashboard)/_components/kpis/TableKpiGiro";
import { TableKpiOccupation } from "@/app/(dashboard)/_components/kpis/TableKpiOccupation";
import { TableKpiRevpar } from "@/app/(dashboard)/_components/kpis/TableKpiRevpar";
import Ticket from "@/app/(dashboard)/_components/kpis/Ticket";
import TRevPar from "@/app/(dashboard)/_components/kpis/TRevPar";
import DeferredChartMount from "@/app/(dashboard)/_components/charts/deferred-chart-mount";
import { type CurrencyConfig } from "@/lib/currency-format";

type GeneralUnitDataContentData = {
  BigNumbers?: ComponentProps<typeof BigNumbers>["data"];
  BillingRentalType?: ComponentProps<typeof InvoicingXLocation>["data"];
  RevenueBySuiteCategory?: ComponentProps<typeof Categories>["data"];
  TrevparByDate?: ComponentProps<typeof TRevPar>["data"];
  RevparByDate?: ComponentProps<typeof RevPar>["data"];
  RevenueByDate?: ComponentProps<typeof Invoicing>["data"];
  GiroByDate?: ComponentProps<typeof GiroByDate>["data"];
  RentalsByDate?: ComponentProps<typeof Locations>["data"];
  TicketAverageByDate?: ComponentProps<typeof Ticket>["data"];
  OccupancyRateByDate?: ComponentProps<typeof Occupation>["data"];
  OccupancyRateBySuiteCategory?: ComponentProps<typeof OccupationCasaLush>["data"];
  DataTableSuiteCategory?: ComponentProps<typeof TableKpiCategory>["dataTable"];
  TotalResult?: ComponentProps<typeof TableKpiCategory>["datatableResult"];
  DataTableGiroByWeek?: ComponentProps<typeof TableKpiGiro>["data"];
  DataTableRevparByWeek?: ComponentProps<typeof TableKpiRevpar>["data"];
  DataTableOccupancyRateByWeek?: ComponentProps<typeof TableKpiOccupation>["data"];
};

type GeneralUnitDataContentProps = {
  currencyConfig?: CurrencyConfig;
  data: GeneralUnitDataContentData | null | undefined;
  rangeDescription: string;
};

export default function GeneralUnitDataContent({
  currencyConfig,
  data,
  rangeDescription,
}: GeneralUnitDataContentProps) {
  return (
    <>
      <BigNumbers
        data={data?.BigNumbers ?? null}
        description={rangeDescription}
        currencyConfig={currencyConfig}
      />
      <DeferredChartMount
        eager
        minHeight={420}
        name="general-unit-billing-by-rental-type"
      >
        <div className="flex w-full gap-5 h-full">
          <div className="h-full w-full flex flex-col gap-5 items-center justify-center">
            <InvoicingXLocation
              data={data?.BillingRentalType ?? null}
              currencyConfig={currencyConfig}
            />
          </div>
        </div>
      </DeferredChartMount>
      <DeferredChartMount minHeight={720} name="general-unit-category-revpar">
        <div className="gap-5 w-full grid">
          <div className="w-full min-w-0">
            <Categories
              data={data?.RevenueBySuiteCategory ?? null}
              currencyConfig={currencyConfig}
            />
          </div>
          <div className="w-full min-w-0 grid md:grid-cols-2 gap-5">
            <TRevPar
              fillHeight
              data={data?.TrevparByDate ?? null}
              currencyConfig={currencyConfig}
            />
            <RevPar
              fillHeight
              data={data?.RevparByDate ?? null}
              currencyConfig={currencyConfig}
            />
          </div>
        </div>
      </DeferredChartMount>
      <div className="flex gap-5 flex-col items-center">
        <DeferredChartMount minHeight={420} name="general-unit-revenue-by-date">
          <Invoicing
            data={data?.RevenueByDate ?? null}
            currencyConfig={currencyConfig}
          />
        </DeferredChartMount>
        <DeferredChartMount minHeight={420} name="general-unit-giro-by-date">
          <GiroByDate data={data?.GiroByDate ?? null} />
        </DeferredChartMount>
        <DeferredChartMount minHeight={420} name="general-unit-rentals-by-date">
          <Locations data={data?.RentalsByDate ?? null} />
        </DeferredChartMount>
        <DeferredChartMount minHeight={420} name="general-unit-ticket-by-date">
          <Ticket
            data={data?.TicketAverageByDate ?? null}
            currencyConfig={currencyConfig}
          />
        </DeferredChartMount>
      </div>
      <div className="flex flex-col h-full w-full gap-5">
        <DeferredChartMount minHeight={420} name="general-unit-occupancy-by-date">
          <Occupation data={data?.OccupancyRateByDate ?? null} />
        </DeferredChartMount>
        <DeferredChartMount
          minHeight={420}
          name="general-unit-occupancy-by-category"
        >
          <OccupationCasaLush data={data?.OccupancyRateBySuiteCategory ?? null} />
        </DeferredChartMount>
      </div>
      <div className="w-full h-full flex-col gap-5 md:flex-row flex items-baseline justify-between">
        <div className="w-full">
          <TableKpiCategory
            dataTable={data?.DataTableSuiteCategory}
            datatableResult={data?.TotalResult}
            currencyConfig={currencyConfig}
          />
        </div>
      </div>
      <div className="flex gap-5 flex-col w-full">
        <TableKpiGiro data={data?.DataTableGiroByWeek} />
        <TableKpiRevpar
          data={data?.DataTableRevparByWeek}
          currencyConfig={currencyConfig}
        />
        <TableKpiOccupation data={data?.DataTableOccupancyRateByWeek} />
      </div>
    </>
  );
}
