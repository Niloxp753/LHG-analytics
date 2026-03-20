/** @format */

import { getLivCompanyPageData } from "@/actions/liv/get-liv-company-page";
import Header from "@/app/(dashboard)/_components/Header";
import ErrorState from "@/app/(dashboard)/_components/ErrorState";
import BigNumbers from "@/app/(dashboard)/_components/bignumber";
import Invoicing from "@/app/(dashboard)/_components/kpis/Invoicing";
import Categories from "@/app/(dashboard)/_components/kpis/InvoicingXCategories";
import InvoicingXLocation from "@/app/(dashboard)/_components/kpis/InvoicingXLocation";
import Locations from "@/app/(dashboard)/_components/kpis/Locations";
import Occupation from "@/app/(dashboard)/_components/kpis/Occupation";
import OccupationCasaLush from "@/app/(dashboard)/_components/kpis/OccupationCasaLush";
import RevPar from "@/app/(dashboard)/_components/kpis/RevPar";
import { TableKpiGiro } from "@/app/(dashboard)/_components/kpis/TableKpiGiro";
import TableKpiCategory from "@/app/(dashboard)/_components/kpis/TableKpiCategory";
import { TableKpiOccupation } from "@/app/(dashboard)/_components/kpis/TableKpiOccupation";
import { TableKpiRevpar } from "@/app/(dashboard)/_components/kpis/TableKpiRevpar";
import Ticket from "@/app/(dashboard)/_components/kpis/Ticket";
import TRevPar from "@/app/(dashboard)/_components/kpis/TRevPar";
import {
  DEFAULT_RANGE_TAG,
  formatDateInput,
  getRangeDescription,
} from "@/lib/date-range";
import GiroByDate from "@/app/(dashboard)/_components/kpis/GiroByDate";
import { LIV_USD_CURRENCY_CONFIG } from "@/lib/currency-format";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const preSet = (await searchParams).set ?? DEFAULT_RANGE_TAG;
  const startDate = (await searchParams).startDate;
  const endDate = (await searchParams).endDate;
  const rangeDescription = getRangeDescription(preSet as string);

  const formattedStartDate = formatDateInput(startDate as string);
  const formattedEndDate = formatDateInput(endDate as string);

  async function getData() {
    const result = await getLivCompanyPageData({
      period: preSet as string,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });

    return result.ok ? result.data : null;
  }

  const resp = await getData();

  if (!resp) {
    return (
      <main className="flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-center bg-zinc-950 overflow-x-hidden py-10 md:px-5">
        <div className="relative  md:max-w-[82vw]  flex md:ml-auto  w-full ">
          <div className="bg-zinc-950/50 py-4 w-full md:w-[82vw] backdrop-blur-md fixed top-0 z-40 flex flex-col gap-2 ">
            <h2 className="text-zinc-50 font-bold md:text-3xl text-center pb-1.5 pt-2.5 text-base">
              Visão Geral -{" "}
              <span className="text-violet-400 text-base md:text-3xl">LIV</span>
            </h2>
            <div className="hidden lg:block">
              <Header />
            </div>
          </div>
          <div className=" w-full h-full flex gap-5 flex-col px-3 md:px-0 mt-12 lg:mt-32">
            <ErrorState />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-center bg-zinc-950 overflow-x-hidden py-10 md:px-5">
      <div className={`relative  md:max-w-[82vw]  flex md:ml-auto  w-full `}>
        <div
          className={`bg-zinc-950/50 py-4 w-full md:w-[82vw] backdrop-blur-md fixed top-0 z-40 flex flex-col gap-2 `}
        >
          <h2 className="text-zinc-50 font-bold md:text-3xl text-center pb-1.5 pt-2.5 text-base">
            Visão Geral -{" "}
            <span className="text-violet-400 text-base md:text-3xl">LIV</span>
          </h2>
          <div className="hidden lg:block">
            <Header />
          </div>
        </div>
        <div className=" w-full h-full flex gap-5 flex-col px-3 md:px-0 mt-12 lg:mt-32">
          <BigNumbers
            data={resp?.BigNumbers}
            description={rangeDescription}
            currencyConfig={LIV_USD_CURRENCY_CONFIG}
          />
          <div className="flex w-full gap-5 h-full">
            <div className="h-full w-full flex flex-col gap-5 items-center justify-center">
              <InvoicingXLocation
                data={resp?.BillingRentalType}
                currencyConfig={LIV_USD_CURRENCY_CONFIG}
              />
            </div>
          </div>
          <div className="gap-5 h-fit w-full grid md:grid-cols-2">
            <div className=" w-full">
              <Categories
                data={resp?.RevenueBySuiteCategory}
                currencyConfig={LIV_USD_CURRENCY_CONFIG}
              />
            </div>
            <div className=" w-full  flex gap-5 justify-between flex-col ">
              <TRevPar
                data={resp?.TrevparByDate}
                currencyConfig={LIV_USD_CURRENCY_CONFIG}
              />
              <RevPar
                data={resp?.RevparByDate}
                currencyConfig={LIV_USD_CURRENCY_CONFIG}
              />
            </div>
          </div>
          <div className="flex gap-5 flex-col items-center">
            <Invoicing
              data={resp?.RevenueByDate}
              currencyConfig={LIV_USD_CURRENCY_CONFIG}
            />
            <GiroByDate data={resp?.GiroByDate} />
            <Locations data={resp?.RentalsByDate} />
            <Ticket
              data={resp?.TicketAverageByDate}
              currencyConfig={LIV_USD_CURRENCY_CONFIG}
            />
          </div>
          <div className="flex flex-col  h-full w-full gap-5">
            <Occupation data={resp?.OccupancyRateByDate} />
            <OccupationCasaLush data={resp?.OccupancyRateBySuiteCategory} />
          </div>
          <div className="w-full h-full flex-col gap-5 md:flex-row flex items-baseline justify-between">
            <div className="w-full">
              <TableKpiCategory
                dataTable={resp?.DataTableSuiteCategory}
                datatableResult={resp?.TotalResult}
                currencyConfig={LIV_USD_CURRENCY_CONFIG}
              />
            </div>
          </div>
          <div className="flex gap-5 flex-col w-full">
            <TableKpiGiro data={resp?.DataTableGiroByWeek} />
            <TableKpiRevpar
              data={resp?.DataTableRevparByWeek}
              currencyConfig={LIV_USD_CURRENCY_CONFIG}
            />
            <TableKpiOccupation data={resp?.DataTableOccupancyRateByWeek} />
          </div>
        </div>
      </div>
    </main>
  );
}
