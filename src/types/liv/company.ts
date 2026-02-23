/** @format */

import type { CompanyBigNumbersEntry } from '@/types/big-numbers-company';
import type { CategoriesNamedSeries, CategoriesSeries } from './shared';

export type SuiteCategoryMetrics = {
	totalRentalsApartments: number;
	totalValue: number;
	totalTicketAverage: number;
	giro: number;
	revpar: number;
	trevpar: number;
	averageOccupationTime: string;
	occupancyRate: number;
};

export type SuiteCategoryEntry = Record<string, SuiteCategoryMetrics>;

export type SuiteCategoryTotals = {
	totalAllRentalsApartments: number;
	totalAllValue: number;
	totalAllTicketAverage: number;
	totalGiro: number;
	totalRevpar: number;
	totalTrevpar: number;
	totalAverageOccupationTime: string;
	totalOccupancyRate: number;
};

export type GiroByWeekDataItem = {
	giro: string;
	totalGiro: string;
};

export type GiroByWeekEntry = Record<string, Record<string, GiroByWeekDataItem>>;

export type RevparByWeekDataItem = {
	revpar: number;
	totalRevpar: number;
};

export type RevparByWeekEntry = Record<string, Record<string, RevparByWeekDataItem>>;

export type OccupancyRateByWeekDataItem = {
	occupancyRate: string;
	totalOccupancyRate: string;
};

export type OccupancyRateByWeekEntry = Record<
	string,
	Record<string, OccupancyRateByWeekDataItem>
>;

export type LivCompanyKpisResponse = {
	Company: string;
	BigNumbers: CompanyBigNumbersEntry[];
	BillingRentalType: CategoriesNamedSeries;
	RevenueBySuiteCategory: CategoriesSeries;
	TrevparByDate: CategoriesSeries;
	RevparByDate: CategoriesSeries;
	RevenueByDate: CategoriesSeries;
	GiroByDate: CategoriesSeries;
	RentalsByDate: CategoriesSeries;
	TicketAverageByDate: CategoriesSeries;
	OccupancyRateByDate: CategoriesSeries;
	OccupancyRateBySuiteCategory: CategoriesNamedSeries;
	DataTableSuiteCategory: SuiteCategoryEntry[];
	TotalResult: SuiteCategoryTotals;
	DataTableGiroByWeek: GiroByWeekEntry[];
	DataTableRevparByWeek: RevparByWeekEntry[];
	DataTableOccupancyRateByWeek: OccupancyRateByWeekEntry[];
};
