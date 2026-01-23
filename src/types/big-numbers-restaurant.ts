/** @format */

export type RestaurantBigNumbersCurrentDate = {
	totalAllValue: number;
	totalAllSales: number;
	totalAllTicketAverage: number;
	totalAllTicketAverageByTotalRentals: number;
};

export type RestaurantBigNumbersPreviousDate = {
	totalAllValuePreviousData: number;
	totalAllSalesPreviousData: number;
	totalAllTicketAveragePreviousData: number;
	totalAllTicketAverageByTotalRentalsPreviousData: number;
};

export type RestaurantBigNumbersMonthlyForecast = {
	totalAllValueForecast: number;
	totalAllSalesForecast: number;
	totalAllTicketAverageForecast: number;
	totalAllTicketAverageByTotalRentalsForecast: number;
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
