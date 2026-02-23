/** @format */

export const DEFAULT_TIME_ZONE = 'America/Sao_Paulo';
export const DEFAULT_RANGE_TAG = 'ultimos_7_dias' as const;

export const DATE_RANGE_TAGS = [
	{ tag: 'ultimos_7_dias', label: 'Últimos 7 dias' },
	{ tag: 'ultimo_mes_fechado', label: 'Último mês' },
	{ tag: 'este_mes', label: 'Este mês' },
	{ tag: 'acumulado_do_ano', label: 'Acumulado do ano' },
] as const;

export type DateRangeTag = (typeof DATE_RANGE_TAGS)[number]['tag'];

export type DateParts = {
	year: number;
	month: number;
	day: number;
};

export type DateRange = {
	start: DateParts;
	end: DateParts; // data_final enviada ao backend
	startDate: string;
	endDate: string;
};

const pad2 = (value: number) => String(value).padStart(2, '0');
const DAY_FIRST_DATE_PATTERN = /^\d{2}\/\d{2}\/\d{4}$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const toUTCDate = ({ year, month, day }: DateParts) =>
	new Date(Date.UTC(year, month - 1, day));

const fromUTCDate = (date: Date): DateParts => ({
	year: date.getUTCFullYear(),
	month: date.getUTCMonth() + 1,
	day: date.getUTCDate(),
});

export function formatDateParts({ year, month, day }: DateParts): string {
	return `${pad2(day)}/${pad2(month)}/${year}`;
}

export function mapLegacyRangeTag(
	tag: string | null | undefined,
): DateRangeTag | null {
	if (!tag) {
		return null;
	}
	if (tag === 'ultimos_30_dias') {
		return 'ultimo_mes_fechado';
	}
	if (tag === 'ultimos_6_meses') {
		return 'acumulado_do_ano';
	}
	return null;
}

export function normalizeRangeTag(
	tag: string | null | undefined,
	fallback: DateRangeTag = DEFAULT_RANGE_TAG,
): DateRangeTag {
	if (!tag) {
		return fallback;
	}
	if (isNewRangeTag(tag)) {
		return tag;
	}
	const mapped = mapLegacyRangeTag(tag);
	return mapped ?? fallback;
}

export function getRangeLabel(tag: string | null | undefined): string {
	if (!tag) {
		return '';
	}
	const mapped = mapLegacyRangeTag(tag);
	if (mapped) {
		const mappedLabel = DATE_RANGE_TAGS.find((item) => item.tag === mapped);
		return mappedLabel?.label ?? '';
	}
	const match = DATE_RANGE_TAGS.find((item) => item.tag === tag);
	if (match) {
		return match.label;
	}
	return '';
}

export function getRangeDescription(tag: string | null | undefined): string {
	return tag ? 'Ano anterior ' : '';
}

export function isNewRangeTag(
	tag: string | null | undefined,
): tag is DateRangeTag {
	return !!tag && DATE_RANGE_TAGS.some((item) => item.tag === tag);
}

export function isShortRangeTag(tag: string | null | undefined): boolean {
	return tag === 'ultimos_7_dias' || tag === '7days';
}

export function getZonedDateParts(
	timeZone: string,
	date: Date = new Date(),
): DateParts {
	const formatter = new Intl.DateTimeFormat('en-US', {
		timeZone,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});
	const parts = formatter.formatToParts(date);
	const lookup = parts.reduce<Record<string, string>>((acc, part) => {
		if (part.type !== 'literal') {
			acc[part.type] = part.value;
		}
		return acc;
	}, {});

	if (!lookup.year || !lookup.month || !lookup.day) {
		throw new Error(`Não foi possível calcular data para timezone ${timeZone}`);
	}

	return {
		year: Number(lookup.year),
		month: Number(lookup.month),
		day: Number(lookup.day),
	};
}

export function getAvailableRangeTags({
	timeZone = DEFAULT_TIME_ZONE,
	baseDate = new Date(),
}: { timeZone?: string; baseDate?: Date } = {}) {
	const today = getZonedDateParts(timeZone, baseDate);
	if (today.day === 1) {
		return DATE_RANGE_TAGS.filter((item) => item.tag !== 'este_mes');
	}
	return DATE_RANGE_TAGS;
}


function normalizeDateString(
	value: string,
	timeZone: string = DEFAULT_TIME_ZONE,
): string | null {
	const trimmed = value.trim();
	if (!trimmed) {
		return null;
	}
	if (DAY_FIRST_DATE_PATTERN.test(trimmed)) {
		return trimmed;
	}
	if (ISO_DATE_PATTERN.test(trimmed)) {
		const [year, month, day] = trimmed.split('-');
		return `${day}/${month}/${year}`;
	}
	const parsed = new Date(trimmed);
	if (Number.isNaN(parsed.getTime())) {
		return null;
	}
	return formatDateParts(getZonedDateParts(timeZone, parsed));
}

export function formatDateInput(
	value: string | Date | null | undefined,
	timeZone: string = DEFAULT_TIME_ZONE,
): string | null {
	if (!value) {
		return null;
	}
	if (typeof value === 'string') {
		return normalizeDateString(value, timeZone);
	}
	if (Number.isNaN(value.getTime())) {
		return null;
	}
	return formatDateParts(getZonedDateParts(timeZone, value));
}

export function addDays(parts: DateParts, days: number): DateParts {
	const date = toUTCDate(parts);
	date.setUTCDate(date.getUTCDate() + days);
	return fromUTCDate(date);
}

export function addMonths(parts: DateParts, months: number): DateParts {
	const date = toUTCDate(parts);
	date.setUTCMonth(date.getUTCMonth() + months);
	return fromUTCDate(date);
}

export function startOfMonth(parts: DateParts): DateParts {
	return { year: parts.year, month: parts.month, day: 1 };
}

export function startOfYear(parts: DateParts): DateParts {
	return { year: parts.year, month: 1, day: 1 };
}

export function buildDateRange(
	start: DateParts,
	endExclusive: DateParts,
): DateRange {
	return {
		start,
		end: endExclusive,
		startDate: formatDateParts(start),
		endDate: formatDateParts(endExclusive),
	};
}

// Range [data_inicial, data_final), com data_final no inicio do dia atual no fuso.
export function getRangeFromToday({
	daysBack,
	timeZone = DEFAULT_TIME_ZONE,
	baseDate = new Date(),
}: {
	daysBack: number;
	timeZone?: string;
	baseDate?: Date;
}): DateRange {
	const endExclusive = getZonedDateParts(timeZone, baseDate);
	const start = addDays(endExclusive, -daysBack);
	return buildDateRange(start, endExclusive);
}

// Range [data_inicial, data_final), com data_final no inicio do dia de ontem no fuso.
export function getRangeFromYesterday({
	daysBack,
	timeZone = DEFAULT_TIME_ZONE,
	baseDate = new Date(),
}: {
	daysBack: number;
	timeZone?: string;
	baseDate?: Date;
}): DateRange {
	const today = getZonedDateParts(timeZone, baseDate);
	const endExclusive = addDays(today, -1);
	const start = addDays(endExclusive, -daysBack);
	return buildDateRange(start, endExclusive);
}

export function getRangeByTag(
	tag: string,
	{
		timeZone = DEFAULT_TIME_ZONE,
		baseDate = new Date(),
	}: { timeZone?: string; baseDate?: Date } = {},
): DateRange | null {
	const normalized =
		mapLegacyRangeTag(tag) ?? (isNewRangeTag(tag) ? tag : null);
	if (!normalized) {
		return null;
	}
	switch (normalized) {
		case 'ultimos_7_dias': {
			return getRangeFromYesterday({ daysBack: 6, timeZone, baseDate });
		}
		case 'ultimo_mes_fechado': {
			const today = getZonedDateParts(timeZone, baseDate);
			const currentMonthStart = startOfMonth(today);
			const start = startOfMonth(addMonths(currentMonthStart, -1));
			const endInclusive = addDays(currentMonthStart, -1);
			return buildDateRange(start, endInclusive);
		}
		case 'este_mes': {
			const today = getZonedDateParts(timeZone, baseDate);
			const start = startOfMonth(today);
			const endInclusive = addDays(today, -1);
			return buildDateRange(start, endInclusive);
		}
		case 'acumulado_do_ano': {
			const today = getZonedDateParts(timeZone, baseDate);
			const start = startOfYear(today);
			const endInclusive = addDays(today, -1);
			return buildDateRange(start, endInclusive);
		}
		default:
			return null;
	}
}
