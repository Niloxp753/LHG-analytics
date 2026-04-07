import { expect, test } from '@playwright/test';

function loadPaletteModule() {
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	return require(
		'../src/app/(dashboard)/_components/charts/consolidated-unit-palette'
	) as typeof import('../src/app/(dashboard)/_components/charts/consolidated-unit-palette');
}

test.describe('unit chart palette contract', () => {
	test('maps canonical units to approved Tailwind colors', async () => {
		const { resolveUnitPaletteFromLabels, UNIT_CHART_COLORS } =
			loadPaletteModule();

		expect(
			resolveUnitPaletteFromLabels([
				'Lush Ipiranga',
				'Lush Lapa',
				'Tout',
				'Andar de Cima',
				'LIV',
				'Altana',
			]),
		).toEqual([
			UNIT_CHART_COLORS.ipiranga.series,
			UNIT_CHART_COLORS.lapa.series,
			UNIT_CHART_COLORS.tout.series,
			UNIT_CHART_COLORS.andarDeCima.series,
			UNIT_CHART_COLORS.liv.series,
			UNIT_CHART_COLORS.altana.series,
		]);
	});

	test('normalizes aliases before resolving unit colors', async () => {
		const { resolveUnitPaletteFromLabels } = loadPaletteModule();

		expect(
			resolveUnitPaletteFromLabels(['Ipiranga', 'Liv', 'Andar de cima']),
		).toEqual(
			resolveUnitPaletteFromLabels([
				'Lush Ipiranga',
				'LIV',
				'Andar de Cima',
			]),
		);
	});

	test('keeps fallback colors when palette mode is default', async () => {
		const { resolveChartPalette } = loadPaletteModule();

		expect(
			resolveChartPalette({
				palette: 'default',
				labels: ['Lush Ipiranga', 'LIV'],
				fallbackSeriesColors: ['#111111', '#222222'],
				fallbackAccentColors: ['#333333', '#444444'],
			}),
		).toEqual({
			seriesColors: ['#111111', '#222222'],
			accentColors: ['#333333', '#444444'],
		});
	});

	test('resolves line colors from series names in unit palette mode', async () => {
		const { resolveChartPalette } = loadPaletteModule();

		expect(
			resolveChartPalette({
				palette: 'units',
				seriesNames: ['Lush Lapa', 'Liv', 'Altana'],
				fallbackSeriesColors: ['#111111'],
				fallbackAccentColors: ['#222222'],
			}).seriesColors,
		).toEqual(
			resolveChartPalette({
				palette: 'units',
				labels: ['Lush Lapa', 'LIV', 'Altana'],
				fallbackSeriesColors: ['#111111'],
				fallbackAccentColors: ['#222222'],
			}).seriesColors,
		);
	});
});
