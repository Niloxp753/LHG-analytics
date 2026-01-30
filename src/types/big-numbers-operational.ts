/** @format */

export type OperationalBigNumbersCurrentDate = {
	totalAllSuitesCleanings: number;
	totalAllAverageDailyCleaning: number;
	totalAllInspections: number;
};

export type OperationalBigNumbersPreviousDate = {
	totalAllSuitesCleaningsPreviousData: number;
	totalAllAverageDailyCleaningPreviousData: number;
	totalAllInspectionsPreviousData: number;
};

export type OperationalBigNumbersMonthlyForecast = {
	totalAllSuitesCleaningsForecast: number;
	totalAllAverageDailyCleaningForecast: number;
	totalAllInspectionsForecast: number;
};

export type OperationalBigNumbersEntry = {
	currentDate: OperationalBigNumbersCurrentDate;
	previousDate?: OperationalBigNumbersPreviousDate;
	monthlyForecast?: OperationalBigNumbersMonthlyForecast;
};

export type OperationalBigNumbersResponse = {
	Company: string;
	BigNumbers: OperationalBigNumbersEntry[];
};
