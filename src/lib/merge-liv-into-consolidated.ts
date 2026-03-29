import type { CompanyBigNumbersEntry } from '@/types/big-numbers-company';
import type { OperationalBigNumbersEntry } from '@/types/big-numbers-operational';
import type { ReservationsBigNumbersEntry } from '@/types/big-numbers-reservations';
import type { RestaurantBigNumbersEntry } from '@/types/big-numbers-restaurant';
import type { LivCompanyKpisResponse } from '@/types/liv/company';
import type { LivOperationalKpisResponse } from '@/types/liv/operational';
import type { LivReservationsKpisResponse } from '@/types/liv/reservations';
import type { LivRestaurantKpisResponse } from '@/types/liv/restaurant';

const LIV_LABEL = 'LIV';

type NumericLikeRecord = Record<string, number | string | undefined>;
type SeriesEntry = { name: string; data: number[] };
type PieSeries = number[] | SeriesEntry[];
type PieChartData = {
	categories: string[];
	series: PieSeries;
};
type NamedSeriesData = {
	categories: string[];
	series: SeriesEntry[];
};
type ShiftCleaningData = {
	categories: string[];
	Manhã: SeriesEntry[];
	Tarde: SeriesEntry[];
	Noite: SeriesEntry[];
};
type RawShiftCleaningData = {
	categories?: string[];
	[key: string]: string[] | SeriesEntry[] | undefined;
};

export type GeneralConsolidatedData = {
	BigNumbers: CompanyBigNumbersEntry[];
	RevenueByCompany: PieChartData;
	RentalsByDate: NamedSeriesData;
	TicketAverageByDate: NamedSeriesData;
	TrevparByDate: NamedSeriesData;
	RevenueByDate: NamedSeriesData;
	OccupancyRateByDate: NamedSeriesData;
};

export type RestaurantConsolidatedData = {
	BigNumbers: RestaurantBigNumbersEntry[];
	RevenueAbByPeriod: NamedSeriesData;
	TicketAverageByPeriod: NamedSeriesData;
	RevenueAbByPeriodPercent: NamedSeriesData;
	RevenueByCompany: PieChartData;
	SalesByCompany: PieChartData;
};

export type ReservationsConsolidatedData = {
	BigNumbers: ReservationsBigNumbersEntry[];
	BigNumbersEcommerce: ReservationsBigNumbersEntry[];
	BillingOfReservationsByPeriod: NamedSeriesData;
	NumberOfReservationsPerPeriod: NamedSeriesData;
	RepresentativenessOfReservesByPeriod: NamedSeriesData;
	BillingOfEcommerceByPeriod: NamedSeriesData;
	ReservationsOfEcommerceByPeriod: NamedSeriesData;
	RevenueByCompany: PieChartData;
	BookingsByCompany: PieChartData;
};

export type OperationalConsolidatedData = {
	BigNumbers: OperationalBigNumbersEntry[];
	CleaningsByCompany: NamedSeriesData;
	AverageCleaningByCompany: NamedSeriesData;
	InspectionsByCompany: NamedSeriesData;
	ShiftCleaning: ShiftCleaningData;
};

function hasLivCategory(categories?: string[]) {
	return categories?.some((category) => category === LIV_LABEL) ?? false;
}

function hasLivSeries(series?: SeriesEntry[]) {
	return series?.some((entry) => entry.name === LIV_LABEL) ?? false;
}

function mergeMetrics<T extends NumericLikeRecord | undefined>(base: T, extra: T): T {
	if (!base) {
		return base;
	}

	if (!extra) {
		return base;
	}

	const merged: NumericLikeRecord = { ...base };

	for (const [key, value] of Object.entries(extra)) {
		const currentValue = merged[key];
		if (typeof currentValue === 'number' && typeof value === 'number') {
			merged[key] = currentValue + value;
			continue;
		}
		if (typeof currentValue === 'undefined') {
			merged[key] = value;
		}
	}

	return merged as T;
}

function mergeBigNumbers<
	T extends {
		currentDate?: NumericLikeRecord;
		previousDate?: NumericLikeRecord;
		monthlyForecast?: NumericLikeRecord;
	},
>(base: T[], extra: T[] | null | undefined): T[] {
	if (!extra?.length) {
		return base;
	}

	return base.map((entry, index) => {
		const livEntry = extra[index];
		if (!livEntry) {
			return entry;
		}

		return {
			...entry,
			currentDate: mergeMetrics(entry.currentDate, livEntry.currentDate),
			previousDate: mergeMetrics(entry.previousDate, livEntry.previousDate),
			monthlyForecast: mergeMetrics(
				entry.monthlyForecast,
				livEntry.monthlyForecast,
			),
		};
	});
}

function appendPieValue(data: PieChartData, value: number | undefined): PieChartData {
	if (hasLivCategory(data.categories) || typeof value !== 'number') {
		return data;
	}

	if (!Array.isArray(data.series) || data.series.length === 0) {
		return {
			...data,
			categories: [...data.categories, LIV_LABEL],
			series: [value],
		};
	}

	if (typeof data.series[0] === 'number') {
		return {
			...data,
			categories: [...data.categories, LIV_LABEL],
			series: [...(data.series as number[]), value],
		};
	}

	const [firstSeries, ...restSeries] = data.series as SeriesEntry[];
	return {
		...data,
		categories: [...data.categories, LIV_LABEL],
		series: [
			{
				...firstSeries,
				data: [...firstSeries.data, value],
			},
			...restSeries,
		],
	};
}

function appendNamedSeries(
	data: NamedSeriesData,
	series: number[] | undefined,
): NamedSeriesData {
	if (!Array.isArray(series) || hasLivSeries(data.series)) {
		return data;
	}

	return {
		...data,
		series: [
			...data.series,
			{
				name: LIV_LABEL,
				data: [...series],
			},
		],
	};
}

function normalizeShiftKey(value: string) {
	const lower = value.toLowerCase();
	if (lower.startsWith('manh')) {
		return 'morning';
	}
	if (lower.startsWith('tard')) {
		return 'afternoon';
	}
	if (lower.startsWith('noit')) {
		return 'night';
	}
	return lower;
}

function isSeriesEntryArray(
	value: string[] | SeriesEntry[] | undefined,
): value is SeriesEntry[] {
	return Array.isArray(value) && (value.length === 0 || typeof value[0] === 'object');
}

function findShiftSeries(data: RawShiftCleaningData, target: string): SeriesEntry[] {
	const shiftKey = Object.keys(data).find((key) => normalizeShiftKey(key) === target);
	const shiftSeries = shiftKey ? data[shiftKey] : undefined;

	if (!isSeriesEntryArray(shiftSeries)) {
		return [];
	}

	return [...shiftSeries];
}

function normalizeShiftCleaningData(
	data: RawShiftCleaningData | null | undefined,
): ShiftCleaningData {
	return {
		categories: Array.isArray(data?.categories) ? [...data.categories] : [],
		Manhã: data ? findShiftSeries(data, 'morning') : [],
		Tarde: data ? findShiftSeries(data, 'afternoon') : [],
		Noite: data ? findShiftSeries(data, 'night') : [],
	};
}

function findLivShiftSeries(
	data: LivOperationalKpisResponse['ShiftCleaning'] | null | undefined,
	target: string,
) {
	return data?.series?.find((entry) => normalizeShiftKey(entry.name) === target)?.data;
}

function appendShiftSeries(
	baseSeries: SeriesEntry[],
	livSeries: number[] | undefined,
) {
	if (!Array.isArray(livSeries) || hasLivSeries(baseSeries)) {
		return baseSeries;
	}

	return [
		...baseSeries,
		{
			name: LIV_LABEL,
			data: [...livSeries],
		},
	];
}

export function mergeLivIntoGeneralConsolidated(
	base: GeneralConsolidatedData,
	liv: LivCompanyKpisResponse | null,
): GeneralConsolidatedData {
	if (!liv || hasLivCategory(base.RevenueByCompany.categories)) {
		return base;
	}

	return {
		...base,
		BigNumbers: mergeBigNumbers(base.BigNumbers, liv.BigNumbers),
		RevenueByCompany: appendPieValue(
			base.RevenueByCompany,
			liv.BigNumbers[0]?.currentDate.totalAllValue,
		),
		RentalsByDate: appendNamedSeries(base.RentalsByDate, liv.RentalsByDate.series),
		TicketAverageByDate: appendNamedSeries(
			base.TicketAverageByDate,
			liv.TicketAverageByDate.series,
		),
		TrevparByDate: appendNamedSeries(base.TrevparByDate, liv.TrevparByDate.series),
		RevenueByDate: appendNamedSeries(base.RevenueByDate, liv.RevenueByDate.series),
		OccupancyRateByDate: appendNamedSeries(
			base.OccupancyRateByDate,
			liv.OccupancyRateByDate.series,
		),
	};
}

export function mergeLivIntoRestaurantConsolidated(
	base: RestaurantConsolidatedData,
	liv: LivRestaurantKpisResponse | null,
): RestaurantConsolidatedData {
	if (!liv || hasLivCategory(base.RevenueByCompany.categories)) {
		return base;
	}

	return {
		...base,
		BigNumbers: mergeBigNumbers(base.BigNumbers, liv.BigNumbers),
		RevenueAbByPeriod: appendNamedSeries(
			base.RevenueAbByPeriod,
			liv.RevenueAbByPeriod.series,
		),
		TicketAverageByPeriod: appendNamedSeries(
			base.TicketAverageByPeriod,
			liv.TicketAverageByPeriod.series,
		),
		RevenueAbByPeriodPercent: appendNamedSeries(
			base.RevenueAbByPeriodPercent,
			liv.RevenueAbByPeriodPercent.series,
		),
		RevenueByCompany: appendPieValue(
			base.RevenueByCompany,
			liv.BigNumbers[0]?.currentDate.totalAllSalesRevenue,
		),
		SalesByCompany: appendPieValue(
			base.SalesByCompany,
			liv.BigNumbers[0]?.currentDate.totalAllSales,
		),
	};
}

export function mergeLivIntoReservationsConsolidated(
	base: ReservationsConsolidatedData,
	liv: LivReservationsKpisResponse | null,
): ReservationsConsolidatedData {
	if (!liv || hasLivCategory(base.RevenueByCompany.categories)) {
		return base;
	}

	return {
		...base,
		BigNumbers: mergeBigNumbers(base.BigNumbers, liv.BigNumbers),
		BigNumbersEcommerce: mergeBigNumbers(
			base.BigNumbersEcommerce,
			liv.BigNumbersEcommerce,
		),
		BillingOfReservationsByPeriod: appendNamedSeries(
			base.BillingOfReservationsByPeriod,
			liv.BillingOfReservationsByPeriod.series,
		),
		NumberOfReservationsPerPeriod: appendNamedSeries(
			base.NumberOfReservationsPerPeriod,
			liv.NumberOfReservationsPerPeriod.series,
		),
		RepresentativenessOfReservesByPeriod: appendNamedSeries(
			base.RepresentativenessOfReservesByPeriod,
			liv.RepresentativenessOfReservesByPeriod.series,
		),
		BillingOfEcommerceByPeriod: appendNamedSeries(
			base.BillingOfEcommerceByPeriod,
			liv.BillingOfEcommerceByPeriod.series,
		),
		ReservationsOfEcommerceByPeriod: appendNamedSeries(
			base.ReservationsOfEcommerceByPeriod,
			liv.ReservationsOfEcommerceByPeriod.series,
		),
		RevenueByCompany: appendPieValue(
			base.RevenueByCompany,
			liv.BigNumbers[0]?.currentDate.totalAllValue,
		),
		BookingsByCompany: appendPieValue(
			base.BookingsByCompany,
			liv.BigNumbers[0]?.currentDate.totalAllBookings,
		),
	};
}

export function mergeLivIntoOperationalConsolidated(
	base: OperationalConsolidatedData,
	liv: LivOperationalKpisResponse | null,
): OperationalConsolidatedData {
	const normalizedBase = {
		...base,
		ShiftCleaning: normalizeShiftCleaningData(base.ShiftCleaning),
	};

	if (!liv || hasLivCategory(normalizedBase.CleaningsByCompany.categories)) {
		return normalizedBase;
	}

	return {
		...normalizedBase,
		BigNumbers: mergeBigNumbers(normalizedBase.BigNumbers, liv.BigNumbers),
		CleaningsByCompany: appendPieValue(
			normalizedBase.CleaningsByCompany,
			liv.BigNumbers[0]?.currentDate.totalAllSuitesCleanings,
		) as NamedSeriesData,
		AverageCleaningByCompany: appendPieValue(
			normalizedBase.AverageCleaningByCompany,
			liv.BigNumbers[0]?.currentDate.totalAllAverageDailyCleaning,
		) as NamedSeriesData,
		InspectionsByCompany: appendPieValue(
			normalizedBase.InspectionsByCompany,
			liv.BigNumbers[0]?.currentDate.totalAllInspections,
		) as NamedSeriesData,
		ShiftCleaning: {
			categories: [...normalizedBase.ShiftCleaning.categories],
			Manhã: appendShiftSeries(
				normalizedBase.ShiftCleaning.Manhã,
				findLivShiftSeries(liv.ShiftCleaning, 'morning'),
			),
			Tarde: appendShiftSeries(
				normalizedBase.ShiftCleaning.Tarde,
				findLivShiftSeries(liv.ShiftCleaning, 'afternoon'),
			),
			Noite: appendShiftSeries(
				normalizedBase.ShiftCleaning.Noite,
				findLivShiftSeries(liv.ShiftCleaning, 'night'),
			),
		},
	};
}
