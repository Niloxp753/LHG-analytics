import { expect, test } from '@playwright/test';
import type { APIRequestContext, Page } from '@playwright/test';
import {
	installIntersectionObserverStub,
	triggerChartIntersection,
} from './helpers/intersection-observer-stub';

const COUNTS_ENDPOINT = '/api/mock-backend/__test__/fetch-counts';
const GENERAL_URL = '/general?menu=general&set=ultimos_7_dias';

async function readKpiCount(request: APIRequestContext) {
	const response = await request.get(COUNTS_ENDPOINT);
	expect(response.ok()).toBe(true);
	const counts = (await response.json()) as Record<string, number>;
	return Object.entries(counts)
		.filter(([key]) => key.startsWith('consolidated/Company/kpis/date-range'))
		.reduce((total, [, count]) => total + count, 0);
}

async function waitForStableKpiCount(
	page: Page,
	request: APIRequestContext,
): Promise<number> {
	await expect.poll(() => readKpiCount(request)).toBeGreaterThan(0);
	await page.waitForLoadState('networkidle');
	return readKpiCount(request);
}

test('mounts General charts progressively without refetching KPI data', async ({
	page,
	request,
}) => {
	await page.setViewportSize({ width: 1365, height: 400 });
	const baseURL = test.info().project.use.baseURL;
	if (!baseURL) throw new Error('Missing baseURL in Playwright config');
	await page.context().addCookies([
		{ name: 'access_token', value: 'playwright', url: `${baseURL}/` },
		{ name: 'refresh_token', value: 'playwright_refresh', url: `${baseURL}/` },
	]);
	await request.delete(COUNTS_ENDPOINT);
	await installIntersectionObserverStub(page);

	await page.goto(GENERAL_URL);
	await expect(
		page.locator('[data-chart-deferred="general-consolidated-summary"]:visible'),
	).toHaveAttribute('data-chart-state', 'mounted');
	await expect(page.locator('.apexcharts-canvas').first()).toBeVisible();

	const initialCanvases = await page.locator('.apexcharts-canvas').count();
	const lowerBoundary = page.locator(
		'[data-chart-deferred="general-consolidated-occupancy"]:visible',
	);
	await expect(lowerBoundary).toHaveAttribute('data-chart-state', 'placeholder');
	await expect(lowerBoundary.locator('.apexcharts-canvas')).toHaveCount(0);
	const countBeforeScroll = await waitForStableKpiCount(page, request);

	await triggerChartIntersection(
		page,
		'general-consolidated-occupancy',
		true,
	);
	await expect(lowerBoundary).toHaveAttribute('data-chart-state', 'mounted');
	await expect
		.poll(() => page.locator('.apexcharts-canvas').count())
		.toBeGreaterThan(initialCanvases);
	const countAfterMount = await readKpiCount(request);
	expect(countAfterMount).toBe(countBeforeScroll);
	await expect(lowerBoundary).not.toHaveAttribute('style', /min-height/);

	await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
	await expect(lowerBoundary).toHaveAttribute('data-chart-state', 'mounted');
	const finalCanvases = await page.locator('.apexcharts-canvas').count();
	expect(finalCanvases).toBeGreaterThanOrEqual(initialCanvases);
});
