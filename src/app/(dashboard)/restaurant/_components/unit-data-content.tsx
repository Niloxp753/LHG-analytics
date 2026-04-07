/** @format */

import { type CurrencyConfig } from "@/lib/currency-format";
import type { RestaurantBigNumbersEntry } from "@/types/big-numbers-restaurant";
import BigNumbers from "./kpi-unidade/big-numbers";
import { AReports } from "./kpis/AReports";
import { BReports } from "./kpis/BReports";
import CategoryA from "./kpis/CategoryA";
import CategoryB from "./kpis/CategoryB";
import { CReports } from "./kpis/CReports";
import { BestSellingDrinks } from "./kpis/BestSellingDrinks";
import { LeastSellingDrinks } from "./kpis/LeastSellingDrinks";
import { MinusSell } from "./kpis/MinusSell";
import { MostSell } from "./kpis/MostSell";
import RevenueABXCost from "./kpis/revenueABXCost";
import RevenuePercent from "./kpis/RevenuePercent";
import RevenueXGroup from "./kpis/RevenueXGroup";
import TKTXLocation from "./kpis/TKTXLocation";

type SeriesByDate = {
  categories: string[];
  series: number[];
};

type NamedSeries = {
  categories: string[];
  series: Array<{ name: string; data: number[] }>;
};

type FoodRevenueSeries = {
  categoriesFood: string[];
  seriesFood: Array<{ name: string; data: number[] }>;
};

type DrinkRevenueSeries = {
  categoriesDrink: string[];
  seriesDrink: Array<{ name: string; data: number[] }>;
};

type ReportEntry = {
  name: string;
  revenue: number;
  revenuePercent: number | string;
  quantity: number | string;
  quantityPercent: number | string;
};

type SellingItem = {
  name: string;
  totalRevenue: number;
  totalSales: number;
  totalRepresentation: number;
};

type RestaurantUnitPayload = {
  BigNumbers?: RestaurantBigNumbersEntry[];
  RevenueAbByPeriod?: SeriesByDate;
  RevenueAbByPeriodPercent?: SeriesByDate;
  TicketAverageByPeriod?: SeriesByDate;
  BestSellingFood?: SellingItem[];
  LeastSellingFood?: SellingItem[];
  BestSellingDrinks?: SellingItem[];
  LeastSellingDrinks?: SellingItem[];
  RevenueByGroupPeriod?: NamedSeries;
  RevenueFoodByPeriod?: FoodRevenueSeries;
  RevenueDrinksByPeriod?: DrinkRevenueSeries;
  ReportByFood?: ReportEntry[];
  ReportByDrinks?: ReportEntry[];
  ReportByOthers?: ReportEntry[];
};

type RestaurantUnitDataContentProps = {
  currencyConfig?: CurrencyConfig;
  data: RestaurantUnitPayload;
  description: string;
};

const EMPTY_SERIES_BY_DATE: SeriesByDate = {
  categories: [],
  series: [],
};

const EMPTY_NAMED_SERIES: NamedSeries = {
  categories: [],
  series: [],
};

const EMPTY_FOOD_REVENUE_SERIES: FoodRevenueSeries = {
  categoriesFood: [],
  seriesFood: [],
};

const EMPTY_DRINK_REVENUE_SERIES: DrinkRevenueSeries = {
  categoriesDrink: [],
  seriesDrink: [],
};

const EMPTY_REPORTS: ReportEntry[] = [];
const EMPTY_SELLING_ITEMS: SellingItem[] = [];

export default function RestaurantUnitDataContent({
  currencyConfig,
  data,
  description,
}: RestaurantUnitDataContentProps) {
  const revenueAbByPeriod = data.RevenueAbByPeriod ?? EMPTY_SERIES_BY_DATE;
  const revenueAbByPeriodPercent =
    data.RevenueAbByPeriodPercent ?? EMPTY_SERIES_BY_DATE;
  const ticketAverageByPeriod =
    data.TicketAverageByPeriod ?? EMPTY_SERIES_BY_DATE;
  const bestSellingFood = data.BestSellingFood ?? EMPTY_SELLING_ITEMS;
  const leastSellingFood = data.LeastSellingFood ?? EMPTY_SELLING_ITEMS;
  const bestSellingDrinks = data.BestSellingDrinks ?? EMPTY_SELLING_ITEMS;
  const leastSellingDrinks = data.LeastSellingDrinks ?? EMPTY_SELLING_ITEMS;
  const revenueByGroupPeriod = data.RevenueByGroupPeriod ?? EMPTY_NAMED_SERIES;
  const revenueFoodByPeriod =
    data.RevenueFoodByPeriod ?? EMPTY_FOOD_REVENUE_SERIES;
  const revenueDrinksByPeriod =
    data.RevenueDrinksByPeriod ?? EMPTY_DRINK_REVENUE_SERIES;
  const reportByFood = data.ReportByFood ?? EMPTY_REPORTS;
  const reportByDrinks = data.ReportByDrinks ?? EMPTY_REPORTS;
  const reportByOthers = data.ReportByOthers ?? EMPTY_REPORTS;

  return (
    <>
      <BigNumbers
        data={data.BigNumbers?.[0] ?? null}
        description={description}
        currencyConfig={currencyConfig}
      />
      <div className="flex w-full gap-5 h-full">
        <RevenueABXCost
          data={revenueAbByPeriod}
          currencyConfig={currencyConfig}
        />
      </div>

      <div className="gap-5 h-fit w-full flex justify-between flex-col">
        <RevenuePercent data={revenueAbByPeriodPercent} />
        <TKTXLocation
          data={ticketAverageByPeriod}
          currencyConfig={currencyConfig}
        />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 h-full w-full">
        <div className="w-full md:w-1/2 h-full">
          <MostSell data={bestSellingFood} currencyConfig={currencyConfig} />
        </div>
        <div className="w-full md:w-1/2 h-full">
          <MinusSell data={leastSellingFood} currencyConfig={currencyConfig} />
        </div>
      </div>
      <div className="flex flex-col gap-5 mb-5">
        <div className="flex flex-col md:flex-row items-start justify-between gap-5 w-full">
          <div className="md:w-1/2 w-full">
            <BestSellingDrinks
              data={bestSellingDrinks}
              currencyConfig={currencyConfig}
            />
          </div>
          <div className="md:w-1/2 w-full">
            <LeastSellingDrinks
              data={leastSellingDrinks}
              currencyConfig={currencyConfig}
            />
          </div>
        </div>
        <RevenueXGroup
          data={revenueByGroupPeriod}
          currencyConfig={currencyConfig}
        />
        <CategoryA data={revenueFoodByPeriod} currencyConfig={currencyConfig} />
        <CategoryB
          data={revenueDrinksByPeriod}
          currencyConfig={currencyConfig}
        />
        <div className="flex items-start gap-5 flex-col">
          <BReports data={reportByDrinks} currencyConfig={currencyConfig} />
          <CReports data={reportByOthers} currencyConfig={currencyConfig} />
        </div>
        <AReports data={reportByFood} currencyConfig={currencyConfig} />
      </div>
    </>
  );
}
