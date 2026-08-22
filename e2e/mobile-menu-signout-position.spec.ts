import { expect, test } from '@playwright/test';

test('keeps the mobile sign-out button near the bottom of the menu', async ({
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
	const signOut = menu.locator('button.border-destructive');
	await expect(menu).toBeVisible();
	await expect(signOut).toBeVisible();

	const bottomGap = await menu.evaluate((element, button) => {
		const menuBox = element.getBoundingClientRect();
		const buttonBox = button.getBoundingClientRect();

		return menuBox.bottom - buttonBox.bottom;
	}, await signOut.elementHandle());

	expect(bottomGap).toBeGreaterThanOrEqual(16);
	expect(bottomGap).toBeLessThanOrEqual(24);
});
