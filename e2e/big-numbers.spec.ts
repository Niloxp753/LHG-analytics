import { expect, test } from '@playwright/test';

test.describe('Task 23 - Big Numbers', () => {
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

	test('General shows "Ano anterior" in Big Numbers', async ({ page }) => {
		await page.goto('/general?menu=general&set=ultimos_7_dias');
		await expect(page.getByText(/Ano anterior/i).first()).toBeVisible();
	});

	test('Restaurant shows "Ano anterior 0" (generateDescription keeps 0)', async ({
		page,
	}) => {
		await page.goto('/restaurant?menu=restaurant&set=ultimos_7_dias');
		await expect(page.getByText(/Ano anterior\s*0\b/i)).toBeVisible();

		await page.goto(
			'/restaurant?menu=restaurant&set=ultimos_7_dias&startDate=2026-02-01&endDate=2026-02-07',
		);
		await expect(page.getByText(/Ano anterior\s*0\b/i)).toBeVisible();
	});

	test('Reservations shows "Ano anterior" in Big Numbers', async ({ page }) => {
		await page.goto('/reservations?menu=reservations&set=ultimos_7_dias');
		await expect(page.getByText(/Ano anterior/i).first()).toBeVisible();
	});

	test('Operational shows "Ano anterior 0" (generateDescription keeps 0)', async ({
		page,
	}) => {
		await page.goto('/operational?menu=operational&set=ultimos_7_dias');
		await expect(page.getByText(/Ano anterior\s*0\b/i)).toBeVisible();
	});
});
