import { expect, test } from '@playwright/test';

test('does not show the unavailable evaluations option in the mobile menu', async ({
	page,
}) => {
	const baseURL = process.env.MOBILE_MENU_TEST_BASE_URL;
	if (!baseURL) {
		throw new Error('Missing MOBILE_MENU_TEST_BASE_URL');
	}

	await page.setViewportSize({ width: 390, height: 844 });
	await page.context().addCookies([
		{
			name: 'access_token',
			value: 'playwright',
			url: `${baseURL}/`,
		},
		{
			name: 'refresh_token',
			value: 'playwright_refresh',
			url: `${baseURL}/`,
		},
	]);

	await page.goto(`${baseURL}/general?set=ultimos_7_dias`);
	await page.locator('button.fixed.top-4.left-3').click();

	const menu = page.getByRole('dialog', { name: 'Menu de navegação' });
	await expect(menu.getByRole('button', { name: 'Visão Geral' })).toBeVisible();
	await expect(menu.getByRole('button', { name: 'Avaliações' })).toHaveCount(0);
});
