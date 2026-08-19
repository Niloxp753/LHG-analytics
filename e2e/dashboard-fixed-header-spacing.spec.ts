import { expect, test } from '@playwright/test';

const routes = [
	'/general',
	'/restaurant',
	'/reservations',
	'/operational',
	'/general/lushlapa',
	'/restaurant/lushlapa',
	'/reservations/lushlapa',
	'/operational/lushlapa',
	'/operational/altana',
	'/settings',
] as const;

const viewports = [
	{ name: 'desktop', width: 1600, height: 900 },
	{ name: 'mobile', width: 390, height: 844 },
] as const;

test('fixed dashboard headers leave visible space before page content', async ({
	page,
}) => {
	test.setTimeout(120_000);

	const baseURL = process.env.HEADER_TEST_BASE_URL;
	if (!baseURL) {
		throw new Error('Missing HEADER_TEST_BASE_URL');
	}

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

	const overlaps: string[] = [];

	for (const viewport of viewports) {
		await page.setViewportSize(viewport);

		for (const route of routes) {
			await page.goto(`${baseURL}${route}?set=ultimos_7_dias`, {
				waitUntil: 'load',
			});

			const header = page.locator('main .fixed.top-0').first();
			await expect(header).toBeVisible();

			const gap = await header.evaluate((element) => {
				const headerBottom = element.getBoundingClientRect().bottom;
				const contentTop = element.nextElementSibling?.getBoundingClientRect().top;

				return contentTop === undefined ? null : contentTop - headerBottom;
			});

			if (gap === null || gap < 8) {
				overlaps.push(`${viewport.name} ${route}: ${gap}`);
			}
		}
	}

	expect(overlaps).toEqual([]);
});
