/** @format */

import type { ReservationsBigNumbersEntry } from '@/types/big-numbers-reservations';
import type { CategoriesSeries } from './shared';

export type BookingsTotalByChannel = {
	TOTALALLBOOKINGS: number;
	WEBSITE_IMMEDIATE: number;
	WEBSITE_SCHEDULED: number;
	GUIA_GO: number;
	GUIA_SCHEDULED: number;
	INTERNAL: number;
	BOOKING: number;
	EXPEDIA: number;
};

export type BookingsValueByChannel = {
	TOTALALLVALUE: number;
	WEBSITE_IMMEDIATE: number;
	WEBSITE_SCHEDULED: number;
	GUIA_GO: number;
	GUIA_SCHEDULED: number;
	INTERNAL: number;
	BOOKING: number;
	EXPEDIA: number;
};

export type BookingsTicketAverageByChannel = {
	TOTALALLTICKETAVERAGE: number;
	WEBSITE_IMMEDIATE: number;
	WEBSITE_SCHEDULED: number;
	GUIA_GO: number;
	GUIA_SCHEDULED: number;
	INTERNAL: number;
	BOOKING: number;
	EXPEDIA: number;
};

export type BookingsRepresentativenessByChannel = {
	TOTALALLREPRESENTATIVENESS: number;
	WEBSITE_IMMEDIATE: number;
	WEBSITE_SCHEDULED: number;
	GUIA_GO: number;
	GUIA_SCHEDULED: number;
	INTERNAL: number;
	BOOKING: number;
	EXPEDIA: number;
};

export type KpiTableByChannelEntry = {
	bookingsTotalRentalsByChannelType: BookingsTotalByChannel;
	bookingsRevenueByChannelType: BookingsValueByChannel;
	bookingsTicketAverageByChannelType: BookingsTicketAverageByChannel;
	bookingsRepresentativenessByChannelType: BookingsRepresentativenessByChannel;
};

export type LivReservationsKpisResponse = {
	Company: string;
	BigNumbers: ReservationsBigNumbersEntry[];
	ReservationsByRentalType: CategoriesSeries;
	PaymentMethods: CategoriesSeries;
	BillingPerChannel: CategoriesSeries;
	BillingOfReservationsByPeriod: CategoriesSeries;
	RepresentativenessOfReservesByPeriod: CategoriesSeries;
	NumberOfReservationsPerPeriod: CategoriesSeries;
	KpiTableByChannelType: KpiTableByChannelEntry[];
	BigNumbersEcommerce: ReservationsBigNumbersEntry[];
	ReservationsOfEcommerceByPeriod: CategoriesSeries;
	BillingOfEcommerceByPeriod: CategoriesSeries;
};
