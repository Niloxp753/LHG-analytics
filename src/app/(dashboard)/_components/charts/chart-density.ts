export type ChartDensityMode = 'detailed' | 'dense';

export type ChartDensityProfile = Readonly<{
	mode: ChartDensityMode;
	animationsEnabled: boolean;
	allowDataLabels: boolean;
	curve: 'smooth' | 'straight';
	markerHoverSize: number;
	markerSize: number;
}>;

export type XAxisLabelPolicy = Readonly<{
	rotate: 0 | -45;
	tickAmount?: number;
}>;

export const Y_AXIS_READABILITY = Object.freeze({
	forceNiceScale: true,
	tickAmount: 5,
	labels: Object.freeze({
		maxWidth: 120,
		minWidth: 48,
	}),
});

const DETAILED_PROFILE: ChartDensityProfile = Object.freeze({
	mode: 'detailed',
	animationsEnabled: true,
	allowDataLabels: true,
	curve: 'smooth',
	markerHoverSize: 5,
	markerSize: 3,
});

const DENSE_PROFILE: ChartDensityProfile = Object.freeze({
	mode: 'dense',
	animationsEnabled: false,
	allowDataLabels: false,
	curve: 'straight',
	markerHoverSize: 4,
	markerSize: 0,
});

export function resolveChartDensity(series: unknown): ChartDensityProfile {
	if (!Array.isArray(series) || series.length === 0) return DETAILED_PROFILE;

	const lengths: number[] = [];
	for (const entry of series) {
		if (!entry || typeof entry !== 'object') return DETAILED_PROFILE;
		const data = (entry as { data?: unknown }).data;
		if (!Array.isArray(data)) return DETAILED_PROFILE;
		lengths.push(data.length);
	}

	const maxPointsPerSeries = Math.max(0, ...lengths);
	const totalPoints = lengths.reduce((total, length) => total + length, 0);
	return maxPointsPerSeries <= 31 && totalPoints <= 250
		? DETAILED_PROFILE
		: DENSE_PROFILE;
}

export function resolveXAxisLabelPolicy(
	categories: readonly string[] | undefined,
	maxVisibleLabels: number,
): XAxisLabelPolicy {
	const labels = categories ?? [];
	const visibleLimit = Math.max(2, Math.floor(maxVisibleLabels));

	if (labels.length <= visibleLimit) {
		return {
			rotate: 0,
		};
	}

	return {
		rotate: -45,
		tickAmount: visibleLimit - 1,
	};
}
