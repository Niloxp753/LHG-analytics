import { expect, test } from '@playwright/test';
import { sortUnitComparison } from '../src/app/(dashboard)/_components/charts/unit-comparison-data';
import { resolveUnitPaletteFromLabels } from '../src/app/(dashboard)/_components/charts/consolidated-unit-palette';

test('ranks values descending while preserving unit identity, colors and input data', () => {
	const categories = Object.freeze(['Altana', 'LIV', 'Getan Novo Mundo']);
	const series = Object.freeze([10.25, 40.75, 20.5]);
	const ranked = sortUnitComparison(categories, series);
	expect(ranked).toEqual({
		categories: ['LIV', 'Getan Novo Mundo', 'Altana'],
		series: [40.75, 20.5, 10.25],
	});
	expect(resolveUnitPaletteFromLabels(ranked.categories)).toEqual([
		'#fb7185', '#34d399', '#fb923c',
	]);
	expect(series).toEqual([10.25, 40.75, 20.5]);
	expect(categories).toEqual(['Altana', 'LIV', 'Getan Novo Mundo']);
});

test('keeps tied units stable and includes zero values', () => {
	expect(sortUnitComparison(['Zero', 'A', 'B'], [0, 5, 5])).toEqual({
		categories: ['A', 'B', 'Zero'],
		series: [5, 5, 0],
	});
	expect(sortUnitComparison([], [])).toEqual({ categories: [], series: [] });
});
