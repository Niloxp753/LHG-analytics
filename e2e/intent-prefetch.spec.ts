import { expect, test, type Page } from '@playwright/test';

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

function trackTargetRequests(page: Page, setTag: string) {
	let count = 0;
	page.on('request', (request) => {
		const url = new URL(request.url());
		if (url.pathname !== '/general' || url.searchParams.get('set') !== setTag) {
			return;
		}
		url.searchParams.delete('_rsc');
		count += 1;
	});
	return () => count;
}

async function openPeriodSelector(page: Page) {
	await page.goto('/general?menu=general&set=ultimos_7_dias');
	await expect(page).toHaveURL(/\/general(?:\?|$)/);
	await page.getByRole('combobox', { name: 'Selecionar período' }).click();
}

test('leaving before 120 ms creates no target request', async ({ page }) => {
	const requests = trackTargetRequests(page, 'este_mes');
	await openPeriodSelector(page);

	const target = page.getByRole('option', { name: /Este mês/i });
	await target.hover();
	await page.waitForTimeout(80);
	await page.mouse.move(0, 0);
	await page.waitForTimeout(80);

	expect(requests()).toBe(0);
});

test('120 ms dwell prefetches once and focus stays deduplicated', async ({
	page,
}) => {
	test.skip(
		process.env.PW_SERVER !== 'start',
		'Next.js disables router prefetch network work in development; run this suite with PW_SERVER=start.',
	);
	const requests = trackTargetRequests(page, 'este_mes');
	await openPeriodSelector(page);

	const target = page.getByRole('option', { name: /Este mês/i });
	await target.hover();
	await page.waitForTimeout(150);
	await target.focus();
	await page.waitForTimeout(100);

	expect(requests()).toBe(1);
});

test('keyboard focus prefetches immediately and click still navigates once', async ({
	page,
}) => {
	test.skip(
		process.env.PW_SERVER !== 'start',
		'Next.js disables router prefetch network work in development; run this suite with PW_SERVER=start.',
	);
	const requests = trackTargetRequests(page, 'este_mes');
	await openPeriodSelector(page);
	const target = page.getByRole('option', { name: /Este mês/i });

	await target.focus();
	await expect.poll(requests).toBe(1);
	await target.click();
	await expect(page).toHaveURL(/set=este_mes/);
	expect(requests()).toBe(1);
});

test('pointer down alone does not start a competing prefetch', async ({ page }) => {
	test.skip(
		process.env.PW_SERVER !== 'start',
		'Next.js disables router prefetch network work in development; run this suite with PW_SERVER=start.',
	);
	const requests = trackTargetRequests(page, 'este_mes');
	await openPeriodSelector(page);
	const target = page.getByRole('option', { name: /Este mês/i });

	await target.dispatchEvent('pointerdown');
	await page.waitForTimeout(100);
	expect(requests()).toBe(0);
});

test('current period never prefetches itself', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/general?menu=general&set=ultimos_7_dias');
	const requests = trackTargetRequests(page, 'ultimos_7_dias');
	await page.getByTestId('filter-mobile-trigger').click();
	await page.getByRole('combobox', { name: 'Selecionar período' }).click();
	const current = page.getByRole('option', { name: /7 dias/i });

	await current.dispatchEvent('pointerenter');
	await page.waitForTimeout(150);
	await current.focus();
	await current.dispatchEvent('pointerdown');
	expect(requests()).toBe(0);
});

test('a current target can be prefetched after it becomes eligible', async ({
	page,
}) => {
	test.skip(
		process.env.PW_SERVER !== 'start',
		'Next.js performs router prefetch network work in production mode.',
	);
	await openPeriodSelector(page);
	const current = page.getByRole('option', { name: /7 dias/i });
	await current.focus();

	const next = page.getByRole('option', { name: /Este mês/i });
	await next.click();
	await expect(page).toHaveURL(/set=este_mes/);

	const requests = trackTargetRequests(page, 'ultimos_7_dias');
	await page.getByRole('combobox', { name: 'Selecionar período' }).click();
	await page.getByRole('option', { name: /7 dias/i }).focus();
	await expect.poll(requests).toBe(1);
});

test('initial render does not prefetch unit routes', async ({ page }) => {
	const alternateDashboardRequests: string[] = [];
	page.on('request', (request) => {
		const url = new URL(request.url());
		const isDashboardRoute = [
			'/general',
			'/restaurant',
			'/reservations',
			'/operational',
		].includes(url.pathname);
		const isUnitRoute = /^\/(general|restaurant|reservations|operational)\/[^/]+$/.test(
			url.pathname,
		);
		const isAlternatePreset =
			url.pathname === '/general' &&
			url.searchParams.get('set') !== null &&
			url.searchParams.get('set') !== 'ultimos_7_dias';
		const isAlternateModule = isDashboardRoute && url.pathname !== '/general';
		if (isAlternateModule || isAlternatePreset) {
			alternateDashboardRequests.push(request.url());
		}
		if (isUnitRoute) {
			alternateDashboardRequests.push(request.url());
		}
	});

	await page.goto('/general?menu=general&set=ultimos_7_dias');
	await page.waitForTimeout(500);
	expect(alternateDashboardRequests).toEqual([]);
});
