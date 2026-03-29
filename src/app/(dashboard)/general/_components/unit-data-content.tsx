/** @format */

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
import { type CurrencyConfig } from "@/lib/currency-format";

type GeneralUnitDataContentProps = {
  currencyConfig?: CurrencyConfig;
  data: any;
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
      <div className="flex w-full gap-5 h-full">
        <div className="h-full w-full flex flex-col gap-5 items-center justify-center">
          <InvoicingXLocation
            data={data?.BillingRentalType ?? null}
            currencyConfig={currencyConfig}
          />
        </div>
      </div>
      <div className="gap-5 h-fit w-full grid md:grid-cols-2">
        <div className="w-full">
          <Categories
            data={data?.RevenueBySuiteCategory ?? null}
            currencyConfig={currencyConfig}
          />
        </div>
        <div className="w-full flex gap-5 justify-between flex-col">
          <TRevPar
            data={data?.TrevparByDate ?? null}
            currencyConfig={currencyConfig}
          />
          <RevPar
            data={data?.RevparByDate ?? null}
            currencyConfig={currencyConfig}
          />
        </div>
      </div>
      <div className="flex gap-5 flex-col items-center">
        <Invoicing
          data={data?.RevenueByDate ?? null}
          currencyConfig={currencyConfig}
        />
        <GiroByDate data={data?.GiroByDate ?? null} />
        <Locations data={data?.RentalsByDate ?? null} />
        <Ticket
          data={data?.TicketAverageByDate ?? null}
          currencyConfig={currencyConfig}
        />
      </div>
      <div className="flex flex-col h-full w-full gap-5">
        <Occupation data={data?.OccupancyRateByDate ?? null} />
        <OccupationCasaLush data={data?.OccupancyRateBySuiteCategory ?? null} />
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
