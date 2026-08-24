import { expect, test, type Page } from '@playwright/test';

const COUNTS_ENDPOINT = '/api/mock-backend/__test__/fetch-counts';
const AUTH_COUNTS_ENDPOINT = '/api/me?__test=read-auth-counts';
const RESET_AUTH_COUNTS_ENDPOINT = '/api/me?__test=reset-auth-counts';
const GENERAL_ROUTE = '/general?menu=general&set=ultimos_7_dias';
const SENSITIVE_ID_PATTERN = process.env.PW_SENSITIVE_ID_PATTERN;

type BackendCounts = Record<string, number>;

type DashboardRequest = {
	pathname: string;
	query: URLSearchParams;
	prefetch: string | null;
	url: string;
};

function trackDashboardRequests(page: Page) {
	const requests: DashboardRequest[] = [];

	page.on('request', (request) => {
		const url = new URL(request.url());
		if (
			!['/general', '/restaurant', '/reservations', '/operational'].includes(
				url.pathname,
			)
		) {
			return;
		}

		const query = new URLSearchParams(url.search);
		if (!query.has('_rsc')) return;

		const prefetch = request.headers()['next-router-prefetch'] ?? null;
		query.delete('_rsc');
		requests.push({
			pathname: url.pathname,
			query,
			prefetch,
			url: request.url(),
		});
	});

	return {
		clear() {
			requests.length = 0;
		},
		matching(pathname: string, params: Record<string, string>) {
			return requests.filter((request) => {
				if (request.pathname !== pathname) return false;
				return Object.entries(params).every(
					([key, value]) => request.query.get(key) === value,
				);
			});
		},
		all() {
			return [...requests];
		},
	};
}

function countWithPrefix(counts: BackendCounts, prefix: string) {
	return Object.entries(counts)
		.filter(([key]) => key.startsWith(prefix))
		.reduce((total, [, count]) => total + count, 0);
}

async function resetCounters(page: Page) {
	const backendResponse = await page.request.delete(COUNTS_ENDPOINT);
	expect(backendResponse.ok()).toBe(true);
	const authResponse = await page.request.delete(RESET_AUTH_COUNTS_ENDPOINT);
	expect(authResponse.ok()).toBe(true);
}

async function readBackendCounts(page: Page) {
	const response = await page.request.get(COUNTS_ENDPOINT);
	expect(response.ok()).toBe(true);
	return (await response.json()) as BackendCounts;
}

async function readAuthCounts(page: Page) {
	const response = await page.request.get(AUTH_COUNTS_ENDPOINT);
	expect(response.ok()).toBe(true);
	return (await response.json()) as { me: number };
}

async function expectNoSpeculativeDynamicWork(page: Page) {
	const authCounts = await readAuthCounts(page);
	const backendCounts = await readBackendCounts(page);

	expect(authCounts).toEqual({ me: 0 });
	expect(countWithPrefix(backendCounts, 'consolidated/')).toBe(0);
	expect(countWithPrefix(backendCounts, 'unit/')).toBe(0);
	const serializedCounts = JSON.stringify({ authCounts, backendCounts });
	expect(serializedCounts).not.toMatch(/Playwright|access_token|authorization/i);
	if (SENSITIVE_ID_PATTERN) {
		expect(serializedCounts).not.toMatch(new RegExp(SENSITIVE_ID_PATTERN, 'i'));
	}
}

async function prepareGeneral(
	page: Page,
	tracker: ReturnType<typeof trackDashboardRequests>,
) {
	await page.goto(GENERAL_ROUTE, { waitUntil: 'load' });
	await expect(
		page.getByRole('heading', { name: /Visão Geral/i }),
	).toBeVisible();
	// Let delayed requests from the initial route settle before resetting counters.
	await page.waitForTimeout(750);
	await resetCounters(page);
	tracker.clear();
}

async function addPlaywrightCookies(page: Page) {
	const baseURL = test.info().project.use.baseURL;
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
}

function expectShellPrefetches(
	tracker: ReturnType<typeof trackDashboardRequests>,
	pathname: string,
	params: Record<string, string>,
) {
	const targetRequests = tracker.matching(pathname, params);
	// Next 16.3 may issue a tree request and a shell request for one public
	// router.prefetch call. Both are shell work and carry a prefetch marker.
	expect(targetRequests.length).toBeGreaterThan(0);
	expect(targetRequests.every((request) => request.prefetch !== null)).toBe(true);
}

test.describe('partial prefetch dynamic boundary', () => {
	test.beforeEach(async ({ page }) => {
		await addPlaywrightCookies(page);
	});

	test('restaurant hover prefetches shell only, then click owns dynamic work', async ({
		page,
	}) => {
		const tracker = trackDashboardRequests(page);
		await prepareGeneral(page, tracker);

		const restaurantLink = page.getByRole('link', { name: /Restaurantes/i });
		await expect(restaurantLink).toBeVisible();
		await restaurantLink.hover();
		await expect
			.poll(() =>
				tracker.matching('/restaurant', {
					menu: 'restaurant',
					set: 'ultimos_7_dias',
				}).length,
			)
			.toBeGreaterThan(0);

		expectShellPrefetches(tracker, '/restaurant', {
			menu: 'restaurant',
			set: 'ultimos_7_dias',
		});
		await expectNoSpeculativeDynamicWork(page);

		await restaurantLink.click();
		await expect(page).toHaveURL(
			/\/restaurant\?menu=restaurant&set=ultimos_7_dias/,
		);
		await expect(
			page.getByRole('heading', { name: /Restaurantes/i }),
		).toBeVisible();
		await expect.poll(async () => (await readAuthCounts(page)).me).toBe(1);
		await expect
			.poll(async () =>
				countWithPrefix(
					await readBackendCounts(page),
					'consolidated/Restaurant/kpis/date-range',
				),
			)
			.toBe(1);
	});

	test.fixme(
		'Next 16.3 does not reproducibly emit a nested unit shell request in the production fixture',
		async ({ page }) => {
			// One earlier probe observed a nested shell, but the focused production
			// suite did not reproduce it. Keep this as an explicit evidence gap.
		const tracker = trackDashboardRequests(page);
		await prepareGeneral(page, tracker);

		await page.getByRole('combobox', { name: 'Selecionar unidade' }).click();
		const target = page.getByRole('option', { name: /Getan Parque Oeste/i });
		await target.hover();
		await expect
			.poll(() =>
				tracker.matching('/general/getanpqoeste', {
					menu: 'general',
					set: 'ultimos_7_dias',
				}).length,
			)
			.toBeGreaterThan(0);

		expectShellPrefetches(tracker, '/general/getanpqoeste', {
			menu: 'general',
			set: 'ultimos_7_dias',
		});
		await expectNoSpeculativeDynamicWork(page);
		},
	);

	test.fixme(
		'Next 16.3 does not emit a target shell request for PeriodSelector intent in the production fixture',
		async ({ page }) => {
			// Evidence from the isolated production run: hovering/focusing the
			// CommandItem emitted only root RSC requests, not /general?set=este_mes.
			const tracker = trackDashboardRequests(page);
			await prepareGeneral(page, tracker);
			await page.getByRole('combobox', { name: 'Selecionar período' }).click();
			const target = page.getByRole('option', { name: /Este mês/i });
			await target.hover();
			await page.waitForTimeout(300);
			expectShellPrefetches(tracker, '/general', {
				menu: 'general',
				set: 'este_mes',
			});
		},
	);
});
