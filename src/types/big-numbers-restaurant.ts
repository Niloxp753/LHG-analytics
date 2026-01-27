/** @format */

export type RestaurantBigNumbersCurrentDate = {
	totalAllValue: number;
	totalAllSalesRevenue: number;
	totalAllSales: number;
	totalAllTicketAverage: number;
	totalAllTicketAverageByTotalRentals: number;
	abRepresentativity: number;
	salesRepresentativity: number;
};

export type RestaurantBigNumbersPreviousDate = {
	totalAllValuePreviousData: number;
	totalAllSalesRevenuePreviousData: number;
	totalAllSalesPreviousData: number;
	totalAllTicketAveragePreviousData: number;
	totalAllTicketAverageByTotalRentalsPreviousData: number;
	abRepresentativityPreviousData: number;
	salesRepresentativityPreviousData: number;
};

export type RestaurantBigNumbersMonthlyForecast = {
	totalAllValueForecast: number;
	totalAllSalesRevenueForecast: number;
	totalAllSalesForecast: number;
	totalAllTicketAverageForecast: number;
	totalAllTicketAverageByTotalRentalsForecast: number;
	abRepresentativityForecast: number;
	salesRepresentativityForecast: number;
};

export type RestaurantBigNumbersEntry = {
	currentDate: RestaurantBigNumbersCurrentDate;
	previousDate?: RestaurantBigNumbersPreviousDate;
	monthlyForecast?: RestaurantBigNumbersMonthlyForecast;
};

export type RestaurantBigNumbersResponse = {
	Company: string;
	BigNumbers: RestaurantBigNumbersEntry[];
};
