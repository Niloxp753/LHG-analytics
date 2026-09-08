import { expect, test } from '@playwright/test';

const dashboardKpiRoutes = [
	'/general',
	'/operational',
	'/reservations',
	'/restaurant',
] as const;

test('KPI date-range resolution does not read current time in the instant shell', async ({
	page,
	}) => {
	test.setTimeout(120_000);

	const baseURL = test.info().project.use.baseURL;
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

	const prerenderErrors: string[] = [];
	const collectPrerenderError = (message: string) => {
		if (
			message.includes('blocking-prerender-current-time') ||
			(message.includes('new Date()') && message.includes('prerendering'))
		) {
			prerenderErrors.push(message);
		}
	};

	page.on('console', (message) => collectPrerenderError(message.text()));
	page.on('pageerror', (error) => collectPrerenderError(error.message));

	for (const route of dashboardKpiRoutes) {
		await page.goto(`${route}?set=ultimos_7_dias`, {
			waitUntil: 'domcontentloaded',
		});
		await expect(page.locator('main')).toBeVisible({ timeout: 30_000 });
	}

	expect(prerenderErrors).toEqual([]);
});
