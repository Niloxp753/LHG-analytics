/** @format */

import {
	orderOperationalShiftKeys,
	normalizeOperationalShiftKey,
} from './operational-shifts';

const SHIFT_LABELS = ['Manh\u00e3', 'Tarde', 'Noite'] as const;
const SHIFT_ERROR = 'N\u00e3o foi poss\u00edvel carregar os dados.';

type ShiftSeriesEntry = {
	name?: unknown;
	data?: unknown;
};

type DirectShiftCleaningData = {
	categories?: unknown;
	series?: unknown;
};

type LegacyShiftCleaningData = {
	series?: unknown;
};

type ShiftCleaningObject = Record<string, unknown>;

type ShiftCleaningPieData = {
	error: string | undefined;
	labels: string[];
	series: number[] | null;
};

function sumNumberArray(values: unknown): number {
	if (!Array.isArray(values)) {
		return 0;
	}

	return values.reduce((total, value) => {
		const parsed = typeof value === 'number' ? value : Number(value);
		return Number.isFinite(parsed) ? total + parsed : total;
	}, 0);
}

function sumSeriesEntries(entries: unknown): number {
	if (!Array.isArray(entries)) {
		return 0;
	}

	return entries.reduce((total, entry) => {
		if (!entry || typeof entry !== 'object') {
			return total;
		}

		return total + sumNumberArray((entry as ShiftSeriesEntry).data);
	}, 0);
}

function parseDirectSeries(values: unknown): number[] | null {
	if (!Array.isArray(values)) {
		return null;
	}

	return values.map((value) => {
		const parsed = typeof value === 'number' ? value : Number(value);
		return Number.isFinite(parsed) ? parsed : 0;
	});
}

function buildDirectShiftTotals(
	data: DirectShiftCleaningData,
): { labels: string[]; series: number[] } | null {
	if (!Array.isArray(data.categories)) {
		return null;
	}

	const labels = data.categories.filter(
		(label): label is string => typeof label === 'string' && label.length > 0,
	);
	const series = parseDirectSeries(data.series);

	if (labels.length === 0 || !series || labels.length !== series.length) {
		return null;
	}

	return { labels, series };
}

function buildNormalizedShiftTotals(
	data: ShiftCleaningObject,
): { labels: string[]; series: number[] } | null {
	const shiftKeys = orderOperationalShiftKeys(
		Object.keys(data).filter(
			(key) => key !== 'categories' && Array.isArray(data[key]),
		),
	);

	if (shiftKeys.length === 0) {
		return null;
	}

	return {
		labels: shiftKeys,
		series: shiftKeys.map((key) => sumSeriesEntries(data[key])),
	};
}

function buildLegacyShiftTotals(
	data: LegacyShiftCleaningData,
): { labels: string[]; series: number[] } | null {
	if (!Array.isArray(data.series)) {
		return null;
	}

	const labelsByShift = new Map<string, string>();
	const totals = new Map<string, number>();

	for (const entry of data.series) {
		if (!entry || typeof entry !== 'object') {
			continue;
		}

		const rawName = (entry as ShiftSeriesEntry).name;
		const shiftKey = normalizeOperationalShiftKey(rawName);
		if (!shiftKey) {
			continue;
		}

		const displayLabel =
			typeof rawName === 'string' && rawName.length > 0 ? rawName : shiftKey;

		labelsByShift.set(shiftKey, labelsByShift.get(shiftKey) ?? displayLabel);
		totals.set(
			shiftKey,
			(totals.get(shiftKey) ?? 0) +
				sumNumberArray((entry as ShiftSeriesEntry).data),
		);
	}

	if (labelsByShift.size === 0) {
		return null;
	}

	const orderedLabels = orderOperationalShiftKeys(labelsByShift.values());

	return {
		labels: orderedLabels,
		series: orderedLabels.map((label) => {
			const normalizedKey = normalizeOperationalShiftKey(label);
			return normalizedKey ? totals.get(normalizedKey) ?? 0 : 0;
		}),
	};
}

export function buildShiftCleaningPieData(
	data: unknown,
): ShiftCleaningPieData {
	if (!data || typeof data !== 'object') {
		return {
			error: SHIFT_ERROR,
			labels: [...SHIFT_LABELS],
			series: null,
		};
	}

	const objectData = data as ShiftCleaningObject;
	const resolvedData =
		buildDirectShiftTotals(objectData) ??
		buildLegacyShiftTotals(objectData) ??
		buildNormalizedShiftTotals(objectData);

	if (!resolvedData) {
		return {
			error: SHIFT_ERROR,
			labels: [...SHIFT_LABELS],
			series: null,
		};
	}

	return {
		error: undefined,
		labels: resolvedData.labels,
		series: resolvedData.series.some((value) => value > 0)
			? resolvedData.series
			: [],
	};
}
