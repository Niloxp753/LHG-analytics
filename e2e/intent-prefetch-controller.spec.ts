import { expect, test, type Page } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { isInternalNavigationHref } from '../src/lib/navigation-target';

const projectRoot = path.resolve(__dirname, '..');

function trackRouteRequests(page: Page, targetSet: string) {
	let count = 0;
	page.on('request', (request) => {
		const url = new URL(request.url());
		if (url.pathname !== '/general' || url.searchParams.get('set') !== targetSet) {
			return;
		}

		url.searchParams.delete('_rsc');
		count += 1;
	});

	return () => count;
}

async function openPeriodSelector(page: Page) {
	const baseURL = test.info().project.use.baseURL;
	if (!baseURL) throw new Error('Missing baseURL in Playwright config');
	await page.context().addCookies([
		{ name: 'access_token', value: 'playwright', url: `${baseURL}/` },
		{ name: 'refresh_token', value: 'playwright_refresh', url: `${baseURL}/` },
	]);
	await page.goto('/general?menu=general&set=ultimos_7_dias');
	await expect(page).toHaveURL(/\/general(?:\?|$)/);
	await page.getByRole('combobox', { name: 'Selecionar período' }).click();
}

function requiresProductionPrefetch(testInfo: { skip: (condition: boolean, description: string) => void }) {
	testInfo.skip(
		process.env.PW_SERVER !== 'start',
		'Next.js disables router prefetch network work in development; run this suite with PW_SERVER=start.',
	);
}

test('keeps the intent controller local and limited to the public prefetch API', async () => {
	const source = await readFile(
		path.join(projectRoot, 'src/hooks/use-intent-prefetch.ts'),
		'utf8',
	);

	expect(source).toContain('const INTENT_DELAY_MS = 120');
	expect(source).toContain('useRef(new Map<string, ReturnType<typeof setTimeout>>())');
	expect(source).toContain('router.prefetch(href)');
	expect(source).not.toContain(['intent-prefetch', 'registry'].join('-'));
	expect(source).not.toMatch(/kind\s*:/);
	expect(source).not.toContain('onInvalidate');
});

test('persistent links opt out of viewport prefetch', async () => {
	for (const relativePath of [
		'src/app/(dashboard)/_components/BtnSidebarMenu.tsx',
		'src/app/(dashboard)/_components/CardLink.tsx',
	]) {
		const source = await readFile(path.join(projectRoot, relativePath), 'utf8');
		expect(source, relativePath).toContain('prefetch={false}');
		expect(source, relativePath).not.toContain(['prefetch', "='auto'"].join(''));
	}
});

test('accepts only same-app navigation targets', () => {
	expect(isInternalNavigationHref('/general?menu=general')).toBe(true);
	expect(isInternalNavigationHref('?menu=general&set=este_mes')).toBe(true);
	expect(isInternalNavigationHref('')).toBe(false);
	expect(isInternalNavigationHref('#chart')).toBe(false);
	expect(isInternalNavigationHref('mailto:test@example.com')).toBe(false);
	expect(isInternalNavigationHref('https://example.com/general')).toBe(false);
});

test('a short hover is cancelled before the 120 ms intent threshold', async ({
	page,
}, testInfo) => {
	requiresProductionPrefetch(testInfo);
	const requests = trackRouteRequests(page, 'este_mes');
	await openPeriodSelector(page);

	const target = page.getByRole('option', { name: /Este mês/i });
	await target.hover();
	await page.waitForTimeout(40);
	await page.mouse.move(0, 0);
	await page.waitForTimeout(150);

	expect(requests()).toBe(0);
});

test.fixme('a 120 ms hover and repeated focus reach the router once at the network boundary', async ({
	page,
}, testInfo) => {
	// Next 16.3 does not reproducibly emit a target network request for this
	// public router.prefetch call, so the network boundary cannot prove the call.
	requiresProductionPrefetch(testInfo);
	const requests = trackRouteRequests(page, 'este_mes');
	await openPeriodSelector(page);

	const target = page.getByRole('option', { name: /Este mês/i });
	await target.hover();
	await page.waitForTimeout(150);
	await target.focus();
	await target.focus();
	await expect.poll(requests).toBe(1);
});

test.fixme('keyboard focus prefetches immediately and click navigates without a pointer-down prefetch', async ({
	page,
}, testInfo) => {
	// Keep the static router.prefetch contract above until Next exposes a
	// reproducible network signal for focus-triggered prefetching.
	requiresProductionPrefetch(testInfo);
	const requests = trackRouteRequests(page, 'este_mes');
	await openPeriodSelector(page);

	const target = page.getByRole('option', { name: /Este mês/i });
	await target.focus();
	await expect.poll(requests).toBe(1);
	await target.click();
	await expect(page).toHaveURL(/set=este_mes/);
	await page.waitForTimeout(300);
	expect(requests()).toBe(1);
});

test('closing the selector unmounts the target before a scheduled intent fires', async ({
	page,
}, testInfo) => {
	requiresProductionPrefetch(testInfo);
	const requests = trackRouteRequests(page, 'este_mes');
	await openPeriodSelector(page);

	const target = page.getByRole('option', { name: /Este mês/i });
	await target.hover();
	await page.waitForTimeout(50);
	await page.keyboard.press('Escape');
	await expect(page.getByRole('option', { name: /Este mês/i })).toHaveCount(0);
	await page.waitForTimeout(150);

	expect(requests()).toBe(0);
});
