export type ChartDensityMode = 'detailed' | 'dense';

export type ChartDensityProfile = Readonly<{
	mode: ChartDensityMode;
	animationsEnabled: boolean;
	allowDataLabels: boolean;
	curve: 'smooth' | 'straight';
	markerHoverSize: number;
	markerSize: number;
}>;

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
