/** @format */

import { getRestaurantPageData } from "@/actions/restaurants/get-restaurant-page";
import {
  DEFAULT_RANGE_TAG,
  formatDateInput,
  getRangeDescription,
} from "@/lib/date-range";
import { Suspense } from "react";
import CardLink from "../_components/CardLink";
import Header from "../_components/Header";
import BigNumbersPage from "./_components/kpis/big-numbers-page";
import UnityxRevenue from "./_components/kpis/UnityxRevenue";
import UnityxRevenuexTimeAB from "./_components/kpis/UnityxRevenuexTimeAB";
import UnityxRevenuexTimeABPercent from "./_components/kpis/UnityxRevenuexTimeABPercent";
import UnityxSales from "./_components/kpis/UnityxSales";
import UnityxTKTxTime from "./_components/kpis/UnityxTKTxTime";
import SparkChart from "../_components/charts/SparkChart";
import type { RestaurantBigNumbersEntry } from "@/types/big-numbers-restaurant";

type NamedSeriesData = {
  categories: string[];
  series: Array<{ name: string; data: number[] }>;
};

type RestaurantUnifiedData = {
  BigNumbers: RestaurantBigNumbersEntry[];
  RevenueAbByPeriod: NamedSeriesData;
  TicketAverageByPeriod: NamedSeriesData;
  RevenueAbByPeriodPercent: NamedSeriesData;
  RevenueByCompany: NamedSeriesData;
  SalesByCompany: NamedSeriesData;
};

export default async function Restaurant({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const menu = "restaurant";
  const preSet = (await searchParams).set ?? DEFAULT_RANGE_TAG;
  const startDate = (await searchParams).startDate;
  const endDate = (await searchParams).endDate;
  const rangeDescription = getRangeDescription(preSet as string);

  const formattedStartDate = formatDateInput(startDate as string);
  const formattedEndDate = formatDateInput(endDate as string);

  async function getData() {
    if (formattedStartDate && formattedEndDate) {
      const customData = await getRestaurantPageData({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
      if (customData) {
        return customData;
      }
      return { ok: false, data: null, error: "Algo deu errado" };
    } else {
      const data = await getRestaurantPageData({ period: preSet as string });
      if (data) {
        return data;
      }
      return { ok: false, data: null, error: "Algo deu errado" };
    }
  }

  const resp = await getData();

  const hasError = !resp.ok || !resp.data;
  const errorMessage =
    hasError && resp.error
      ? resp.error
      : hasError
        ? "Não foi possível carregar os dados."
        : undefined;

  const unifiedData =
    !hasError && !Array.isArray(resp.data)
      ? (resp.data as RestaurantUnifiedData)
      : null;
  const bigNumbers = hasError ? null : (unifiedData?.BigNumbers ?? null);
  const revenueByCompanyAB = hasError
    ? null
    : (unifiedData?.RevenueAbByPeriod ?? null);
  const ticketAverageByPeriod = hasError
    ? null
    : (unifiedData?.TicketAverageByPeriod ?? null);
  const revenueAbByPeriodPercent = hasError
    ? null
    : (unifiedData?.RevenueAbByPeriodPercent ?? null);
  const revenueByCompany = hasError
    ? null
    : (unifiedData?.RevenueByCompany ?? null);
  const salesByCompany = hasError
    ? null
    : (unifiedData?.SalesByCompany ?? null);

  return (
    <main className="flex h-full w-full min-h-screen gap-2 flex-col justify-center bg-zinc-950 overflow-x-hidden md:px-5 py-10">
      <div className={`relative  md:max-w-[82vw] flex  md:ml-auto w-full `}>
        <div
          className={`bg-zinc-950/50 py-4 w-full md:w-[82vw] backdrop-blur-md fixed z-20 top-0 flex flex-col gap-5 md:justify-end `}
        >
          <h2 className="text-zinc-50 font-bold text-2xl md:text-3xl text-center pt-1">
            Painel de <span className="text-violet-400"> {""}Restaurantes</span>
          </h2>
          <div className="hidden lg:block">
            <Header />
          </div>
        </div>

        <div className="w-full flex flex-col mt-12 lg:mt-32 h-full gap-5 px-3 md:px-0">
          <div className="grid md:grid-cols-5 gap-5">
            <CardLink
              href={`/restaurant/lushipiranga?menu=${menu}&set=${preSet}`}
              title={"Lush Ipiranga"}
              content={<SparkChart serie={[35, 40, 55, 45, 50, 40]} />}
            ></CardLink>
            <CardLink
              href={`/restaurant/lushlapa?menu=${menu}&set=${preSet}`}
              title={"Lush Lapa"}
              content={<SparkChart serie={[45, 30, 55, 35, 60, 40]} />}
            ></CardLink>
            <CardLink
              href={`/restaurant/tout?menu=${menu}&set=${preSet}`}
              title={"Tout"}
              content={<SparkChart serie={[45, 40, 55, 35, 55, 30]} />}
            ></CardLink>{" "}
            <CardLink
              href={`/restaurant/andardecima?menu=${menu}&set=${preSet}`}
              title={"Andar de Cima"}
              content={<SparkChart serie={[55, 30, 55, 45, 50, 60]} />}
            ></CardLink>
            <CardLink
              href={`/restaurant/liv?menu=${menu}&set=${preSet}`}
              title={"LIV"}
              content={<SparkChart serie={[40, 55, 45, 50, 40, 55]} />}
            ></CardLink>
          </div>
          <Suspense>
            <BigNumbersPage description={rangeDescription} data={bigNumbers} />

            <div className="flex gap-5  flex-col md:flex-row mx-auto w-full h-full">
              <UnityxRevenue data={revenueByCompany} error={errorMessage} />
              <UnityxSales data={salesByCompany} error={errorMessage} />
            </div>

            <div className="flex flex-col gap-5">
              <UnityxRevenuexTimeAB
                data={revenueByCompanyAB}
                error={errorMessage}
              />
              <UnityxRevenuexTimeABPercent
                data={revenueAbByPeriodPercent}
                error={errorMessage}
              />
              <UnityxTKTxTime
                data={ticketAverageByPeriod}
                error={errorMessage}
              />
            </div>
          </Suspense>
        </div>
      </div>
    </main>
  );
}
