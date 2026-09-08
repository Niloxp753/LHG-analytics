/** @format */
"use client";

import dynamic from "next/dynamic";
import { buildShiftCleaningPieData } from "./shift-cleaning-pie-data";

const ColumnChart = dynamic(
  () => import("@/app/(dashboard)/_components/charts/ColumnChart"),
  { ssr: false },
);

type entryData = {
  data?: unknown | null;
};

export default function SuitesOutsourcedInternal({ data }: entryData) {
  const pieData = buildShiftCleaningPieData(data);

  return (
    <ColumnChart
      comparison
      error={pieData.error}
      categories={pieData.labels}
      series={pieData.series}
      height={400}
      title="Limpezas por Turno"
    />
  );
}
