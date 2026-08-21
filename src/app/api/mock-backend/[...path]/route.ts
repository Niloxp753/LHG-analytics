import { NextResponse } from 'next/server';

type MockBackendGlobal = typeof globalThis & {
	__lhg_mock_backend_counts__?: Record<string, number>;
};

function getMockBackendCounts() {
	const scope = globalThis as MockBackendGlobal;
	scope.__lhg_mock_backend_counts__ ??= {};
	return scope.__lhg_mock_backend_counts__;
}

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
	const isStreamingInitialRange =
		startDate === '01/02/2026' && endDate === '07/02/2026';
	const isStreamingDelayedRange =
		startDate === '01/03/2026' && endDate === '07/03/2026';
	const totalAllValue = isStreamingInitialRange
		? 123456.78
		: isStreamingDelayedRange
			? 223456.78
			: Number((100000 + rangeHash + 0.78).toFixed(2));

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

	if (normalizedPath === '__test__/fetch-counts') {
		return NextResponse.json(getMockBackendCounts());
	}

	const requestKey = `${normalizedPath}${url.search}`;
	const counts = getMockBackendCounts();
	counts[requestKey] = (counts[requestKey] ?? 0) + 1;

	const startDate = url.searchParams.get('startDate');
	const endDate = url.searchParams.get('endDate');

	if (startDate === '01/01/2097' && endDate === '07/01/2097') {
		return NextResponse.json(
			{ message: 'non-retryable fixture' },
			{ status: 400 },
		);
	}
	if (startDate === '01/01/2098' && endDate === '07/01/2098') {
		return NextResponse.json(
			{ message: 'retryable fixture' },
			{ status: 503 },
		);
	}
	if (startDate === '01/01/2099' && endDate === '07/01/2099') {
		await new Promise((resolve) => setTimeout(resolve, 5000));
	}
	if (startDate === '01/04/2026' && endDate === '07/04/2026') {
		await new Promise((resolve) => setTimeout(resolve, 12000));
	}

	switch (normalizedPath) {
		case 'Company/kpis/date-range':
			if (startDate === '01/03/2026' && endDate === '07/03/2026') {
				await new Promise((resolve) => setTimeout(resolve, 2500));
			}
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

export async function DELETE(
	_request: Request,
	{ params }: { params: Promise<{ path: string[] }> },
) {
	const { path } = await params;
	if (!mocksEnabled() || path.join('/') !== '__test__/fetch-counts') {
		return new NextResponse(null, { status: 404 });
	}

	(globalThis as MockBackendGlobal).__lhg_mock_backend_counts__ = {};
	return new NextResponse(null, { status: 204 });
}
