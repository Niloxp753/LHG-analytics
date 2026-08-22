import { instant } from '@next/playwright';
import { expect, test } from '@playwright/test';

const dashboardRoutes = [
	'/general',
	'/general/altana',
	'/general/andardecima',
	'/general/getangaravelo',
	'/general/getanpqoeste',
	'/general/liv',
	'/general/lushipiranga',
	'/general/lushlapa',
	'/general/tout',
	'/restaurant',
	'/restaurant/altana',
	'/restaurant/andardecima',
	'/restaurant/getangaravelo',
	'/restaurant/getanpqoeste',
	'/restaurant/liv',
	'/restaurant/lushipiranga',
	'/restaurant/lushlapa',
	'/restaurant/tout',
	'/reservations',
	'/reservations/altana',
	'/reservations/andardecima',
	'/reservations/getangaravelo',
	'/reservations/getanpqoeste',
	'/reservations/liv',
	'/reservations/lushipiranga',
	'/reservations/lushlapa',
	'/reservations/tout',
	'/operational',
	'/operational/altana',
	'/operational/andardecima',
	'/operational/getangaravelo',
	'/operational/getanpqoeste',
	'/operational/liv',
	'/operational/lushipiranga',
	'/operational/lushlapa',
	'/operational/tout',
	'/settings',
] as const;

test('general exposes a meaningful static shell on first load', async ({
	browser,
	baseURL,
}) => {
	if (!baseURL) {
		throw new Error('Missing baseURL in Playwright config');
	}

	const context = await browser.newContext({
		baseURL,
		javaScriptEnabled: false,
	});
	const page = await context.newPage();
	const origin = new URL(baseURL).origin;
	await page.context().addCookies([
		{
			name: 'access_token',
			value: 'playwright',
			url: `${origin}/`,
		},
		{
			name: 'refresh_token',
			value: 'playwright_refresh',
			url: `${origin}/`,
		},
	]);

	try {
		await instant(
			page,
			async () => {
				await page.goto('/general?set=ultimos_7_dias');
				await expect(page.locator('main')).toBeVisible();
				await expect(
					page.getByRole('heading', { name: /Visão Geral/i }),
				).toBeVisible();
				await expect(page.getByTestId('general-kpis-loading')).toBeVisible();
			},
			{ baseURL },
		);
	} finally {
		await context.close();
	}
});

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
