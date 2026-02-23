/** @format */
"use client";

import dynamic from "next/dynamic";

const PieChartsApex = dynamic(
  () => import("@/app/(dashboard)/_components/charts/PieChartsApex"),
  { ssr: false },
);

type serie = {
  name: string;
  data: number[];
};
interface SuitesOutsourcedInternalProps {
  series: serie[] | null;
  categories: string[];
}

type entryData = {
  data: SuitesOutsourcedInternalProps;
};

export default function SuitesOutsourcedInternal({ data }: entryData) {
  const series = data.series;
  const normalizedSeries =
    Array.isArray(series) && series.length > 0
      ? series.map((item) => {
          const rawData =
            item && typeof item === "object" && "data" in item
              ? (item as { data?: unknown }).data
              : undefined;
          if (!Array.isArray(rawData)) {
            return [];
          }

          return rawData.map((value) => {
            const num = typeof value === "number" ? value : Number(value);
            return Number.isFinite(num) ? num : 0;
          });
        })
      : [];

  const pointCount =
    data.categories.length > 0
      ? data.categories.length
      : Math.max(...normalizedSeries.map((item) => item.length), 0);

  const pieSeries =
    series === null || normalizedSeries.length === 0
      ? null
      : normalizedSeries.length === 1
        ? normalizedSeries[0]
        : Array.from({ length: pointCount }, (_, index) =>
            normalizedSeries.reduce((sum, item) => sum + (item[index] ?? 0), 0),
          );

  return (
    <PieChartsApex
      labels={data?.categories}
      series={pieSeries}
      height={340}
      title="Limpezas por Turno"
    />
  );
}
