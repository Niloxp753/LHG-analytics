import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { deferredBlock } from './helpers/deferred-block';
import {
	installIntersectionObserverStub,
	triggerChartIntersection,
} from './helpers/intersection-observer-stub';

const OPERATIONAL_DIR = path.join(
	process.cwd(),
	'src',
	'app',
	'(dashboard)',
	'operational',
	'_components',
);

function readSource(fileName: string) {
	return readFileSync(path.join(OPERATIONAL_DIR, fileName), 'utf8');
}

test.describe('Operational progressive chart structure', () => {
	test('keeps consolidated summary eager and shift charts deferred', async () => {
		const source = readSource('operational-kpi-content.tsx');

		expect(deferredBlock(source, 'operational-consolidated-summary')).toMatch(
			/\beager\b/,
		);
		expect(source).toContain("name='operational-consolidated-morning-cleaning'");
		expect(source).toContain("name='operational-consolidated-afternoon-cleaning'");
		expect(source).toContain("name='operational-consolidated-night-cleaning'");
	});

	test('keeps unit tables outside chart boundaries', async () => {
		const source = readSource('standard-unit-data-section.tsx');

		expect(source).toContain("name='operational-unit-summary'");
		expect(source).toContain("name='operational-unit-total-cleaning'");
		expect(source).toContain("name='operational-unit-morning-workers'");
		expect(source).toContain("name='operational-unit-afternoon-workers'");
		expect(source).toContain("name='operational-unit-night-workers'");

		const tableStart = source.indexOf('<div className=\'flex gap-5 flex-col w-full\'>');
		expect(tableStart).toBeGreaterThan(-1);
		const tableSource = source.slice(tableStart);
		expect(tableSource).toContain('<TableWokersMorning');
		expect(tableSource).toContain('<TableWokersAfternoon');
		expect(tableSource).toContain('<TableWokersNight');
		expect(tableSource).toContain('<TableWokersWeekly');
	});
});

test.describe('Operational progressive chart browser behavior', () => {
	test.beforeEach(async ({ page }, testInfo) => {
		const baseURL = testInfo.project.use.baseURL;
		if (!baseURL) throw new Error('Missing baseURL in Playwright config');
		await page.context().addCookies([
			{ name: 'access_token', value: 'playwright', url: `${baseURL}/` },
			{ name: 'refresh_token', value: 'playwright_refresh', url: `${baseURL}/` },
		]);
	});

	test('consolidated summary mounts before shift time-series charts', async ({
		page,
	}) => {
		await page.setViewportSize({ width: 1365, height: 700 });
		await installIntersectionObserverStub(page);
		await page.goto('/operational?menu=operational&set=ultimos_7_dias');
		await expect(
			page.locator(
				'[data-chart-deferred="operational-consolidated-summary"]:visible',
			),
		).toHaveAttribute('data-chart-state', 'mounted');
		const shiftBoundary = page.locator(
			'[data-chart-deferred="operational-consolidated-night-cleaning"]:visible',
		);
		await expect(shiftBoundary).toHaveAttribute('data-chart-state', 'placeholder');
		await expect(shiftBoundary.locator('.apexcharts-canvas')).toHaveCount(0);
		await triggerChartIntersection(
			page,
			'operational-consolidated-night-cleaning',
			true,
		);
		await expect(shiftBoundary).toHaveAttribute('data-chart-state', 'mounted');
	});

	test('unit worker tables remain in the document while charts defer', async ({
		page,
	}) => {
		await page.setViewportSize({ width: 1365, height: 700 });
		await page.goto('/operational/liv?menu=operational&set=ultimos_7_dias');
		await expect(
			page.locator('[data-chart-deferred="operational-unit-summary"]'),
		).toHaveAttribute('data-chart-state', 'mounted');
		await expect(
			page.locator('[data-chart-deferred="operational-unit-total-cleaning"]'),
		).toHaveAttribute('data-chart-state', 'placeholder');
		await expect(page.getByText(/Relatório|relatório|Funcionários/i).first()).toBeVisible();
	});
});
