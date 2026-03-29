/** @format */

import { getReservationPageData } from "@/actions/reservations/get-reservations-page";
import {
  DEFAULT_RANGE_TAG,
  formatDateInput,
  getRangeDescription,
} from "@/lib/date-range";
import { Suspense } from "react";
import type { ReservationsBigNumbersEntry } from "@/types/big-numbers-reservations";
import CardLink from "../_components/CardLink";
import SparkChart from "../_components/charts/SparkChart";
import Header from "../_components/Header";
import BigNumbersReservationPage from "./_components/big-numbers-reservation-page";
import BigNumbersEcommerce from "./_components/big-numbers-ecommerce";
import BookingsByCompany from "./_components/page-kpis/bookings-by-company";
import DataByCompanyReservationsInTime from "./_components/page-kpis/revenue-by-company-in-time";
import RevenueByCompany from "./_components/page-kpis/revenue-by-company";

type NamedSeriesData = {
  categories: string[];
  series: Array<{ name: string; data: number[] }>;
};

type ReservationsUnifiedData = {
  BigNumbers: ReservationsBigNumbersEntry[];
  BigNumbersEcommerce: ReservationsBigNumbersEntry[];
  BillingOfReservationsByPeriod: NamedSeriesData;
  NumberOfReservationsPerPeriod: NamedSeriesData;
  RepresentativenessOfReservesByPeriod: NamedSeriesData;
  BillingOfEcommerceByPeriod: NamedSeriesData;
  ReservationsOfEcommerceByPeriod: NamedSeriesData;
  RevenueByCompany: NamedSeriesData;
  BookingsByCompany: NamedSeriesData;
};

type ReservationsPageDataResult = Awaited<
  ReturnType<typeof getReservationPageData>
>;

async function resolveReservationsData({
  period,
  startDate,
  endDate,
}: {
  period: string;
  startDate: string | null;
  endDate: string | null;
}): Promise<ReservationsPageDataResult> {
  if (startDate && endDate) {
    const customData = await getReservationPageData({
      startDate,
      endDate,
    });

    if (customData) {
      return customData;
    }

    return { ok: false, data: null, error: "Algo deu errado" };
  }

  const data = await getReservationPageData({ period });
  if (data) {
    return data;
  }

  return { ok: false, data: null, error: "Algo deu errado" };
}

function ReservationsKpiContent({
  description,
  resp,
}: {
  description: string;
  resp?: ReservationsPageDataResult;
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
      ? (resp.data as ReservationsUnifiedData)
      : null;
  const bigNumbers = isLoading
    ? undefined
    : hasError
      ? null
      : (unifiedData?.BigNumbers ?? null);
  const billingOfReservationsByPeriod = isLoading
    ? undefined
    : hasError
      ? null
      : (unifiedData?.BillingOfReservationsByPeriod ?? null);
  const numberOfReservationsPerPeriod = isLoading
    ? undefined
    : hasError
      ? null
      : (unifiedData?.NumberOfReservationsPerPeriod ?? null);
  const representativenessOfReservesByPeriod = isLoading
    ? undefined
    : hasError
      ? null
      : (unifiedData?.RepresentativenessOfReservesByPeriod ?? null);
  const billingOfEcommerceByPeriod = isLoading
    ? undefined
    : hasError
      ? null
      : (unifiedData?.BillingOfEcommerceByPeriod ?? null);
  const reservationsOfEcommerceByPeriod = isLoading
    ? undefined
    : hasError
      ? null
      : (unifiedData?.ReservationsOfEcommerceByPeriod ?? null);
  const revenueByCompany = isLoading
    ? undefined
    : hasError
      ? null
      : (unifiedData?.RevenueByCompany ?? null);
  const bookingsByCompany = isLoading
    ? undefined
    : hasError
      ? null
      : (unifiedData?.BookingsByCompany ?? null);
  const bigNumbersEcommerce = isLoading
    ? undefined
    : hasError
      ? null
      : (unifiedData?.BigNumbersEcommerce ?? null);

  return (
    <div
      data-testid={isLoading ? "reservations-kpis-loading" : undefined}
      className="w-full flex gap-5 flex-col justify-start px-3 md:px-0"
    >
      <div>
        <BigNumbersReservationPage
          data={bigNumbers}
          description={description}
          ecommerce={false}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        <RevenueByCompany
          data={revenueByCompany}
          title={"Faturamento por unidade"}
          money
          error={errorMessage}
        />
        <BookingsByCompany
          data={bookingsByCompany}
          title={"Número de Reservas por unidade"}
          error={errorMessage}
        />
      </div>
      <div className="flex flex-col gap-5">
        <DataByCompanyReservationsInTime
          data={billingOfReservationsByPeriod}
          title={"Faturamento por unidade no tempo"}
          money
          error={errorMessage}
        />
        <DataByCompanyReservationsInTime
          data={numberOfReservationsPerPeriod}
          title={"Número de reservas por unidade"}
          money={false}
          error={errorMessage}
        />
        <DataByCompanyReservationsInTime
          data={representativenessOfReservesByPeriod}
          title={"Rep. por unidade"}
          percent
          error={errorMessage}
        />
      </div>

      <div className="flex flex-col gap-5">
        <h2 className="text-4xl font-bold text-zinc-50 mt-10">
          Indicadores de E-Commerce
        </h2>
        <BigNumbersEcommerce
          data={bigNumbersEcommerce}
          description={description}
        />

        <div className="w-full flex flex-col items-center justify-between gap-5">
          <DataByCompanyReservationsInTime
            data={billingOfEcommerceByPeriod}
            title={"Faturamento por unidade - Ecommerce"}
            money
            error={errorMessage}
          />
          <DataByCompanyReservationsInTime
            data={reservationsOfEcommerceByPeriod}
            title={"Rep. por unidade - Ecommerce"}
            percent
            error={errorMessage}
          />
        </div>
      </div>
    </div>
  );
}

async function ReservationsKpiBoundary({
  dataPromise,
  description,
}: {
  dataPromise: Promise<ReservationsPageDataResult>;
  description: string;
}) {
  const resp = await dataPromise;
  return <ReservationsKpiContent description={description} resp={resp} />;
}

export default async function Reservations({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const menu = resolvedSearchParams.menu;
  const preSet = resolvedSearchParams.set || DEFAULT_RANGE_TAG;
  const startDate = resolvedSearchParams.startDate;
  const endDate = resolvedSearchParams.endDate;
  const rangeDescription = getRangeDescription(preSet as string);

  const formattedStartDate = formatDateInput(startDate as string);
  const formattedEndDate = formatDateInput(endDate as string);
  const dataPromise = resolveReservationsData({
    period: preSet as string,
    startDate: formattedStartDate,
    endDate: formattedEndDate,
  });

  return (
    <main className="flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-center bg-zinc-950 overflow-x-hidden py-10 md:px-5">
      <div className="relative md:max-w-[82vw] flex md:ml-auto w-full">
        <div className="bg-zinc-950/50 py-4 w-full md:w-[82vw] backdrop-blur-md fixed z-10 top-0 flex flex-col gap-5 md:justify-end">
          <h2 className="text-zinc-50 font-bold text-xl md:text-3xl text-center pt-1">
            Painel de<span className="text-violet-400"> {""}Reservas</span>
          </h2>
          <div className="hidden lg:block">
            <Header />
          </div>
        </div>

        <div className="w-full flex flex-col gap-5">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 px-3 md:px-0 mt-12 lg:mt-32">
            <CardLink
              href={`/reservations/lushipiranga?menu=${menu}&set=${preSet}`}
              title={"Lush Ipiranga"}
              content={<SparkChart serie={[35, 40, 55, 45, 50, 40]} />}
            ></CardLink>
            <CardLink
              href={`/reservations/lushlapa?menu=${menu}&set=${preSet}`}
              title={"Lush Lapa"}
              content={<SparkChart serie={[45, 30, 55, 35, 60, 40]} />}
            ></CardLink>
            <CardLink
              href={`/reservations/tout?menu=${menu}&set=${preSet}`}
              title={"Tout"}
              content={<SparkChart serie={[45, 40, 55, 35, 55, 30]} />}
            ></CardLink>{" "}
            <CardLink
              href={`/reservations/andardecima?menu=${menu}&set=${preSet}`}
              title={"Andar de Cima"}
              content={<SparkChart serie={[55, 30, 55, 45, 50, 60]} />}
            ></CardLink>
            <CardLink
              href={`/reservations/altana?menu=${menu}&set=${preSet}`}
              title={"Altana"}
              content={<SparkChart serie={[41, 54, 46, 59, 51, 57]} />}
            ></CardLink>
            <CardLink
              href={`/reservations/liv?menu=${menu}&set=${preSet}`}
              title={"LIV"}
              content={<SparkChart serie={[40, 55, 45, 50, 40, 55]} />}
            ></CardLink>
          </div>
          <Suspense
            fallback={<ReservationsKpiContent description={rangeDescription} />}
          >
            <ReservationsKpiBoundary
              dataPromise={dataPromise}
              description={rangeDescription}
            />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
