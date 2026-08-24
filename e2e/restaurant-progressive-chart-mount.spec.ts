import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { deferredBlock } from './helpers/deferred-block';

const RESTAURANT_DIR = path.join(
	process.cwd(),
	'src',
	'app',
	'(dashboard)',
	'restaurant',
	'_components',
);

function readSource(fileName: string) {
	return readFileSync(path.join(RESTAURANT_DIR, fileName), 'utf8');
}

test.describe('Restaurant progressive chart structure', () => {
	test('keeps the consolidated Revenue/Sales summary row immediate', () => {
		const source = readSource('restaurant-kpi-content.tsx');
		const firstDeferred = source.indexOf(
			"name='restaurant-consolidated-revenue-ab'",
		);

		expect(source).toContain(
			"import DeferredChartMount from '../../_components/charts/deferred-chart-mount'",
		);
		expect(source.indexOf('<BigNumbersPage')).toBeLessThan(firstDeferred);
		expect(source.indexOf('<UnityxRevenue')).toBeLessThan(firstDeferred);
		expect(source.indexOf('<UnityxSales')).toBeLessThan(firstDeferred);
		for (const name of [
			'restaurant-consolidated-revenue-ab',
			'restaurant-consolidated-revenue-ab-percent',
			'restaurant-consolidated-ticket-average',
		]) {
			expect(deferredBlock(source, name)).toContain('Unityx');
		}
	});

	test('defers Apex visualizations while leaving report and selling tables immediate', () => {
		const source = readSource('unit-data-content.tsx');
		const expectedNames = [
			'restaurant-unit-revenue-ab',
			'restaurant-unit-revenue-ab-percent',
			'restaurant-unit-ticket-average',
			'restaurant-unit-revenue-by-group',
			'restaurant-unit-category-food',
			'restaurant-unit-category-drinks',
		];

		for (const name of expectedNames) {
			expect(source).toContain(`name="${name}"`);
		}

		for (const name of expectedNames) {
			const block = deferredBlock(source, name);
			expect(block).not.toMatch(/<(AReports|BReports|CReports|MostSell|MinusSell|BestSellingDrinks|LeastSellingDrinks)\b/);
		}

		const firstReport = source.indexOf('<BReports');
		const lastChart = source.indexOf(
			'name="restaurant-unit-category-drinks"',
		);
		expect(firstReport).toBeGreaterThan(lastChart);
		expect(source).toContain('<CReports data={reportByOthers}');
		expect(source).toContain('<AReports data={reportByFood}');
		expect(source).toContain('<MostSell data={bestSellingFood}');
		expect(source).toContain('<LeastSellingDrinks');
	});

	test('reserves larger heights for the existing restaurant chart cards', () => {
		const source = readSource('unit-data-content.tsx');
		expect(source).toContain(
			'minHeight={720} name="restaurant-unit-revenue-by-group"',
		);
		expect(source).toContain(
			'minHeight={520} name="restaurant-unit-category-food"',
		);
		expect(source).toContain(
			'minHeight={520} name="restaurant-unit-category-drinks"',
		);
	});
});
