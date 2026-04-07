import colors from 'tailwindcss/colors';

export type ChartPaletteMode = 'default' | 'units';

type UnitColorToken = {
	accent: string;
	canonicalLabel: string;
	series: string;
};

type UnitColorKey =
	| 'ipiranga'
	| 'lapa'
	| 'tout'
	| 'andarDeCima'
	| 'liv'
	| 'altana';

export const UNIT_CHART_COLORS: Record<UnitColorKey, UnitColorToken> = {
	ipiranga: {
		canonicalLabel: 'Lush Ipiranga',
		series: colors.violet[500],
		accent: colors.violet[700],
	},
	lapa: {
		canonicalLabel: 'Lush Lapa',
		series: colors.indigo[600],
		accent: colors.indigo[800],
	},
	tout: {
		canonicalLabel: 'Tout',
		series: colors.rose[500],
		accent: colors.rose[700],
	},
	andarDeCima: {
		canonicalLabel: 'Andar de Cima',
		series: colors.fuchsia[500],
		accent: colors.fuchsia[700],
	},
	liv: {
		canonicalLabel: 'LIV',
		series: colors.red[500],
		accent: colors.red[700],
	},
	altana: {
		canonicalLabel: 'Altana',
		series: colors.blue[500],
		accent: colors.blue[700],
	},
};

const UNIT_COLOR_KEY_BY_ALIAS: Record<string, UnitColorKey> = {
	ipiranga: 'ipiranga',
	'lush ipiranga': 'ipiranga',
	lapa: 'lapa',
	'lush lapa': 'lapa',
	tout: 'tout',
	'andar de cima': 'andarDeCima',
	andardecima: 'andarDeCima',
	liv: 'liv',
	altana: 'altana',
};

const DEFAULT_UNIT_ORDER: UnitColorKey[] = [
	'ipiranga',
	'lapa',
	'tout',
	'andarDeCima',
	'liv',
	'altana',
];

export const CONSOLIDATED_UNIT_COLORS = DEFAULT_UNIT_ORDER.map(
	(unitKey) => UNIT_CHART_COLORS[unitKey].series,
);

export const CONSOLIDATED_UNIT_DATA_LABEL_COLORS = DEFAULT_UNIT_ORDER.map(
	(unitKey) => UNIT_CHART_COLORS[unitKey].accent,
);

function normalizeLabelToken(label: string) {
	return label
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.trim()
		.toLowerCase()
		.replace(/\s+/g, ' ');
}

export function resolveUnitColorKey(label?: string | null): UnitColorKey | null {
	if (!label) {
		return null;
	}

	return UNIT_COLOR_KEY_BY_ALIAS[normalizeLabelToken(label)] ?? null;
}

export function normalizeUnitLabel(label: string) {
	const unitKey = resolveUnitColorKey(label);

	return unitKey ? UNIT_CHART_COLORS[unitKey].canonicalLabel : label;
}

export function resolveUnitPaletteFromLabels(labels?: string[]) {
	if (!Array.isArray(labels)) {
		return [];
	}

	return labels.map((label) => {
		const unitKey = resolveUnitColorKey(label);

		return unitKey ? UNIT_CHART_COLORS[unitKey].series : undefined;
	});
}

export function resolveUnitAccentPaletteFromLabels(labels?: string[]) {
	if (!Array.isArray(labels)) {
		return [];
	}

	return labels.map((label) => {
		const unitKey = resolveUnitColorKey(label);

		return unitKey ? UNIT_CHART_COLORS[unitKey].accent : undefined;
	});
}

export function resolveChartPalette({
	palette = 'default',
	labels,
	seriesNames,
	fallbackSeriesColors,
	fallbackAccentColors,
}: {
	fallbackAccentColors: string[];
	fallbackSeriesColors: string[];
	labels?: string[];
	palette?: ChartPaletteMode;
	seriesNames?: string[];
}) {
	if (palette !== 'units') {
		return {
			seriesColors: fallbackSeriesColors,
			accentColors: fallbackAccentColors,
		};
	}

	const identityLabels =
		Array.isArray(seriesNames) && seriesNames.length > 0 ? seriesNames : labels;
	const seriesColors = resolveUnitPaletteFromLabels(identityLabels);
	const accentColors = resolveUnitAccentPaletteFromLabels(identityLabels);

	if (
		seriesColors.length === 0 ||
		seriesColors.some((color) => typeof color !== 'string') ||
		accentColors.some((color) => typeof color !== 'string')
	) {
		return {
			seriesColors: fallbackSeriesColors,
			accentColors: fallbackAccentColors,
		};
	}

	return {
		seriesColors: seriesColors as string[],
		accentColors: accentColors as string[],
	};
}
