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

function isLivLabel(value?: string | null) {
	return value?.trim().toLowerCase() === LIV_LABEL.toLowerCase();
}

function normalizeCategoryLabel(category: string) {
	return isLivLabel(category) ? LIV_LABEL : category;
}

function normalizeSeriesEntries(series: SeriesEntry[]) {
	return series.map((entry) =>
		isLivLabel(entry.name) ? { ...entry, name: LIV_LABEL } : entry,
	);
}

function normalizePieChartData(data: PieChartData): PieChartData {
	if (!Array.isArray(data.series) || data.series.length === 0) {
		return {
			...data,
			categories: data.categories.map(normalizeCategoryLabel),
		};
	}

	if (typeof data.series[0] === 'number') {
		return {
			...data,
			categories: data.categories.map(normalizeCategoryLabel),
		};
	}

	return {
		...data,
		categories: data.categories.map(normalizeCategoryLabel),
		series: normalizeSeriesEntries(data.series as SeriesEntry[]),
	};
}

function normalizeNamedSeriesData(data: NamedSeriesData): NamedSeriesData {
	return {
		...data,
		series: normalizeSeriesEntries(data.series),
	};
}

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
	return categories?.some((category) => isLivLabel(category)) ?? false;
}

function hasLivSeries(series?: SeriesEntry[]) {
	return series?.some((entry) => isLivLabel(entry.name)) ?? false;
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
		Manhã: data ? normalizeSeriesEntries(findShiftSeries(data, 'morning')) : [],
		Tarde: data ? normalizeSeriesEntries(findShiftSeries(data, 'afternoon')) : [],
		Noite: data ? normalizeSeriesEntries(findShiftSeries(data, 'night')) : [],
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
	const normalizedBase = {
		...base,
		RevenueByCompany: normalizePieChartData(base.RevenueByCompany),
		RentalsByDate: normalizeNamedSeriesData(base.RentalsByDate),
		TicketAverageByDate: normalizeNamedSeriesData(base.TicketAverageByDate),
		TrevparByDate: normalizeNamedSeriesData(base.TrevparByDate),
		RevenueByDate: normalizeNamedSeriesData(base.RevenueByDate),
		OccupancyRateByDate: normalizeNamedSeriesData(base.OccupancyRateByDate),
	};

	if (!liv || hasLivCategory(normalizedBase.RevenueByCompany.categories)) {
		return normalizedBase;
	}

	return {
		...normalizedBase,
		BigNumbers: mergeBigNumbers(normalizedBase.BigNumbers, liv.BigNumbers),
		RevenueByCompany: appendPieValue(
			normalizedBase.RevenueByCompany,
			liv.BigNumbers[0]?.currentDate.totalAllValue,
		),
		RentalsByDate: appendNamedSeries(
			normalizedBase.RentalsByDate,
			liv.RentalsByDate.series,
		),
		TicketAverageByDate: appendNamedSeries(
			normalizedBase.TicketAverageByDate,
			liv.TicketAverageByDate.series,
		),
		TrevparByDate: appendNamedSeries(
			normalizedBase.TrevparByDate,
			liv.TrevparByDate.series,
		),
		RevenueByDate: appendNamedSeries(
			normalizedBase.RevenueByDate,
			liv.RevenueByDate.series,
		),
		OccupancyRateByDate: appendNamedSeries(
			normalizedBase.OccupancyRateByDate,
			liv.OccupancyRateByDate.series,
		),
	};
}

export function mergeLivIntoRestaurantConsolidated(
	base: RestaurantConsolidatedData,
	liv: LivRestaurantKpisResponse | null,
): RestaurantConsolidatedData {
	const normalizedBase = {
		...base,
		RevenueAbByPeriod: normalizeNamedSeriesData(base.RevenueAbByPeriod),
		TicketAverageByPeriod: normalizeNamedSeriesData(base.TicketAverageByPeriod),
		RevenueAbByPeriodPercent: normalizeNamedSeriesData(
			base.RevenueAbByPeriodPercent,
		),
		RevenueByCompany: normalizePieChartData(base.RevenueByCompany),
		SalesByCompany: normalizePieChartData(base.SalesByCompany),
	};

	if (!liv || hasLivCategory(normalizedBase.RevenueByCompany.categories)) {
		return normalizedBase;
	}

	return {
		...normalizedBase,
		BigNumbers: mergeBigNumbers(normalizedBase.BigNumbers, liv.BigNumbers),
		RevenueAbByPeriod: appendNamedSeries(
			normalizedBase.RevenueAbByPeriod,
			liv.RevenueAbByPeriod.series,
		),
		TicketAverageByPeriod: appendNamedSeries(
			normalizedBase.TicketAverageByPeriod,
			liv.TicketAverageByPeriod.series,
		),
		RevenueAbByPeriodPercent: appendNamedSeries(
			normalizedBase.RevenueAbByPeriodPercent,
			liv.RevenueAbByPeriodPercent.series,
		),
		RevenueByCompany: appendPieValue(
			normalizedBase.RevenueByCompany,
			liv.BigNumbers[0]?.currentDate.totalAllSalesRevenue,
		),
		SalesByCompany: appendPieValue(
			normalizedBase.SalesByCompany,
			liv.BigNumbers[0]?.currentDate.totalAllSales,
		),
	};
}

export function mergeLivIntoReservationsConsolidated(
	base: ReservationsConsolidatedData,
	liv: LivReservationsKpisResponse | null,
): ReservationsConsolidatedData {
	const normalizedBase = {
		...base,
		BillingOfReservationsByPeriod: normalizeNamedSeriesData(
			base.BillingOfReservationsByPeriod,
		),
		NumberOfReservationsPerPeriod: normalizeNamedSeriesData(
			base.NumberOfReservationsPerPeriod,
		),
		RepresentativenessOfReservesByPeriod: normalizeNamedSeriesData(
			base.RepresentativenessOfReservesByPeriod,
		),
		BillingOfEcommerceByPeriod: normalizeNamedSeriesData(
			base.BillingOfEcommerceByPeriod,
		),
		ReservationsOfEcommerceByPeriod: normalizeNamedSeriesData(
			base.ReservationsOfEcommerceByPeriod,
		),
		RevenueByCompany: normalizePieChartData(base.RevenueByCompany),
		BookingsByCompany: normalizePieChartData(base.BookingsByCompany),
	};

	if (!liv || hasLivCategory(normalizedBase.RevenueByCompany.categories)) {
		return normalizedBase;
	}

	return {
		...normalizedBase,
		BigNumbers: mergeBigNumbers(normalizedBase.BigNumbers, liv.BigNumbers),
		BigNumbersEcommerce: mergeBigNumbers(
			normalizedBase.BigNumbersEcommerce,
			liv.BigNumbersEcommerce,
		),
		BillingOfReservationsByPeriod: appendNamedSeries(
			normalizedBase.BillingOfReservationsByPeriod,
			liv.BillingOfReservationsByPeriod.series,
		),
		NumberOfReservationsPerPeriod: appendNamedSeries(
			normalizedBase.NumberOfReservationsPerPeriod,
			liv.NumberOfReservationsPerPeriod.series,
		),
		RepresentativenessOfReservesByPeriod: appendNamedSeries(
			normalizedBase.RepresentativenessOfReservesByPeriod,
			liv.RepresentativenessOfReservesByPeriod.series,
		),
		BillingOfEcommerceByPeriod: appendNamedSeries(
			normalizedBase.BillingOfEcommerceByPeriod,
			liv.BillingOfEcommerceByPeriod.series,
		),
		ReservationsOfEcommerceByPeriod: appendNamedSeries(
			normalizedBase.ReservationsOfEcommerceByPeriod,
			liv.ReservationsOfEcommerceByPeriod.series,
		),
		RevenueByCompany: appendPieValue(
			normalizedBase.RevenueByCompany,
			liv.BigNumbers[0]?.currentDate.totalAllValue,
		),
		BookingsByCompany: appendPieValue(
			normalizedBase.BookingsByCompany,
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
		CleaningsByCompany: normalizePieChartData(
			base.CleaningsByCompany,
		) as NamedSeriesData,
		AverageCleaningByCompany: normalizePieChartData(
			base.AverageCleaningByCompany,
		) as NamedSeriesData,
		InspectionsByCompany: normalizePieChartData(
			base.InspectionsByCompany,
		) as NamedSeriesData,
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
