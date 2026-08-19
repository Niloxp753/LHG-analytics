import { expect, test } from '@playwright/test';

const dashboardRoutes = [
	'/general',
	'/general/altana',
	'/general/andardecima',
	'/general/getanpqoeste',
	'/general/liv',
	'/general/lushipiranga',
	'/general/lushlapa',
	'/general/tout',
	'/restaurant',
	'/restaurant/altana',
	'/restaurant/andardecima',
	'/restaurant/getanpqoeste',
	'/restaurant/liv',
	'/restaurant/lushipiranga',
	'/restaurant/lushlapa',
	'/restaurant/tout',
	'/reservations',
	'/reservations/altana',
	'/reservations/andardecima',
	'/reservations/getanpqoeste',
	'/reservations/liv',
	'/reservations/lushipiranga',
	'/reservations/lushlapa',
	'/reservations/tout',
	'/operational',
	'/operational/altana',
	'/operational/andardecima',
	'/operational/getanpqoeste',
	'/operational/liv',
	'/operational/lushipiranga',
	'/operational/lushlapa',
	'/operational/tout',
	'/settings',
] as const;

test('dashboard routes render without blocking runtime insights', async ({
	page,
}, testInfo) => {
	test.setTimeout(120_000);

	const baseURL = testInfo.project.use.baseURL;
	if (!baseURL) {
		throw new Error('Missing baseURL in Playwright config');
	}

	await page.context().addCookies([
		{
			name: 'access_token',
			value: 'playwright',
			url: `${new URL(baseURL).origin}/`,
		},
		{
			name: 'refresh_token',
			value: 'playwright_refresh',
			url: `${new URL(baseURL).origin}/`,
		},
	]);

	const insights: string[] = [];
	const onConsole = (message: { type(): string; text(): string }) => {
		if (
			message.type() === 'error' &&
			message.text().includes('Next.js encountered') &&
			message.text().includes('data during prerendering or a navigation')
		) {
			insights.push(message.text());
		}
	};

	page.on('console', onConsole);

	for (const route of dashboardRoutes) {
		await page.goto(`${route}?set=ultimos_7_dias`, {
			waitUntil: 'load',
		});
		await expect(page.locator('main')).toBeVisible();
	}

	await page.waitForLoadState('networkidle');
	page.off('console', onConsole);
	expect(insights).toEqual([]);
});
