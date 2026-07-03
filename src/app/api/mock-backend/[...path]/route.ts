import { NextResponse } from 'next/server';

function mocksEnabled() {
	return process.env.PLAYWRIGHT_MOCKS === 'true';
}

function hashToSixDigits(input: string) {
	let hash = 0;
	for (let index = 0; index < input.length; index += 1) {
		hash = (hash * 31 + input.charCodeAt(index)) % 900000;
	}
	return hash;
}

function mockCompanyUnified({
	startDate,
	endDate,
}: {
	startDate?: string | null;
	endDate?: string | null;
} = {}) {
	const rangeKey = `${startDate ?? ''}|${endDate ?? ''}`;
	const rangeHash = hashToSixDigits(rangeKey);
	const totalAllValue = Number((100000 + rangeHash + 0.78).toFixed(2));

	return {
		BigNumbers: [
			{
				currentDate: {
					totalAllValue,
					totalAllRentalsApartments: 420,
					totalAllTicketAverage: 123.45,
					totalAllTrevpar: 234.56,
					totalAllGiro: 3.21,
					totalAverageOccupationTime: '01:23',
				},
				previousDate: {
					totalAllValuePreviousData: 100000,
					totalAllRentalsApartmentsPreviousData: 400,
					totalAllTicketAveragePreviousData: 100,
					totalAllTrevparPreviousData: 200,
					totalAllGiroPreviousData: 2.98,
					totalAverageOccupationTimePreviousData: '01:10',
				},
			},
		],
	};
}

function mockRestaurantUnified() {
	return {
		BigNumbers: [
			{
				currentDate: {
					totalAllValue: 12345,
					totalAllSalesRevenue: 8000,
					totalAllSales: 50,
					totalAllTicketAverage: 160,
					totalAllTicketAverageByTotalRentals: 80,
					abRepresentativity: 12.34,
					salesRepresentativity: 45.67,
				},
				previousDate: {
					totalAllValuePreviousData: 10000,
					totalAllSalesRevenuePreviousData: 7000,
					totalAllSalesPreviousData: 0,
					totalAllTicketAveragePreviousData: 150,
					totalAllTicketAverageByTotalRentalsPreviousData: 75,
					abRepresentativityPreviousData: 10,
					salesRepresentativityPreviousData: 40,
				},
			},
		],
	};
}

function mockBookingsUnified() {
	return {
		BigNumbers: [
			{
				currentDate: {
					totalAllValue: 50000,
					totalAllBookings: 120,
					totalAllTicketAverage: 416.67,
					totalAllRepresentativeness: 12.34,
				},
				previousDate: {
					totalAllValuePreviousData: 45000,
					totalAllBookingsPreviousData: 110,
					totalAllTicketAveragePreviousData: 409.09,
					totalAllRepresentativenessPreviousData: 10.5,
				},
			},
		],
		BigNumbersEcommerce: [
			{
				currentDate: {
					totalAllValue: 10000,
					totalAllBookings: 40,
					totalAllTicketAverage: 250,
					totalAllRepresentativeness: 20,
				},
				previousDate: {
					totalAllValuePreviousData: 9000,
					totalAllBookingsPreviousData: 35,
					totalAllTicketAveragePreviousData: 257.14,
					totalAllRepresentativenessPreviousData: 18,
				},
			},
		],
		ReservationsByRentalType: {
			categories: ['ONE_HOUR', 'TWO_HOURS', 'FOUR_HOURS', 'TWELVE_HOURS'],
			series: [2, 15, 9, 14],
		},
		PaymentMethods: {
			categories: ['Cartão', 'Pix', 'Dinheiro'],
			series: [12000, 8000, 3000],
		},
		BillingPerChannel: {
			categories: ['WEBSITE_IMMEDIATE', 'WEBSITE_SCHEDULED', 'INTERNAL'],
			series: [15000, 7000, 3500],
		},
		BillingOfReservationsByPeriod: {
			categories: ['01/07', '02/07', '03/07'],
			series: [4000, 5200, 6100],
		},
		RepresentativenessOfReservesByPeriod: {
			categories: ['01/07', '02/07', '03/07'],
			series: [12, 15, 18],
		},
		NumberOfReservationsPerPeriod: {
			categories: ['01/07', '02/07', '03/07'],
			series: [8, 11, 14],
		},
		KpiTableByChannelType: [
			{
				bookingsTotalRentalsByChannelType: {
					TOTALALLBOOKINGS: 40,
					WEBSITE_IMMEDIATE: 14,
					WEBSITE_SCHEDULED: 8,
					GUIA_GO: 4,
					GUIA_SCHEDULED: 3,
					INTERNAL: 7,
					BOOKING: 3,
					EXPEDIA: 1,
				},
				bookingsRevenueByChannelType: {
					TOTALALLVALUE: 23500,
					WEBSITE_IMMEDIATE: 9000,
					WEBSITE_SCHEDULED: 5000,
					GUIA_GO: 2200,
					GUIA_SCHEDULED: 1600,
					INTERNAL: 3800,
					BOOKING: 1400,
					EXPEDIA: 500,
				},
				bookingsTicketAverageByChannelType: {
					TOTALALLTICKETAVERAGE: 587.5,
					WEBSITE_IMMEDIATE: 642.86,
					WEBSITE_SCHEDULED: 625,
					GUIA_GO: 550,
					GUIA_SCHEDULED: 533.33,
					INTERNAL: 542.86,
					BOOKING: 466.67,
					EXPEDIA: 500,
				},
				bookingsRepresentativenessByChannelType: {
					TOTALALLREPRESENTATIVENESS: 100,
					WEBSITE_IMMEDIATE: 35,
					WEBSITE_SCHEDULED: 20,
					GUIA_GO: 10,
					GUIA_SCHEDULED: 7.5,
					INTERNAL: 17.5,
					BOOKING: 7.5,
					EXPEDIA: 2.5,
				},
			},
		],
		BillingOfEcommerceByPeriod: {
			categories: ['01/07', '02/07', '03/07'],
			series: [1200, 1800, 2200],
		},
		ReservationsOfEcommerceByPeriod: {
			categories: ['01/07', '02/07', '03/07'],
			series: [4, 7, 9],
		},
	};
}

function mockGovernanceUnified() {
	return {
		BigNumbers: [
			{
				currentDate: {
					totalAllSuitesCleanings: 100,
					totalAllAverageDailyCleaning: 10,
					totalAllInspections: 5,
				},
				previousDate: {
					totalAllSuitesCleaningsPreviousData: 0,
					totalAllAverageDailyCleaningPreviousData: 8,
					totalAllInspectionsPreviousData: 4,
				},
			},
		],
		SupervisorsPerformance: {
			categories: ['Dentro do padrão', 'Ajustes'],
			series: [88, 12],
		},
		ShiftCleaning: {
			categories: ['Manhã', 'Noite', 'Terceirizado'],
			series: [42, 164, 127],
		},
		CleaningByDate: {
			categories: ['01/07', '02/07', '03/07', '04/07'],
			series: [52, 48, 58, 61],
		},
		EmployeeCleaningByShift: {
			categories: ['01/07', '02/07', '03/07', '04/07'],
			series: {
				Noite: [
					{ name: 'Aline Nascimento dos Santos da Silva', data: [17, 18, 16, 17] },
					{ name: 'Ivanice Souza da Silva', data: [22, 23, 22, 24] },
					{ name: 'Suporte 2', data: [14, 13, 15, 14] },
				],
				Terceirizado: [
					{ name: 'Enilda Ferreira da Silva Souza', data: [23, 24, 23, 24] },
					{ name: 'Maria Ribeiro Gomes', data: [19, 19, 18, 20] },
				],
			},
		},
		EmployeeReport: {
			Noite: [
				{
					employeeName: 'ALINE NASCIMENTO DOS SANTOS DA SILVA',
					totalSuitesCleanings: 68,
					totalDaysWorked: 4,
					averageDailyCleaning: 17,
				},
				{
					employeeName: 'IVANICE SOUZA DA SILVA',
					totalSuitesCleanings: 68,
					totalDaysWorked: 3,
					averageDailyCleaning: 22.67,
				},
				{
					employeeName: 'SUPORTE 2',
					totalSuitesCleanings: 28,
					totalDaysWorked: 2,
					averageDailyCleaning: 14,
				},
			],
			Terceirizado: [
				{
					employeeName: 'ENILDA FERREIRA DA SILVA SOUZA',
					totalSuitesCleanings: 70,
					totalDaysWorked: 3,
					averageDailyCleaning: 23.33,
				},
				{
					employeeName: 'MARIA RIBEIRO GOMES',
					totalSuitesCleanings: 57,
					totalDaysWorked: 3,
					averageDailyCleaning: 19,
				},
			],
		},
		TeamSizing: {
			Noite: {
				domingo: { averageDailyWeekCleaning: 17 },
				segunda: { averageDailyWeekCleaning: 18 },
				terca: { averageDailyWeekCleaning: 19 },
				quarta: { averageDailyWeekCleaning: 17 },
				quinta: { averageDailyWeekCleaning: 16 },
				sexta: { averageDailyWeekCleaning: 20 },
				sabado: { averageDailyWeekCleaning: 21 },
				totalAverageShiftCleaning: 18.29,
				idealShiftMaid: 2,
				realShiftMaid: 2,
				difference: 0,
			},
			Terceirizado: {
				domingo: { averageDailyWeekCleaning: 23 },
				segunda: { averageDailyWeekCleaning: 21 },
				terca: { averageDailyWeekCleaning: 22 },
				quarta: { averageDailyWeekCleaning: 24 },
				quinta: { averageDailyWeekCleaning: 23 },
				sexta: { averageDailyWeekCleaning: 20 },
				sabado: { averageDailyWeekCleaning: 25 },
				totalAverageShiftCleaning: 22.57,
				idealShiftMaid: 3,
				realShiftMaid: 2,
				difference: -1,
			},
			Totals: {
				totalAverageDailyWeekCleaning: {
					domingo: 40,
					segunda: 39,
					terca: 41,
					quarta: 41,
					quinta: 39,
					sexta: 40,
					sabado: 46,
				},
				totalAllAverageShiftCleaning: 40.86,
				totalIdealShiftMaid: 5,
				totalRealShiftMaid: 4,
				totalDifference: -1,
			},
		},
	};
}

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ path: string[] }> },
) {
	if (!mocksEnabled()) {
		return new NextResponse(null, { status: 404 });
	}

	const { path } = await params;
	const normalizedPath = path.join('/');
	const url = new URL(request.url);
	const startDate = url.searchParams.get('startDate');
	const endDate = url.searchParams.get('endDate');

	switch (normalizedPath) {
		case 'Company/kpis/date-range':
			return NextResponse.json(mockCompanyUnified({ startDate, endDate }));
		case 'Restaurant/kpis/date-range':
			return NextResponse.json(mockRestaurantUnified());
		case 'Bookings/kpis/date-range':
			return NextResponse.json(mockBookingsUnified());
		case 'Bookings/bookings/date-range':
			return NextResponse.json(mockBookingsUnified());
		case 'Governance/kpis/date-range':
			return NextResponse.json(mockGovernanceUnified());
		default:
			return NextResponse.json({ message: 'Not found' }, { status: 404 });
	}
}
