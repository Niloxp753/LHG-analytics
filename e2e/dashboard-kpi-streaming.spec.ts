import { expect, test } from '@playwright/test';

const BACKEND_DELAY_MS = 2500;

test.describe('dashboard KPI streaming', () => {
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

	test('renders the dashboard shell before KPI data resolves', async ({ page }) => {
		await page.goto(
			'/general?menu=general&set=custom&startDate=01/02/2026&endDate=07/02/2026',
		);
		await expect(page.getByText(/123\.456,78/)).toBeVisible();

		const startedAt = Date.now();
		const navigation = page.goto(
			'/general?menu=general&set=ultimos_7_dias&startDate=01/03/2026&endDate=07/03/2026',
			{
				waitUntil: 'commit',
			},
		);

		await expect(page.getByRole('heading', { level: 2 }).first()).toBeVisible({
			timeout: BACKEND_DELAY_MS + 2000,
		});
		const shellElapsedMs = Date.now() - startedAt;
		expect(shellElapsedMs).toBeLessThan(BACKEND_DELAY_MS);

		await navigation;
		await expect(page.getByText(/223\.456,78/)).toBeVisible();
		const totalElapsedMs = Date.now() - startedAt;
		expect(totalElapsedMs).toBeGreaterThanOrEqual(BACKEND_DELAY_MS);
	});
});
