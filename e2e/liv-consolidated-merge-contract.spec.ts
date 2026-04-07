import { expect, test } from '@playwright/test';
import {
	mergeLivIntoGeneralConsolidated,
	mergeLivIntoOperationalConsolidated,
	mergeLivIntoReservationsConsolidated,
	mergeLivIntoRestaurantConsolidated,
} from '../src/lib/merge-liv-into-consolidated';

test.describe('LIV consolidated merge contract', () => {
	test('normalizes an existing mixed-case Liv label without duplicating general charts', async () => {
		const merged = mergeLivIntoGeneralConsolidated(
			{
				BigNumbers: [],
				RevenueByCompany: {
					categories: ['Lush Ipiranga', 'Liv', 'Altana'],
					series: [300, 200, 100],
				},
				RentalsByDate: {
					categories: ['22/03', '23/03'],
					series: [
						{ name: 'Lush Ipiranga', data: [80, 58] },
						{ name: 'Liv', data: [57, 47] },
					],
				},
				TicketAverageByDate: {
					categories: ['22/03', '23/03'],
					series: [{ name: 'Liv', data: [200, 210] }],
				},
				TrevparByDate: {
					categories: ['22/03', '23/03'],
					series: [{ name: 'Liv', data: [10, 11] }],
				},
				RevenueByDate: {
					categories: ['22/03', '23/03'],
					series: [{ name: 'Liv', data: [1000, 1100] }],
				},
				OccupancyRateByDate: {
					categories: ['22/03', '23/03'],
					series: [{ name: 'Liv', data: [80, 81] }],
				},
			},
			{
				Company: 'LIV',
				BigNumbers: [{ currentDate: { totalAllValue: 90 } }],
				RentalsByDate: { categories: ['22/03', '23/03'], series: [95, 75] },
				TicketAverageByDate: {
					categories: ['22/03', '23/03'],
					series: [220, 230],
				},
				TrevparByDate: { categories: ['22/03', '23/03'], series: [12, 14] },
				RevenueByDate: {
					categories: ['22/03', '23/03'],
					series: [1200, 1300],
				},
				OccupancyRateByDate: {
					categories: ['22/03', '23/03'],
					series: [82, 83],
				},
			} as never,
		);

		expect(merged.RevenueByCompany.categories).toEqual([
			'Lush Ipiranga',
			'LIV',
			'Altana',
		]);
		expect(merged.RevenueByCompany.series).toEqual([300, 200, 100]);
		expect(merged.RentalsByDate.series).toEqual([
			{ name: 'Lush Ipiranga', data: [80, 58] },
			{ name: 'LIV', data: [57, 47] },
		]);
		expect(merged.TicketAverageByDate.series).toEqual([
			{ name: 'LIV', data: [200, 210] },
		]);
	});

	test('adds LIV to general unit charts', async () => {
		const merged = mergeLivIntoGeneralConsolidated(
			{
				BigNumbers: [],
				RevenueByCompany: {
					categories: ['Lush Ipiranga', 'Tout', 'Andar de Cima', 'Altana'],
					series: [300, 200, 150, 100],
				},
				RentalsByDate: {
					categories: ['22/03', '23/03'],
					series: [
						{ name: 'Lush Ipiranga', data: [80, 58] },
						{ name: 'Tout', data: [57, 47] },
						{ name: 'Andar de Cima', data: [55, 30] },
						{ name: 'Altana', data: [57, 47] },
					],
				},
				TicketAverageByDate: {
					categories: ['22/03', '23/03'],
					series: [{ name: 'Lush Ipiranga', data: [200, 210] }],
				},
				TrevparByDate: {
					categories: ['22/03', '23/03'],
					series: [{ name: 'Lush Ipiranga', data: [10, 11] }],
				},
				RevenueByDate: {
					categories: ['22/03', '23/03'],
					series: [{ name: 'Lush Ipiranga', data: [1000, 1100] }],
				},
				OccupancyRateByDate: {
					categories: ['22/03', '23/03'],
					series: [{ name: 'Lush Ipiranga', data: [80, 81] }],
				},
			},
			{
				Company: 'LIV',
				BigNumbers: [{ currentDate: { totalAllValue: 90 } }],
				RentalsByDate: { categories: ['22/03', '23/03'], series: [95, 75] },
				TicketAverageByDate: {
					categories: ['22/03', '23/03'],
					series: [220, 230],
				},
				TrevparByDate: { categories: ['22/03', '23/03'], series: [12, 14] },
				RevenueByDate: {
					categories: ['22/03', '23/03'],
					series: [1200, 1300],
				},
				OccupancyRateByDate: {
					categories: ['22/03', '23/03'],
					series: [82, 83],
				},
			} as never,
		);

		expect(merged.RevenueByCompany.categories).toEqual([
			'Lush Ipiranga',
			'Tout',
			'Andar de Cima',
			'Altana',
			'LIV',
		]);
		expect(merged.RevenueByCompany.series).toEqual([300, 200, 150, 100, 90]);
		expect(merged.RentalsByDate.series.at(-1)).toEqual({
			name: 'LIV',
			data: [95, 75],
		});
	});

	test('adds LIV to restaurant unit charts', async () => {
		const merged = mergeLivIntoRestaurantConsolidated(
			{
				BigNumbers: [],
				RevenueAbByPeriod: {
					categories: ['22/03', '23/03'],
					series: [{ name: 'Lush Ipiranga', data: [100, 120] }],
				},
				TicketAverageByPeriod: {
					categories: ['22/03', '23/03'],
					series: [{ name: 'Lush Ipiranga', data: [50, 55] }],
				},
				RevenueAbByPeriodPercent: {
					categories: ['22/03', '23/03'],
					series: [{ name: 'Lush Ipiranga', data: [10, 12] }],
				},
				RevenueByCompany: {
					categories: ['Lush Ipiranga', 'Tout', 'Andar de Cima', 'Altana'],
					series: [400, 300, 200, 100],
				},
				SalesByCompany: {
					categories: ['Lush Ipiranga', 'Tout', 'Andar de Cima', 'Altana'],
					series: [40, 30, 20, 10],
				},
			},
			{
				Company: 'LIV',
				BigNumbers: [
					{
						currentDate: {
							totalAllSalesRevenue: 85,
							totalAllSales: 8,
						},
					},
				],
				RevenueAbByPeriod: {
					categories: ['22/03', '23/03'],
					series: [41, 43],
				},
				TicketAverageByPeriod: {
					categories: ['22/03', '23/03'],
					series: [21, 22],
				},
				RevenueAbByPeriodPercent: {
					categories: ['22/03', '23/03'],
					series: [4, 5],
				},
			} as never,
		);

		expect(merged.RevenueByCompany.categories.at(-1)).toBe('LIV');
		expect(merged.RevenueByCompany.series).toEqual([400, 300, 200, 100, 85]);
		expect(merged.SalesByCompany.series).toEqual([40, 30, 20, 10, 8]);
		expect(merged.RevenueAbByPeriod.series.at(-1)).toEqual({
			name: 'LIV',
			data: [41, 43],
		});
	});

	test('adds LIV to reservations unit charts', async () => {
		const merged = mergeLivIntoReservationsConsolidated(
			{
				BigNumbers: [],
				BigNumbersEcommerce: [],
				BillingOfReservationsByPeriod: {
					categories: ['22/03', '23/03'],
					series: [{ name: 'Lush Ipiranga', data: [1000, 1100] }],
				},
				NumberOfReservationsPerPeriod: {
					categories: ['22/03', '23/03'],
					series: [{ name: 'Lush Ipiranga', data: [10, 11] }],
				},
				RepresentativenessOfReservesByPeriod: {
					categories: ['22/03', '23/03'],
					series: [{ name: 'Lush Ipiranga', data: [20, 21] }],
				},
				BillingOfEcommerceByPeriod: {
					categories: ['22/03', '23/03'],
					series: [{ name: 'Lush Ipiranga', data: [200, 210] }],
				},
				ReservationsOfEcommerceByPeriod: {
					categories: ['22/03', '23/03'],
					series: [{ name: 'Lush Ipiranga', data: [5, 6] }],
				},
				RevenueByCompany: {
					categories: ['Lush Ipiranga', 'Tout', 'Andar de Cima', 'Altana'],
					series: [400, 300, 200, 100],
				},
				BookingsByCompany: {
					categories: ['Lush Ipiranga', 'Tout', 'Andar de Cima', 'Altana'],
					series: [40, 30, 20, 10],
				},
			},
			{
				Company: 'LIV',
				BigNumbers: [
					{
						currentDate: {
							totalAllValue: 95,
							totalAllBookings: 9,
						},
					},
				],
				BillingOfReservationsByPeriod: {
					categories: ['22/03', '23/03'],
					series: [51, 52],
				},
				NumberOfReservationsPerPeriod: {
					categories: ['22/03', '23/03'],
					series: [7, 8],
				},
				RepresentativenessOfReservesByPeriod: {
					categories: ['22/03', '23/03'],
					series: [9, 10],
				},
				BigNumbersEcommerce: [
					{
						currentDate: {
							totalAllValue: 45,
							totalAllBookings: 4,
						},
					},
				],
				BillingOfEcommerceByPeriod: {
					categories: ['22/03', '23/03'],
					series: [25, 26],
				},
				ReservationsOfEcommerceByPeriod: {
					categories: ['22/03', '23/03'],
					series: [3, 4],
				},
			} as never,
		);

		expect(merged.RevenueByCompany.series).toEqual([400, 300, 200, 100, 95]);
		expect(merged.BookingsByCompany.series).toEqual([40, 30, 20, 10, 9]);
		expect(merged.BillingOfReservationsByPeriod.series.at(-1)).toEqual({
			name: 'LIV',
			data: [51, 52],
		});
		expect(merged.ReservationsOfEcommerceByPeriod.series.at(-1)).toEqual({
			name: 'LIV',
			data: [3, 4],
		});
	});

	test('adds LIV to operational unit charts', async () => {
		const merged = mergeLivIntoOperationalConsolidated(
			{
				BigNumbers: [],
				CleaningsByCompany: {
					categories: ['Lush Ipiranga', 'Tout', 'Andar de Cima', 'Altana'],
					series: [{ name: 'Total', data: [40, 30, 20, 10] }],
				},
				AverageCleaningByCompany: {
					categories: ['Lush Ipiranga', 'Tout', 'Andar de Cima', 'Altana'],
					series: [{ name: 'Média', data: [4, 3, 2, 1] }],
				},
				InspectionsByCompany: {
					categories: ['Lush Ipiranga', 'Tout', 'Andar de Cima', 'Altana'],
					series: [{ name: 'Vistorias', data: [14, 13, 12, 11] }],
				},
				ShiftCleaning: {
					categories: ['22/03', '23/03'],
					Manhã: [{ name: 'Lush Ipiranga', data: [10, 11] }],
					Tarde: [{ name: 'Lush Ipiranga', data: [7, 8] }],
					Noite: [{ name: 'Lush Ipiranga', data: [4, 5] }],
				},
			},
			{
				Company: 'LIV',
				BigNumbers: [
					{
						currentDate: {
							totalAllSuitesCleanings: 9,
							totalAllAverageDailyCleaning: 6,
							totalAllInspections: 3,
						},
					},
				],
				ShiftCleaning: {
					categories: ['22/03', '23/03'],
					series: [
						{ name: 'Manhã', data: [3, 4] },
						{ name: 'Tarde', data: [2, 3] },
						{ name: 'Noite', data: [1, 2] },
					],
				},
			} as never,
		);

		expect(merged.CleaningsByCompany.series[0]?.data).toEqual([40, 30, 20, 10, 9]);
		expect(merged.AverageCleaningByCompany.series[0]?.data).toEqual([4, 3, 2, 1, 6]);
		expect(merged.InspectionsByCompany.series[0]?.data).toEqual([14, 13, 12, 11, 3]);
		expect(merged.ShiftCleaning.Manhã.at(-1)).toEqual({
			name: 'LIV',
			data: [3, 4],
		});
		expect(merged.ShiftCleaning.Tarde.at(-1)).toEqual({
			name: 'LIV',
			data: [2, 3],
		});
		expect(merged.ShiftCleaning.Noite.at(-1)).toEqual({
			name: 'LIV',
			data: [1, 2],
		});
	});

	test('normalizes an existing mixed-case Liv label without duplicating operational charts', async () => {
		const merged = mergeLivIntoOperationalConsolidated(
			{
				BigNumbers: [],
				CleaningsByCompany: {
					categories: ['Lush Ipiranga', 'Liv', 'Altana'],
					series: [{ name: 'Total', data: [40, 30, 20] }],
				},
				AverageCleaningByCompany: {
					categories: ['Lush Ipiranga', 'Liv', 'Altana'],
					series: [{ name: 'MÃ©dia', data: [4, 3, 2] }],
				},
				InspectionsByCompany: {
					categories: ['Lush Ipiranga', 'Liv', 'Altana'],
					series: [{ name: 'Vistorias', data: [14, 13, 12] }],
				},
				ShiftCleaning: {
					categories: ['22/03', '23/03'],
					Manhã: [
						{ name: 'Lush Ipiranga', data: [10, 11] },
						{ name: 'Liv', data: [3, 4] },
					],
					Tarde: [{ name: 'Liv', data: [2, 3] }],
					Noite: [{ name: 'Liv', data: [1, 2] }],
				},
			},
			{
				Company: 'LIV',
				BigNumbers: [
					{
						currentDate: {
							totalAllSuitesCleanings: 9,
							totalAllAverageDailyCleaning: 6,
							totalAllInspections: 3,
						},
					},
				],
				ShiftCleaning: {
					categories: ['22/03', '23/03'],
					series: [
						{ name: 'Manhã', data: [3, 4] },
						{ name: 'Tarde', data: [2, 3] },
						{ name: 'Noite', data: [1, 2] },
					],
				},
			} as never,
		);

		expect(merged.CleaningsByCompany.categories).toEqual([
			'Lush Ipiranga',
			'LIV',
			'Altana',
		]);
		expect(merged.CleaningsByCompany.series[0]?.data).toEqual([40, 30, 20]);
		expect(merged.AverageCleaningByCompany.series[0]?.data).toEqual([4, 3, 2]);
		expect(merged.InspectionsByCompany.series[0]?.data).toEqual([14, 13, 12]);
		expect(merged.ShiftCleaning.Manhã).toEqual([
			{ name: 'Lush Ipiranga', data: [10, 11] },
			{ name: 'LIV', data: [3, 4] },
		]);
		expect(merged.ShiftCleaning.Tarde).toEqual([{ name: 'LIV', data: [2, 3] }]);
		expect(merged.ShiftCleaning.Noite).toEqual([{ name: 'LIV', data: [1, 2] }]);
	});

	test('normalizes operational shift keys for dashboard consumers', async () => {
		const merged = mergeLivIntoOperationalConsolidated(
			{
				BigNumbers: [],
				CleaningsByCompany: {
					categories: ['Lush Ipiranga'],
					series: [{ name: 'Total', data: [40] }],
				},
				AverageCleaningByCompany: {
					categories: ['Lush Ipiranga'],
					series: [{ name: 'Média', data: [4] }],
				},
				InspectionsByCompany: {
					categories: ['Lush Ipiranga'],
					series: [{ name: 'Vistorias', data: [14] }],
				},
				ShiftCleaning: {
					categories: ['22/03'],
					manha: [{ name: 'Lush Ipiranga', data: [10] }],
					tarde: [{ name: 'Lush Ipiranga', data: [7] }],
					noite: [{ name: 'Lush Ipiranga', data: [4] }],
				},
			} as never,
			null,
		);

		expect(merged.ShiftCleaning.Manhã).toEqual([
			{ name: 'Lush Ipiranga', data: [10] },
		]);
		expect(merged.ShiftCleaning.Tarde).toEqual([
			{ name: 'Lush Ipiranga', data: [7] },
		]);
		expect(merged.ShiftCleaning.Noite).toEqual([
			{ name: 'Lush Ipiranga', data: [4] },
		]);
	});
});
