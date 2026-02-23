/** @format */
"use client";

import dynamic from "next/dynamic";
import React from "react";

const AreaChartsApex = dynamic(
  () => import("@/app/(dashboard)/_components/charts/AreaChartsApex"),
  { ssr: false },
);

interface GiroByDateProps {
  categories: string[];
  series: number[];
}

interface GiroByDateComponentProps {
  data?: GiroByDateProps | null;
}

export default function GiroByDate({ data }: GiroByDateComponentProps) {
  const giroByDate = data;
  const error =
    giroByDate === null ? "Não foi possível carregar os dados." : undefined;

  return (
    <>
      <AreaChartsApex
        id="giro-by-date"
        error={error}
        series={
          giroByDate
            ? [
                {
                  data: giroByDate.series,
                  name: "Giro por Data",
                },
              ]
            : undefined
        }
        categories={giroByDate?.categories}
      />
    </>
  );
}
