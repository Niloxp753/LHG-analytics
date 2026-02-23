/** @format */

import type { RestaurantBigNumbersEntry } from '@/types/big-numbers-restaurant';
import type {
	CategoriesNamedSeries,
	CategoriesSeries,
	NamedSeriesItem,
} from './shared';

export type LivRestaurantSellingItem = {
	name: string;
	totalRevenue: number;
	totalSales: number;
	totalRepresentation: number;
};

export type LivRestaurantReportEntry = {
	name: string;
	revenue: number;
	revenuePercent: number | string;
	quantity: number | string;
	quantityPercent: number | string;
};

export type LivRestaurantRevenueFoodByPeriod = {
	categoriesFood: string[];
	seriesFood: NamedSeriesItem[];
};

export type LivRestaurantRevenueDrinksByPeriod = {
	categoriesDrink: string[];
	seriesDrink: NamedSeriesItem[];
};

export type LivRestaurantKpisResponse = {
	Company: string;
	BigNumbers: RestaurantBigNumbersEntry[];
	RevenueAbByPeriod: CategoriesSeries;
	RevenueAbByPeriodPercent: CategoriesSeries;
	TicketAverageByPeriod: CategoriesSeries;
	BestSellingFood: LivRestaurantSellingItem[];
	LeastSellingFood: LivRestaurantSellingItem[];
	BestSellingDrinks: LivRestaurantSellingItem[];
	LeastSellingDrinks: LivRestaurantSellingItem[];
	RevenueByGroupPeriod: CategoriesNamedSeries;
	RevenueFoodByPeriod: LivRestaurantRevenueFoodByPeriod;
	RevenueDrinksByPeriod: LivRestaurantRevenueDrinksByPeriod;
	ReportByFood: LivRestaurantReportEntry[];
	ReportByDrinks: LivRestaurantReportEntry[];
	ReportByOthers: LivRestaurantReportEntry[];
};
