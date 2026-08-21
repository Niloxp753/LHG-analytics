import { expect, test, type Page, type Request } from '@playwright/test';

type RouteCountMap = Map<string, number>;

function trackDashboardRequests(page: Page) {
	const counts: RouteCountMap = new Map();

	page.on('request', (request: Request) => {
		const key = normalizeDashboardRequest(request.url());
		if (!key) {
			return;
		}

		counts.set(key, (counts.get(key) ?? 0) + 1);
	});

	return counts;
}

function normalizeDashboardRequest(requestUrl: string) {
	const url = new URL(requestUrl);
	if (!['/general', '/restaurant', '/reservations', '/operational'].includes(url.pathname)) {
		return null;
	}

	const searchParams = new URLSearchParams(url.search);
	searchParams.delete('_rsc');

	const normalized = new URLSearchParams();
	for (const key of ['menu', 'set', 'startDate', 'endDate']) {
		const value = searchParams.get(key);
		if (value) {
			normalized.set(key, value);
		}
	}

	return `${url.pathname}?${normalized.toString()}`;
}

function readCount(counts: RouteCountMap, target: string) {
	return counts.get(target) ?? 0;
}

test.describe('Task 03 - RSC navigation dedup', () => {
	test.beforeEach(async ({ page }, testInfo) => {
		const baseURL = testInfo.project.use.baseURL;
		if (!baseURL) {
			throw new Error('Missing baseURL in Playwright config');
		}

		const cookieUrl = `${new URL(baseURL).origin}/`;
		await page.context().addCookies([
			{
				name: 'access_token',
				value: 'playwright',
				url: cookieUrl,
			},
			{
				name: 'refresh_token',
				value: 'playwright_refresh',
				url: cookieUrl,
			},
		]);
	});

	test('preset click fetches target route once', async ({ page }) => {
		const counts = trackDashboardRequests(page);

		await page.goto('/general?menu=general&set=ultimos_7_dias');
		const target = '/general?menu=general&set=este_mes';
		counts.delete(target);

		await page.getByRole('combobox', { name: 'Selecionar período' }).click();
		await page.getByRole('option', { name: /este m[êe]s/i }).click();
		await expect(page).toHaveURL(/set=este_mes/);
		await page.waitForTimeout(1000);

		expect(readCount(counts, target)).toBe(1);
	});

	test('custom date submit fetches target route once', async ({ page }) => {
		const counts = trackDashboardRequests(page);

		await page.goto('/general?menu=general&set=ultimos_7_dias');
		const target =
			'/general?menu=general&set=ultimos_7_dias&startDate=01%2F08%2F2026&endDate=07%2F08%2F2026';
		const pageUrlTarget =
			/general\?menu=general&set=ultimos_7_dias&startDate=01\/08\/2026&endDate=07\/08\/2026/;
		counts.delete(target);

		await page.getByRole('button', { name: 'Data Inicial' }).click();
		await page
			.locator('#header-start-date-popover')
			.locator('button[role="gridcell"]:not([disabled])')
			.filter({ hasText: /^1$/ })
			.first()
			.click();

		await page.getByRole('button', { name: 'Data Final' }).click();
		await page
			.locator('#header-end-date-popover')
			.locator('button[role="gridcell"]:not([disabled])')
			.filter({ hasText: /^7$/ })
			.first()
			.click();

		await page.getByRole('button', { name: /Atualizar/i }).click();
		await expect(page).toHaveURL(pageUrlTarget);
		await page.waitForTimeout(1000);

		expect(readCount(counts, target)).toBe(1);
	});

	test('mobile preset button does not navigate again to the current route', async ({
		page,
	}) => {
		const counts = trackDashboardRequests(page);

		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto('/general?menu=general&set=ultimos_7_dias');
		const target = '/general?menu=general&set=ultimos_7_dias';
		counts.delete(target);

		await page.getByTestId('filter-mobile-trigger').click();
		const sheet = page.getByRole('dialog', { name: /Filtrar por data/i });
		await expect(sheet).toBeVisible();

		await sheet
			.getByRole('combobox', { name: 'Selecionar período' })
			.click();
		await page.getByRole('option', { name: /7 dias/i }).click();
		await page.waitForTimeout(1000);

		expect(readCount(counts, target)).toBe(0);
	});
});
