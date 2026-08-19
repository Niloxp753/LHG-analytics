import { expect, test } from '@playwright/test';

function loadPaletteModule() {
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	return require(
		'../src/app/(dashboard)/_components/charts/consolidated-unit-palette'
	) as typeof import('../src/app/(dashboard)/_components/charts/consolidated-unit-palette');
}

test.describe('unit chart palette contract', () => {
	test('maps all eight units to the approved colors', async () => {
		const {
			resolveUnitAccentPaletteFromLabels,
			resolveUnitPaletteFromLabels,
		} = loadPaletteModule();
		const labels = [
			'Lush Ipiranga',
			'Lush Lapa',
			'Tout',
			'Andar de Cima',
			'LIV',
			'Altana',
			'Getan Garavelo',
			'Getan Parque Oeste',
		];

		expect(resolveUnitPaletteFromLabels(labels)).toEqual([
			'#a78bfa',
			'#60a5fa',
			'#818cf8',
			'#e879f9',
			'#fb7185',
			'#fb923c',
			'#facc15',
			'#a3e635',
		]);
		expect(resolveUnitAccentPaletteFromLabels(labels)).toEqual([
			'#7c3aed',
			'#2563eb',
			'#4f46e5',
			'#c026d3',
			'#e11d48',
			'#ea580c',
			'#ca8a04',
			'#65a30d',
		]);
	});

	test('keeps unit identity when labels are reordered or use backend aliases', async () => {
		const { resolveUnitPaletteFromLabels } = loadPaletteModule();

		expect(
			resolveUnitPaletteFromLabels([
				'getan_pq_oeste',
				'LIV',
				'getan_garavelo',
				'Lush Ipiranga',
			]),
		).toEqual(['#a3e635', '#fb7185', '#facc15', '#a78bfa']);
	});

	test('does not fall back to the five positional pie colors for the eight units', async () => {
		const { resolveChartPalette } = loadPaletteModule();

		expect(
			resolveChartPalette({
				palette: 'units',
				labels: [
					'Lush Ipiranga',
					'Lush Lapa',
					'Tout',
					'Andar de Cima',
					'LIV',
					'Altana',
					'Getan Garavelo',
					'Getan Parque Oeste',
				],
				fallbackSeriesColors: [
					'#a78bfa',
					'#60a5fa',
					'#818cf8',
					'#e879f9',
					'#fb7185',
				],
				fallbackAccentColors: [
					'#7c3aed',
					'#2563eb',
					'#4f46e5',
					'#c026d3',
					'#e11d48',
				],
			}).seriesColors,
		).toEqual([
			'#a78bfa',
			'#60a5fa',
			'#818cf8',
			'#e879f9',
			'#fb7185',
			'#fb923c',
			'#facc15',
			'#a3e635',
		]);
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
