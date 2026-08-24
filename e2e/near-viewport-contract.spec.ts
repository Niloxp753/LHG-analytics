import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import {
	installIntersectionObserverStub,
	readObservedChartState,
	triggerChartIntersection,
} from './helpers/intersection-observer-stub';

const HOOK_SOURCE = path.join(
	process.cwd(),
	'src',
	'app',
	'(dashboard)',
	'_components',
	'charts',
	'use-near-viewport.ts',
);

test('near-viewport hook keeps its one-way observer contract', async () => {
	const source = readFileSync(HOOK_SOURCE, 'utf8');

	expect(source).toContain("rootMargin = '600px 0px'");
	expect(source).toContain('threshold: 0.01');
	expect(source).toContain('observer.disconnect()');
	expect(source).toContain('return () => observer.disconnect()');
	expect(source).toContain('if (!entry?.isIntersecting)');
	expect(source).toContain('useState(disabled)');
	expect(source).not.toContain("typeof window !== 'undefined'");
	expect(source).toMatch(
		/typeof IntersectionObserver === 'undefined'[\s\S]*setIsNearViewport\(true\)/,
	);
});

test.describe('near-viewport browser behavior', () => {
	test.beforeEach(async ({ page }, testInfo) => {
		const baseURL = testInfo.project.use.baseURL;
		if (!baseURL) throw new Error('Missing baseURL in Playwright config');
		await page.context().addCookies([
			{ name: 'access_token', value: 'playwright', url: `${baseURL}/` },
			{ name: 'refresh_token', value: 'playwright_refresh', url: `${baseURL}/` },
		]);
		await page.setViewportSize({ width: 1365, height: 400 });
	});

	test('ignores non-intersecting entries and mounts once on intersection', async ({
		page,
	}) => {
		await installIntersectionObserverStub(page);
		await page.goto('/general?menu=general&set=ultimos_7_dias');
		const boundary = page.locator(
			'[data-chart-deferred="general-consolidated-occupancy"]:visible',
		);
		await expect(boundary).toHaveAttribute('data-chart-state', 'placeholder');
		await expect(boundary.locator('.apexcharts-canvas')).toHaveCount(0);

		await triggerChartIntersection(
			page,
			'general-consolidated-occupancy',
			false,
		);
		const observer = await readObservedChartState(
			page,
			'general-consolidated-occupancy',
		);
		expect(observer).toMatchObject({
			rootMargin: '600px 0px',
			threshold: 0.01,
		});
		await expect(boundary).toHaveAttribute('data-chart-state', 'placeholder');

		await triggerChartIntersection(
			page,
			'general-consolidated-occupancy',
			true,
		);
		await expect(boundary).toHaveAttribute('data-chart-state', 'mounted');

		await triggerChartIntersection(
			page,
			'general-consolidated-occupancy',
			false,
		);
		await expect(boundary).toHaveAttribute('data-chart-state', 'mounted');
		await expect(boundary).not.toHaveAttribute('aria-busy', 'true');
		expect(
			(
				await readObservedChartState(
					page,
					'general-consolidated-occupancy',
				)
			).disconnected,
		).toBe(true);
	});

	test('mounts deferred boundaries immediately when IntersectionObserver is unavailable', async ({
		page,
	}) => {
		await page.addInitScript(() => {
			Object.defineProperty(window, 'IntersectionObserver', {
				configurable: true,
				value: undefined,
			});
		});
		await page.goto('/general?menu=general&set=ultimos_7_dias');
		await expect(
			page.locator(
				'[data-chart-deferred="general-consolidated-occupancy"]:visible',
			),
		).toHaveAttribute('data-chart-state', 'mounted');
	});
});
