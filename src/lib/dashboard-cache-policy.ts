import {
	DEFAULT_RANGE_TAG,
	DEFAULT_TIME_ZONE,
	getZonedDateParts,
	normalizeRangeTag,
	type DateParts,
} from './date-range';

export type DashboardCacheMode = 'live' | 'historical';
export type DashboardCacheProfile = 'dashboard' | 'dashboard_historical';

const DAY_MS = 86_400_000;

export function getDashboardCacheProfile(
	mode: DashboardCacheMode,
): DashboardCacheProfile {
	return mode === 'historical' ? 'dashboard_historical' : 'dashboard';
}

export function resolvePresetDashboardCacheMode(
	tag: string | null | undefined,
): DashboardCacheMode {
	const normalized = normalizeRangeTag(tag, DEFAULT_RANGE_TAG);
	return normalized === 'ultimo_mes_fechado' ? 'historical' : 'live';
}

function parseCalendarDate(value: string): DateParts | null {
	const trimmed = value.trim();
	const dayFirst = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(trimmed);
	const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
	const parts = dayFirst
		? {
				year: Number(dayFirst[3]),
				month: Number(dayFirst[2]),
				day: Number(dayFirst[1]),
		  }
		: iso
			? {
					year: Number(iso[1]),
				month: Number(iso[2]),
				day: Number(iso[3]),
			  }
			: null;
	if (!parts) return null;

	const date = new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
	return date.getUTCFullYear() === parts.year &&
		date.getUTCMonth() + 1 === parts.month &&
		date.getUTCDate() === parts.day
		? parts
		: null;
}

function toDayNumber(parts: DateParts) {
	return Date.UTC(parts.year, parts.month - 1, parts.day) / DAY_MS;
}

export function resolveCustomDashboardCacheMode(
	endDate: string | null | undefined,
	{
		baseDate = new Date(),
		timeZone = DEFAULT_TIME_ZONE,
	}: { baseDate?: Date; timeZone?: string } = {},
): DashboardCacheMode {
	if (!endDate) return 'live';
	const endParts = parseCalendarDate(endDate);
	if (!endParts) return 'live';

	const today = getZonedDateParts(timeZone, baseDate);
	const yesterdayDayNumber = toDayNumber(today) - 1;
	return toDayNumber(endParts) < yesterdayDayNumber ? 'historical' : 'live';
}
