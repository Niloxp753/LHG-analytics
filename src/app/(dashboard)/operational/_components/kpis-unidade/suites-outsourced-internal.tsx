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
  return (
    <PieChartsApex
      labels={data?.categories}
      series={data.series}
      height={340}
      title="Limpezas por Turno"
    />
  );
}
