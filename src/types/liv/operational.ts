/** @format */

import type { OperationalBigNumbersEntry } from '@/types/big-numbers-operational';
import type { CategoriesSeries } from './shared';

type WeekdayKey =
	| 'domingo'
	| 'segunda'
	| 'terca'
	| 'quarta'
	| 'quinta'
	| 'sexta'
	| 'sabado';

export type WorkerCleaningEntry = {
	employeeName: string;
	totalSuitesCleanings: number;
	totalDaysWorked: number;
	averageDailyCleaning: number;
};

export type EmployeeCleaningByShift = {
	categories: string[];
	series: Record<
		string,
		ApexAxisChartSeries | ApexNonAxisChartSeries | null
	>;
};

export type EmployeeReport = Record<
	string,
	WorkerCleaningEntry[] | null | undefined
>;

export type ShiftCleaning = {
	categories: string[];
	series: Array<{ name: string; data: number[] }> | null;
};

export type WeekdayCleaningEntry = {
	averageDailyWeekCleaning: number | string;
};

export type ShiftWeekData = {
	domingo?: WeekdayCleaningEntry;
	segunda?: WeekdayCleaningEntry;
	terca?: WeekdayCleaningEntry;
	quarta?: WeekdayCleaningEntry;
	quinta?: WeekdayCleaningEntry;
	sexta?: WeekdayCleaningEntry;
	sabado?: WeekdayCleaningEntry;
	totalAverageShiftCleaning: number | string;
	idealShiftMaid: number | string;
	realShiftMaid: number | string;
	difference: number | string;
};

export type TotalsWeekData = {
	totalAverageDailyWeekCleaning: Record<WeekdayKey, number | string>;
	totalAllAverageShiftCleaning: number | string;
	totalIdealShiftMaid: number | string;
	totalRealShiftMaid: number | string;
	totalDifference: number | string;
};

export type WeeklyCleaningTable = {
	[key: string]: ShiftWeekData | TotalsWeekData;
	Totals: TotalsWeekData;
};

export type LivOperationalKpisResponse = {
	Company: string;
	BigNumbers: OperationalBigNumbersEntry[];
	SupervisorsPerformance: CategoriesSeries;
	ShiftCleaning: ShiftCleaning;
	CleaningByDate: CategoriesSeries;
	EmployeeCleaningByShift: EmployeeCleaningByShift;
	EmployeeReport: EmployeeReport;
	TeamSizing: WeeklyCleaningTable;
};
