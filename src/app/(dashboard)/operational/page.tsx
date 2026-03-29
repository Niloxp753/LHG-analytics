/** @format */

import { getOperationalPageData } from "@/actions/initial-pages/operation";
import {
  DEFAULT_RANGE_TAG,
  formatDateInput,
  getRangeDescription,
} from "@/lib/date-range";
import { Suspense } from "react";
import CardLink from "../_components/CardLink";
import Header from "../_components/Header";
import SparkChart from "../_components/charts/SparkChart";
import AfternoonCleaning from "./_components/kpis-geral/afternoon-cleaning";
import BigNumbersPageOp from "./_components/kpis-geral/big-numbers";
import CleaningAverageUnity from "./_components/kpis-geral/cleaning-average-unity";
import MorningCleaning from "./_components/kpis-geral/morning-cleaning";
import NightCleaning from "./_components/kpis-geral/night-cleaning ";
import PerformanceUnity from "./_components/kpis-geral/Performance-unity";
import TotalCleaningUnity from "./_components/kpis-geral/total-cleaning-unity";
import type { ShiftCleaning } from "./types";

type OperationalPageDataResult = Awaited<
  ReturnType<typeof getOperationalPageData>
>;

async function resolveOperationalData({
  period,
  startDate,
  endDate,
}: {
  period: string;
  startDate: string | null;
  endDate: string | null;
}): Promise<OperationalPageDataResult> {
  if (startDate && endDate) {
    const customData = await getOperationalPageData({
      startDate,
      endDate,
    });

    if (customData) {
      return customData;
    }

    return { ok: false, data: null, error: "Algo deu errado" };
  }

  const data = await getOperationalPageData({ period });
  if (data) {
    return data;
  }

  return { ok: false, data: null, error: "Algo deu errado" };
}

function OperationalKpiContent({
  description,
  resp,
}: {
  description: string;
  resp?: OperationalPageDataResult;
}) {
  const isLoading = typeof resp === "undefined";
  const hasError = !isLoading && (!resp.ok || !resp.data);
  const errorMessage =
    !isLoading && hasError
      ? resp.error
        ? resp.error
        : "Não foi possível carregar os dados."
      : undefined;

  const unifiedData = !isLoading && !hasError ? resp.data : null;
  const bigNumbers = isLoading
    ? undefined
    : hasError
      ? null
      : unifiedData?.BigNumbers;
  const cleaningsByCompany = isLoading
    ? undefined
    : hasError
      ? null
      : unifiedData?.CleaningsByCompany;
  const averageCleaningByCompany = isLoading
    ? undefined
    : hasError
      ? null
      : unifiedData?.AverageCleaningByCompany;
  const inspectionsByCompany = isLoading
    ? undefined
    : hasError
      ? null
      : unifiedData?.InspectionsByCompany;
  const shiftCleaning: ShiftCleaning | null | undefined = isLoading
    ? undefined
    : hasError
      ? null
      : unifiedData?.ShiftCleaning;

  return (
    <div
      data-testid={isLoading ? "operational-kpis-loading" : undefined}
      className="w-full h-full flex gap-5 flex-col px-3 md:px-0"
    >
      <div className="flex gap-5 flex-col w-full h-full">
        <BigNumbersPageOp data={bigNumbers} description={description} />
        <div className="w-full h-full flex gap-5 flex-col md:flex-row">
          <TotalCleaningUnity
            data={cleaningsByCompany}
            error={errorMessage}
          />
          <CleaningAverageUnity
            data={averageCleaningByCompany}
            error={errorMessage}
          />
          <PerformanceUnity
            data={inspectionsByCompany}
            error={errorMessage}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <MorningCleaning error={errorMessage} data={shiftCleaning} />
        <AfternoonCleaning error={errorMessage} data={shiftCleaning} />
        <NightCleaning error={errorMessage} data={shiftCleaning} />
      </div>
    </div>
  );
}

async function OperationalKpiBoundary({
  dataPromise,
  description,
}: {
  dataPromise: Promise<OperationalPageDataResult>;
  description: string;
}) {
  const resp = await dataPromise;
  return <OperationalKpiContent description={description} resp={resp} />;
}

export default async function Operational({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const menu = "operational";
  const preSet = resolvedSearchParams.set || DEFAULT_RANGE_TAG;
  const startDate = resolvedSearchParams.startDate;
  const endDate = resolvedSearchParams.endDate;
  const rangeDescription = getRangeDescription(preSet as string);

  const formattedStartDate = formatDateInput(startDate as string);
  const formattedEndDate = formatDateInput(endDate as string);
  const dataPromise = resolveOperationalData({
    period: preSet as string,
    startDate: formattedStartDate,
    endDate: formattedEndDate,
  });

  return (
    <main className="flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-center bg-zinc-950 overflow-x-hidden py-10 md:px-5 ">
      <div className="relative md:max-w-[82vw] flex md:ml-auto w-full">
        <div className="bg-zinc-950/50 py-4 w-full md:w-[82vw] backdrop-blur-md fixed z-20 top-0 flex flex-col gap-5">
          <h2 className="text-zinc-50 font-bold md:text-3xl text-center text-xl">
            Visão Geral
            <span className="text-violet-400"> {""}Operacional </span>
          </h2>
          <div className="hidden lg:block">
            <Header />
          </div>
        </div>

        <div className="w-full flex flex-col gap-5">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 px-3 md:px-0 mt-12 md:mt-32">
            <CardLink
              href={`/operational/lushipiranga?menu=${menu}&set=${preSet}`}
              title={"Lush Ipiranga"}
              content={
                <SparkChart serie={[35, 40, 55, 45, 50, 40, 55, 45, 50]} />
              }
            ></CardLink>
            <CardLink
              href={`/operational/lushlapa?menu=${menu}&set=${preSet}`}
              title={"Lush Lapa"}
              content={
                <SparkChart serie={[45, 30, 55, 55, 45, 50, 35, 60, 40]} />
              }
            ></CardLink>
            <CardLink
              href={`/operational/tout?menu=${menu}&set=${preSet}`}
              title={"Tout"}
              content={
                <SparkChart serie={[45, 40, 55, 45, 30, 55, 35, 55, 30]} />
              }
            ></CardLink>{" "}
            <CardLink
              href={`/operational/andardecima?menu=${menu}&set=${preSet}`}
              title={"Andar de Cima"}
              content={
                <SparkChart serie={[55, 30, 55, 45, 50, 60, 55, 35, 55]} />
              }
            ></CardLink>
            <CardLink
              href={`/operational/altana?menu=${menu}&set=${preSet}`}
              title={"Altana"}
              content={
                <SparkChart serie={[39, 53, 47, 58, 44, 60, 48, 55, 51]} />
              }
            ></CardLink>
            <CardLink
              href={`/operational/liv?menu=${menu}&set=${preSet}`}
              title={"LIV"}
              content={
                <SparkChart serie={[40, 55, 45, 50, 40, 55, 45, 50, 40]} />
              }
            ></CardLink>
          </div>
          <Suspense
            fallback={<OperationalKpiContent description={rangeDescription} />}
          >
            <OperationalKpiBoundary
              dataPromise={dataPromise}
              description={rangeDescription}
            />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
