/** @format */
"use client";

import dynamic from "next/dynamic";
import { buildShiftCleaningPieData } from "./shift-cleaning-pie-data";

const PieChartsApex = dynamic(
  () => import("@/app/(dashboard)/_components/charts/PieChartsApex"),
  { ssr: false },
);

type entryData = {
  data?: unknown | null;
};

export default function SuitesOutsourcedInternal({ data }: entryData) {
  const pieData = buildShiftCleaningPieData(data);

  return (
    <PieChartsApex
      error={pieData.error}
      labels={pieData.labels}
      series={pieData.series}
      height={340}
      title="Limpezas por Turno"
    />
  );
}
