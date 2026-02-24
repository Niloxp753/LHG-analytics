/** @format */
"use client";
import dynamic from "next/dynamic";
import { type CurrencyConfig } from "@/lib/currency-format";
import React from "react";
const BarCharApex = dynamic(
  () => import("@/app/(dashboard)/_components/charts/BarCharApex"),
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
      <BarCharApex
        money
        currencyConfig={currencyConfig}
        error={error}
        series={
          revenueBySuiteCategory
            ? [
                {
                  name: "Faturamento",
                  data: revenueBySuiteCategory?.series,
                  type: "bar",
                },
              ]
            : undefined
        }
        dataLabelColors={["#5b21b6"]}
        colors={["#a78bfa"]}
        title="Faturamento por Categoria de Suíte"
        categories={revenueBySuiteCategory?.categories}
      />
    </>
  );
}
