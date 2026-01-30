/** @format */

export type ReservationsBigNumbersCurrentDate = {
	totalAllValue: number;
	totalAllBookings: number;
	totalAllTicketAverage: number;
	totalAllRepresentativeness: number;
};

export type ReservationsBigNumbersPreviousDate = {
	totalAllValuePreviousData: number;
	totalAllBookingsPreviousData: number;
	totalAllTicketAveragePreviousData: number;
	totalAllRepresentativenessPreviousData: number;
};

export type ReservationsBigNumbersMonthlyForecast = {
	totalAllValueForecast: number;
	totalAllBookingsForecast: number;
	totalAllTicketAverageForecast: number;
	totalAllRepresentativenessForecast: number;
};

export type ReservationsBigNumbersEntry = {
	currentDate: ReservationsBigNumbersCurrentDate;
	previousDate?: ReservationsBigNumbersPreviousDate;
	monthlyForecast?: ReservationsBigNumbersMonthlyForecast;
};

export type ReservationsBigNumbersResponse = {
	Company: string;
	BigNumbers: ReservationsBigNumbersEntry[];
};
