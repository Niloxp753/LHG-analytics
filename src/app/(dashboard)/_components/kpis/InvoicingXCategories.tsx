/** @format */
"use client";
import dynamic from "next/dynamic";
import { type CurrencyConfig } from "@/lib/currency-format";
import React from "react";
const ColumnChart = dynamic(
  () => import("@/app/(dashboard)/_components/charts/ColumnChart"),
  { ssr: false },
);

interface RevenueBySuiteCategoryProps {
  series: number[];
  categories: string[];
}

interface CategoriesProps {
  data?: RevenueBySuiteCategoryProps | null;
  currencyConfig?: CurrencyConfig;
}

export default function Categories({ data, currencyConfig }: CategoriesProps) {
  const revenueBySuiteCategory = data;

  const error =
    revenueBySuiteCategory === null
      ? "Não foi possível carregar os dados."
      : undefined;

  return (
    <>
      <ColumnChart
        comparison
        height={340}
        money
        currencyConfig={currencyConfig}
        error={error}
        series={revenueBySuiteCategory?.series}
        colors={["#a78bfa"]}
        title="Faturamento por Categoria de Suíte"
        categories={revenueBySuiteCategory?.categories}
      />
    </>
  );
}
