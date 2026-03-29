/** @format */

import { getRestaurantPageData } from "@/actions/restaurants/get-restaurant-page";
import {
  DEFAULT_RANGE_TAG,
  formatDateInput,
  getRangeDescription,
} from "@/lib/date-range";
import { Suspense } from "react";
import type { RestaurantBigNumbersEntry } from "@/types/big-numbers-restaurant";
import CardLink from "../_components/CardLink";
import Header from "../_components/Header";
import SparkChart from "../_components/charts/SparkChart";
import BigNumbersPage from "./_components/kpis/big-numbers-page";
import UnityxRevenue from "./_components/kpis/UnityxRevenue";
import UnityxRevenuexTimeAB from "./_components/kpis/UnityxRevenuexTimeAB";
import UnityxRevenuexTimeABPercent from "./_components/kpis/UnityxRevenuexTimeABPercent";
import UnityxSales from "./_components/kpis/UnityxSales";
import UnityxTKTxTime from "./_components/kpis/UnityxTKTxTime";

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

type RestaurantPageDataResult = Awaited<ReturnType<typeof getRestaurantPageData>>;

async function resolveRestaurantData({
  period,
  startDate,
  endDate,
}: {
  period: string;
  startDate: string | null;
  endDate: string | null;
}): Promise<RestaurantPageDataResult> {
  if (startDate && endDate) {
    const customData = await getRestaurantPageData({
      startDate,
      endDate,
    });

    if (customData) {
      return customData;
    }

    return { ok: false, data: null, error: "Algo deu errado" };
  }

  const data = await getRestaurantPageData({ period });
  if (data) {
    return data;
  }

  return { ok: false, data: null, error: "Algo deu errado" };
}

function RestaurantKpiContent({
  description,
  resp,
}: {
  description: string;
  resp?: RestaurantPageDataResult;
}) {
  const isLoading = typeof resp === "undefined";
  const hasError = !isLoading && (!resp.ok || !resp.data);
  const errorMessage =
    !isLoading && hasError
      ? resp.error
        ? resp.error
        : "Não foi possível carregar os dados."
      : undefined;

  const unifiedData =
    !isLoading && !hasError && !Array.isArray(resp.data)
      ? (resp.data as RestaurantUnifiedData)
      : null;
  const bigNumbers = isLoading
    ? undefined
    : hasError
      ? null
      : (unifiedData?.BigNumbers ?? null);
  const revenueAbByPeriod = isLoading
    ? undefined
    : hasError
      ? null
      : (unifiedData?.RevenueAbByPeriod ?? null);
  const ticketAverageByPeriod = isLoading
    ? undefined
    : hasError
      ? null
      : (unifiedData?.TicketAverageByPeriod ?? null);
  const revenueAbByPeriodPercent = isLoading
    ? undefined
    : hasError
      ? null
      : (unifiedData?.RevenueAbByPeriodPercent ?? null);
  const revenueByCompany = isLoading
    ? undefined
    : hasError
      ? null
      : (unifiedData?.RevenueByCompany ?? null);
  const salesByCompany = isLoading
    ? undefined
    : hasError
      ? null
      : (unifiedData?.SalesByCompany ?? null);

  return (
    <div
      data-testid={isLoading ? "restaurant-kpis-loading" : undefined}
      className="w-full flex flex-col h-full gap-5 px-3 md:px-0"
    >
      <BigNumbersPage description={description} data={bigNumbers} />

      <div className="flex gap-5 flex-col md:flex-row mx-auto w-full h-full">
        <UnityxRevenue data={revenueByCompany} error={errorMessage} />
        <UnityxSales data={salesByCompany} error={errorMessage} />
      </div>

      <div className="flex flex-col gap-5">
        <UnityxRevenuexTimeAB
          data={revenueAbByPeriod}
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
    </div>
  );
}

async function RestaurantKpiBoundary({
  dataPromise,
  description,
}: {
  dataPromise: Promise<RestaurantPageDataResult>;
  description: string;
}) {
  const resp = await dataPromise;
  return <RestaurantKpiContent description={description} resp={resp} />;
}

export default async function Restaurant({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const menu = "restaurant";
  const preSet = resolvedSearchParams.set ?? DEFAULT_RANGE_TAG;
  const startDate = resolvedSearchParams.startDate;
  const endDate = resolvedSearchParams.endDate;
  const rangeDescription = getRangeDescription(preSet as string);

  const formattedStartDate = formatDateInput(startDate as string);
  const formattedEndDate = formatDateInput(endDate as string);
  const dataPromise = resolveRestaurantData({
    period: preSet as string,
    startDate: formattedStartDate,
    endDate: formattedEndDate,
  });

  return (
    <main className="flex h-full w-full min-h-screen gap-2 flex-col justify-center bg-zinc-950 overflow-x-hidden md:px-5 py-10">
      <div className="relative md:max-w-[82vw] flex md:ml-auto w-full">
        <div className="bg-zinc-950/50 py-4 w-full md:w-[82vw] backdrop-blur-md fixed z-20 top-0 flex flex-col gap-5 md:justify-end">
          <h2 className="text-zinc-50 font-bold text-2xl md:text-3xl text-center pt-1">
            Painel de <span className="text-violet-400"> {""}Restaurantes</span>
          </h2>
          <div className="hidden lg:block">
            <Header />
          </div>
        </div>

        <div className="w-full flex flex-col gap-5">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-12 lg:mt-32 px-3 md:px-0">
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
              href={`/restaurant/altana?menu=${menu}&set=${preSet}`}
              title={"Altana"}
              content={<SparkChart serie={[42, 57, 46, 62, 49, 58]} />}
            ></CardLink>
            <CardLink
              href={`/restaurant/liv?menu=${menu}&set=${preSet}`}
              title={"LIV"}
              content={<SparkChart serie={[40, 55, 45, 50, 40, 55]} />}
            ></CardLink>
          </div>
          <Suspense
            fallback={<RestaurantKpiContent description={rangeDescription} />}
          >
            <RestaurantKpiBoundary
              dataPromise={dataPromise}
              description={rangeDescription}
            />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
