import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { installIntersectionObserverStub } from './helpers/intersection-observer-stub';

const CHARTS_DIR = path.join(
	process.cwd(),
	'src',
	'app',
	'(dashboard)',
	'_components',
	'charts',
);

test('deferred chart boundary keeps the project component split', async () => {
	const boundary = readFileSync(
		path.join(CHARTS_DIR, 'deferred-chart-mount.tsx'),
		'utf8',
	);
	const placeholder = readFileSync(
		path.join(CHARTS_DIR, 'chart-mount-placeholder.tsx'),
		'utf8',
	);

	expect(boundary.match(/export default function/g) ?? []).toHaveLength(1);
	expect(placeholder.match(/export default function/g) ?? []).toHaveLength(1);
	expect(boundary).toContain('data-chart-state={mounted ? \'mounted\' : \'placeholder\'}');
	expect(boundary).toContain("className='w-full'");
	expect(boundary).toContain('style={mounted ? undefined : { minHeight }}');
	expect(boundary).toContain('aria-busy={mounted ? undefined : true}');
	expect(placeholder).toContain('aria-label=\'Carregando gráfico\'');
	expect(placeholder).toContain("aria-live='off'");
	expect(placeholder).toContain('h-[calc(100%_-_2.25rem)]');
});

test.describe('deferred chart boundary browser contract', () => {
	test.beforeEach(async ({ page }, testInfo) => {
		const baseURL = testInfo.project.use.baseURL;
		if (!baseURL) throw new Error('Missing baseURL in Playwright config');
		await page.context().addCookies([
			{ name: 'access_token', value: 'playwright', url: `${baseURL}/` },
			{ name: 'refresh_token', value: 'playwright_refresh', url: `${baseURL}/` },
		]);
	});

	test('keeps eager content mounted and exposes an accessible placeholder below fold', async ({
		page,
	}) => {
		await page.setViewportSize({ width: 1365, height: 400 });
		await installIntersectionObserverStub(page);
		await page.goto('/general?menu=general&set=ultimos_7_dias');
		const eager = page.locator(
			'[data-chart-deferred="general-consolidated-summary"]:visible',
		);
		await expect(eager).toHaveAttribute('data-chart-state', 'mounted');
		await expect(eager).not.toHaveAttribute('aria-busy', 'true');
		await expect(eager).not.toHaveAttribute('style', /min-height/);

		const deferred = page.locator(
			'[data-chart-deferred="general-consolidated-occupancy"]:visible',
		);
		await expect(deferred).toHaveAttribute('data-chart-state', 'placeholder');
		await expect(deferred).toHaveAttribute('aria-busy', 'true');
		await expect(deferred).toHaveAttribute('style', /min-height/);
		await expect(deferred.getByLabel('Carregando gráfico')).toBeVisible();
		await expect(deferred.locator('.apexcharts-canvas')).toHaveCount(0);
	});
});
