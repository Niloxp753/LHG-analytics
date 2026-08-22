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

	test('initial load does not prefetch alternate presets or navigate when reselecting the current period', async ({
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

		const periodSelector = page.getByRole('combobox', {
			name: 'Selecionar período',
		});
		await expect(periodSelector).toContainText(/7 dias/i);
		await periodSelector.click();
		await page.getByRole('option', { name: /7 dias/i }).click();
		await expect(page).toHaveURL(
			'/general?menu=general&set=ultimos_7_dias',
		);
		expect(alternatePresetRequests).toEqual([]);
	});
});
