import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

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
		case 'Governance/kpis/date-range':
			return NextResponse.json(mockGovernanceUnified());
		default:
			return NextResponse.json({ message: 'Not found' }, { status: 404 });
	}
}
