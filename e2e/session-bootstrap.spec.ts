import { expect, test } from '@playwright/test';

test.describe('Task 02 - Enriched session bootstrap', () => {
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

	test('dashboard first load uses enriched session without client auth bootstrap requests', async ({
		page,
	}) => {
		const authBootstrapRequests: string[] = [];

		page.on('request', (request) => {
			const url = new URL(request.url());
			if (url.pathname === '/api/me' || url.pathname.startsWith('/api/users/email/')) {
				authBootstrapRequests.push(request.url());
			}
		});

		await page.goto('/general?menu=general&set=ultimos_7_dias');
		await expect(page.getByRole('link', { name: /Painel Admin/i })).toBeVisible();
		await page.waitForTimeout(1000);

		expect(authBootstrapRequests).toEqual([]);
	});
});
