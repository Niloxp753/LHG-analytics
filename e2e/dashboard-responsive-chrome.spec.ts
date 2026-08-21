import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page, baseURL }) => {
	if (!baseURL) throw new Error('Missing baseURL in Playwright config');
	const origin = new URL(baseURL).origin;
	await page.context().addCookies([
		{ name: 'access_token', value: 'playwright', url: `${origin}/` },
		{
			name: 'refresh_token',
			value: 'playwright_refresh',
			url: `${origin}/`,
		},
	]);
});

test('mobile mounts only mobile chrome and defers filter body', async ({
	page,
}) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/general?menu=general&set=ultimos_7_dias');
	await expect(page.getByTestId('dashboard-mobile-chrome')).toHaveCount(1);
	await expect(page.getByTestId('filter-mobile-trigger')).toBeVisible();
	await expect(page.getByTestId('dashboard-desktop-chrome')).toHaveCount(0);
	await expect(page.getByTestId('dashboard-header-client')).toHaveCount(0);
	await expect(page.getByTestId('mobile-filter-content')).toHaveCount(0);
	await page.getByTestId('filter-mobile-trigger').click();
	await expect(page.getByTestId('mobile-filter-content')).toBeVisible();
	await expect(page.getByRole('button', { name: 'Data Inicial' })).toBeVisible();
});

test('desktop mounts only desktop chrome and header', async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto('/general?menu=general&set=ultimos_7_dias');
	await expect(page.getByTestId('dashboard-desktop-chrome')).toHaveCount(1);
	await expect(
		page.getByTestId('dashboard-desktop-chrome').locator('button').first(),
	).toBeVisible();
	await expect(page.getByTestId('dashboard-mobile-chrome')).toHaveCount(0);
	await expect(page.getByTestId('dashboard-header-client')).toBeVisible();
	await expect(page.getByTestId('filter-mobile-trigger')).toHaveCount(0);
});

test('mobile menu loads on demand and restores focus', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/general?menu=general&set=ultimos_7_dias');
	const trigger = page.getByRole('button', { name: 'Abrir menu de navegação' });
	await expect(page.getByTestId('mobile-menu-content')).toHaveCount(0);
	await trigger.click();
	await expect(page.getByTestId('mobile-menu-content')).toBeVisible();
	await page.keyboard.press('Escape');
	await expect(page.getByTestId('mobile-menu-content')).toHaveCount(0);
	await expect(trigger).toBeFocused();
});

test('mobile filter body is absent from the initial JavaScript resources', async ({
	page,
	}) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/general?menu=general&set=ultimos_7_dias');
	await page.waitForLoadState('networkidle');

	const scriptUrls = await page.evaluate(() =>
		performance
			.getEntriesByType('resource')
			.filter(
				(entry) =>
					(entry as PerformanceResourceTiming).initiatorType === 'script',
			)
			.map((entry) => entry.name),
	);
	const initialBodies = await Promise.all(
		scriptUrls.map(async (url) => (await page.request.get(url)).text()),
	);
	// Next emits a small dynamic-loader manifest in the initial graph. The
	// rendered Sheet body itself must remain in the deferred chunk.
	expect(initialBodies.some((body) => body.includes('Filtrar por data'))).toBe(
		false,
	);

	const filterChunk = page.waitForResponse(async (response) => {
		if (!response.url().includes('/_next/static/chunks/')) return false;
		return (await response.text()).includes('Filtrar por data');
	});
	await page.getByTestId('filter-mobile-trigger').click();
	await filterChunk;
});

test('pending and hydrated mobile chrome keep zero flow height', async ({
	browser,
	baseURL,
	page,
}) => {
	if (!baseURL) throw new Error('Missing baseURL in Playwright config');
	const origin = new URL(baseURL).origin;

	const noJsContext = await browser.newContext({
		javaScriptEnabled: false,
		viewport: { width: 390, height: 844 },
	});
	try {
		await noJsContext.addCookies([
			{ name: 'access_token', value: 'playwright', url: `${origin}/` },
			{
				name: 'refresh_token',
				value: 'playwright_refresh',
				url: `${origin}/`,
			},
		]);
		const noJsPage = await noJsContext.newPage();
		await noJsPage.goto('/general?menu=general&set=ultimos_7_dias');
		await expect(
			noJsPage.getByTestId('dashboard-chrome-fallback'),
		).toHaveCSS('height', '0px');
	} finally {
		await noJsContext.close();
	}

	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/general?menu=general&set=ultimos_7_dias');
	await expect(page.getByTestId('dashboard-mobile-chrome')).toHaveCSS(
		'height',
		'0px',
	);
});
