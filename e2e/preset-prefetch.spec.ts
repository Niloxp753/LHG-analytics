import { expect, test } from '@playwright/test';

test.describe('Task 01 - Preset prefetch', () => {
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

	test('initial load does not prefetch alternate presets and current preset is not clickable', async ({
		page,
	}) => {
		const alternatePresetRequests: string[] = [];

		page.on('request', (request) => {
			const url = new URL(request.url());
			if (url.pathname !== '/general') {
				return;
			}

			const set = url.searchParams.get('set');
			if (
				set &&
				set !== 'ultimos_7_dias' &&
				['ultimo_mes_fechado', 'este_mes', 'acumulado_do_ano'].includes(set)
			) {
				alternatePresetRequests.push(request.url());
			}
		});

		await page.goto('/general?menu=general&set=ultimos_7_dias');
		await page.waitForTimeout(1500);

		await expect(page.getByRole('link', { name: /7 dias/i })).toHaveCount(0);
		await expect(page.locator('[aria-current="page"]')).toContainText(/7 dias/i);
		expect(alternatePresetRequests).toEqual([]);
	});
});
