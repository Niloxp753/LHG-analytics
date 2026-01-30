/** @format */

export type CompanyBigNumbersCurrentDate = {
	totalAllValue: number;
	totalAllRentalsApartments: number;
	totalAllTicketAverage: number;
	totalAllTrevpar: number;
	totalAllGiro: number;
	totalAverageOccupationTime: string;
};

export type CompanyBigNumbersPreviousDate = {
	totalAllValuePreviousData: number;
	totalAllRentalsApartmentsPreviousData: number;
	totalAllTicketAveragePreviousData: number;
	totalAllTrevparPreviousData: number;
	totalAllGiroPreviousData: number;
	totalAverageOccupationTimePreviousData: string;
};

export type CompanyBigNumbersMonthlyForecast = {
	totalAllValueForecast: number;
	totalAllRentalsApartmentsForecast: number;
	totalAllTicketAverageForecast: number;
	totalAllTrevparForecast: number;
	totalAllGiroForecast: number;
	totalAverageOccupationTimeForecast: string;
};

export type CompanyBigNumbersEntry = {
	currentDate: CompanyBigNumbersCurrentDate;
	previousDate?: CompanyBigNumbersPreviousDate;
	monthlyForecast?: CompanyBigNumbersMonthlyForecast;
};

export type CompanyBigNumbersResponse = {
	Company: string;
	BigNumbers: CompanyBigNumbersEntry[];
};
