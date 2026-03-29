/** @format */

import { getGeneralPageData } from "@/actions/initial-pages/general";
import {
  DEFAULT_RANGE_TAG,
  formatDateInput,
  getRangeDescription,
} from "@/lib/date-range";
import { Suspense } from "react";
import type { CompanyBigNumbersEntry } from "@/types/big-numbers-company";
import CardLink from "../_components/CardLink";
import Header from "../_components/Header";
import SparkChart from "../_components/charts/SparkChart";
import InvoicingXUnity from "../_components/kpis/InvoicingXUnity";
import InvoicingXUnityXTime from "../_components/kpis/InvoicingXUnityXTime";
import LocationsxUnity from "../_components/kpis/LocationsxUnity";
import OccupationXUnity from "../_components/kpis/OccupationXUnity";
import TKTxUnity from "../_components/kpis/TKTxUnity";
import TRevParXUnity from "../_components/kpis/TRevParXUnity";
import BigNumbersCompany from "./_components/big-numbers-company";

type NamedSeriesData = {
  categories: string[];
  series: Array<{ name: string; data: number[] }>;
};

type SimpleSeriesData = {
  categories: string[];
  series: number[];
};

type GeneralUnifiedData = {
  BigNumbers: CompanyBigNumbersEntry[];
  RevenueByCompany: SimpleSeriesData;
  RentalsByDate: NamedSeriesData;
  TicketAverageByDate: NamedSeriesData;
  TrevparByDate: NamedSeriesData;
  RevenueByDate: NamedSeriesData;
  OccupancyRateByDate: NamedSeriesData;
};

type GeneralPageDataResult = Awaited<ReturnType<typeof getGeneralPageData>>;

async function resolveGeneralData({
  period,
  startDate,
  endDate,
}: {
  period: string;
  startDate: string | null;
  endDate: string | null;
}): Promise<GeneralPageDataResult> {
  if (startDate && endDate) {
    const customData = await getGeneralPageData({
      startDate,
      endDate,
    });

    if (customData) {
      return customData;
    }

    return { ok: false, data: null, error: "Algo deu errado" };
  }

  const data = await getGeneralPageData({ period });
  if (data) {
    return data;
  }

  return { ok: false, data: null, error: "Algo deu errado" };
}

function GeneralKpiContent({
  rangeDescription,
  resp,
}: {
  rangeDescription: string;
  resp?: GeneralPageDataResult;
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
      ? (resp.data as GeneralUnifiedData)
      : null;
  const bigNumbers = isLoading
    ? undefined
    : hasError
      ? null
      : (unifiedData?.BigNumbers ?? null);
  const revenueByCompany = isLoading
    ? undefined
    : hasError
      ? null
      : (unifiedData?.RevenueByCompany ?? null);
  const rentalsByDate = isLoading
    ? undefined
    : hasError
      ? null
      : (unifiedData?.RentalsByDate ?? null);
  const ticketAverageByDate = isLoading
    ? undefined
    : hasError
      ? null
      : (unifiedData?.TicketAverageByDate ?? null);
  const trevparByDate = isLoading
    ? undefined
    : hasError
      ? null
      : (unifiedData?.TrevparByDate ?? null);
  const revenueByDate = isLoading
    ? undefined
    : hasError
      ? null
      : (unifiedData?.RevenueByDate ?? null);
  const occupancyRateByDate = isLoading
    ? undefined
    : hasError
      ? null
      : (unifiedData?.OccupancyRateByDate ?? null);

  return (
    <div
      data-testid={isLoading ? "general-kpis-loading" : undefined}
      className="w-full h-full flex gap-5 flex-col md:px-0"
    >
      <BigNumbersCompany data={bigNumbers} description={rangeDescription} />

      <div className="flex gap-5 flex-col md:flex-row w-full h-full">
        <div className="md:w-1/3 w-full h-full">
          <InvoicingXUnity
            error={errorMessage}
            categories={revenueByCompany?.categories}
            series={revenueByCompany?.series}
          />
        </div>
        <div className="md:w-2/3 h-full">
          <LocationsxUnity data={rentalsByDate} />
        </div>
      </div>
      <div className="flex gap-5 flex-col">
        <TKTxUnity data={ticketAverageByDate} />
        <TRevParXUnity data={trevparByDate} />
      </div>
      <div className="flex flex-col gap-5">
        <InvoicingXUnityXTime data={revenueByDate} />
        <OccupationXUnity data={occupancyRateByDate} />
      </div>
    </div>
  );
}

async function GeneralKpiBoundary({
  dataPromise,
  rangeDescription,
}: {
  dataPromise: Promise<GeneralPageDataResult>;
  rangeDescription: string;
}) {
  const resp = await dataPromise;
  return <GeneralKpiContent rangeDescription={rangeDescription} resp={resp} />;
}

export default async function General({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const menu = "general";
  const preSet = resolvedSearchParams.set ?? DEFAULT_RANGE_TAG;
  const startDate = resolvedSearchParams.startDate;
  const endDate = resolvedSearchParams.endDate;
  const rangeDescription = getRangeDescription(preSet as string);

  const formattedStartDate = formatDateInput(startDate as string);
  const formattedEndDate = formatDateInput(endDate as string);
  const dataPromise = resolveGeneralData({
    period: preSet as string,
    startDate: formattedStartDate,
    endDate: formattedEndDate,
  });

  return (
    <main className="flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-center bg-zinc-950 overflow-x-hidden py-10 md:px-5 ">
      <div className="relative md:max-w-[82vw] flex md:ml-auto w-full">
        <div className="bg-zinc-950/50 p-4 w-full md:max-w-[82vw] backdrop-blur-md fixed z-20 top-0 flex flex-col gap-5">
          <h2 className="text-zinc-50 font-bold text-2xl text-center">
            Visão <span className="text-violet-400"> Geral</span>
          </h2>
          <div className="hidden lg:block">
            <Header />
          </div>
        </div>
        <div className="flex flex-col mt-10 lg:mt-32 gap-5 w-full px-3">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            <CardLink
              href={`/general/lushipiranga?menu=${menu}&set=${preSet}`}
              title={"Lush Ipiranga"}
              content={
                <SparkChart serie={[35, 40, 55, 45, 50, 40, 55, 45, 50]} />
              }
            ></CardLink>
            <CardLink
              href={`/general/lushlapa?menu=${menu}&set=${preSet}`}
              title={"Lush Lapa"}
              content={
                <SparkChart serie={[45, 30, 55, 55, 45, 50, 35, 60, 40]} />
              }
            ></CardLink>
            <CardLink
              href={`/general/tout?menu=${menu}&set=${preSet}`}
              title={"Tout"}
              content={
                <SparkChart serie={[45, 40, 55, 45, 30, 55, 35, 55, 30]} />
              }
            ></CardLink>{" "}
            <CardLink
              href={`/general/andardecima?menu=${menu}&set=${preSet}`}
              title={"Andar de Cima"}
              content={
                <SparkChart serie={[55, 30, 55, 45, 50, 60, 55, 35, 55]} />
              }
            ></CardLink>
            <CardLink
              href={`/general/altana?menu=${menu}&set=${preSet}`}
              title={"Altana"}
              content={
                <SparkChart serie={[38, 52, 47, 58, 44, 61, 49, 56, 53]} />
              }
            ></CardLink>
            <CardLink
              href={`/general/liv?menu=${menu}&set=${preSet}`}
              title={"LIV"}
              content={
                <SparkChart serie={[40, 55, 45, 50, 40, 55, 45, 50, 40]} />
              }
            ></CardLink>
          </div>
          <Suspense fallback={<GeneralKpiContent rangeDescription={rangeDescription} />}>
            <GeneralKpiBoundary
              dataPromise={dataPromise}
              rangeDescription={rangeDescription}
            />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
