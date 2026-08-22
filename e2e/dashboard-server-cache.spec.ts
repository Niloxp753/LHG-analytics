import { expect, test } from '@playwright/test';
import type { APIRequestContext, Browser, BrowserContext } from '@playwright/test';

const COUNTS_ENDPOINT = '/api/mock-backend/__test__/fetch-counts';
const FIRST_RANGE_KEY =
	'Company/kpis/date-range?startDate=01%2F01%2F2042&endDate=07%2F01%2F2042';
const SECOND_RANGE_KEY =
	'Company/kpis/date-range?startDate=01%2F02%2F2043&endDate=07%2F02%2F2043';
const BAD_REQUEST_RANGE_KEY =
	'Company/kpis/date-range?startDate=01%2F01%2F2097&endDate=07%2F01%2F2097';
const RETRY_RANGE_KEY =
	'Company/kpis/date-range?startDate=01%2F01%2F2098&endDate=07%2F01%2F2098';
const TIMEOUT_RANGE_KEY =
	'Company/kpis/date-range?startDate=01%2F01%2F2099&endDate=07%2F01%2F2099';

const sessionA = 'session-a';
const refreshA = 'refresh-a';
const sessionB = 'session-b';
const refreshB = 'refresh-b';

async function readCounts(request: APIRequestContext) {
	const response = await request.get(COUNTS_ENDPOINT);
	expect(response.ok()).toBe(true);
	return (await response.json()) as Record<string, number>;
}

async function createSessionContext(
	browser: Browser,
	origin: string,
	accessToken: string,
	refreshToken: string,
) {
	const context = await browser.newContext();
	await context.addCookies([
		{ name: 'access_token', value: accessToken, url: `${origin}/` },
		{ name: 'refresh_token', value: refreshToken, url: `${origin}/` },
	]);
	return context;
}

async function waitForDashboard(
	page: Awaited<ReturnType<BrowserContext['newPage']>>,
) {
	await expect(page.getByTestId('general-kpis-loading')).toHaveCount(0);
}

test('reuses equal inputs per session and separates ranges and sessions', async ({
	browser,
	request,
	baseURL,
}) => {
	if (!baseURL) {
		throw new Error('Missing baseURL in Playwright config');
	}

	const origin = new URL(baseURL).origin;
	const contextA = await createSessionContext(
		browser,
		origin,
		sessionA,
		refreshA,
	);
	const contextB = await createSessionContext(
		browser,
		origin,
		sessionB,
		refreshB,
	);

	try {
		await request.delete(COUNTS_ENDPOINT);
		const pageA = await contextA.newPage();
		const pageB = await contextB.newPage();
		const route =
			'/general?set=custom&startDate=2042-01-01&endDate=2042-01-07';

		await pageA.goto(route);
		await waitForDashboard(pageA);
		await pageA.reload();
		await waitForDashboard(pageA);
		await expect
			.poll(async () => (await readCounts(request))[FIRST_RANGE_KEY] ?? 0)
			.toBe(1);

		await pageB.goto(route);
		await waitForDashboard(pageB);
		await expect
			.poll(async () => (await readCounts(request))[FIRST_RANGE_KEY] ?? 0)
			.toBe(2);

		await pageA.goto(
			'/general?set=custom&startDate=2043-02-01&endDate=2043-02-07',
		);
		await waitForDashboard(pageA);
		await expect
			.poll(async () => (await readCounts(request))[SECOND_RANGE_KEY] ?? 0)
			.toBe(1);
	} finally {
		await contextA.close();
		await contextB.close();
	}
});

test('does not reuse retryable backend failures', async ({
	browser,
	request,
	baseURL,
}) => {
	if (!baseURL) {
		throw new Error('Missing baseURL in Playwright config');
	}

	const origin = new URL(baseURL).origin;
	const context = await createSessionContext(
		browser,
		origin,
		'retry-session',
		'retry-refresh',
	);
	try {
		await request.delete(COUNTS_ENDPOINT);
		const page = await context.newPage();
		const route =
			'/general?set=custom&startDate=2098-01-01&endDate=2098-01-07';

		await page.goto(route);
		await waitForDashboard(page);
		await page.goto(`${route}&attempt=2`);
		await waitForDashboard(page);
		await expect
			.poll(async () => (await readCounts(request))[RETRY_RANGE_KEY] ?? 0)
			.toBe(4);
	} finally {
		await context.close();
	}
});

test('does not reuse non-retryable backend failures', async ({
	browser,
	request,
	baseURL,
}) => {
	if (!baseURL) {
		throw new Error('Missing baseURL in Playwright config');
	}

	const origin = new URL(baseURL).origin;
	const context = await createSessionContext(
		browser,
		origin,
		'bad-request-session',
		'bad-request-refresh',
	);
	try {
		await request.delete(COUNTS_ENDPOINT);
		const page = await context.newPage();
		const route =
			'/general?set=custom&startDate=2097-01-01&endDate=2097-01-07';

		await page.goto(route);
		await waitForDashboard(page);
		await page.goto(`${route}&attempt=2`);
		await waitForDashboard(page);
		await expect
			.poll(async () => (await readCounts(request))[BAD_REQUEST_RANGE_KEY] ?? 0)
			.toBe(2);
	} finally {
		await context.close();
	}
});

test('does not reuse timed-out backend failures', async ({
	browser,
	request,
	baseURL,
}) => {
	if (!baseURL) {
		throw new Error('Missing baseURL in Playwright config');
	}

	const origin = new URL(baseURL).origin;
	const context = await createSessionContext(
		browser,
		origin,
		'timeout-session',
		'timeout-refresh',
	);
	try {
		await request.delete(COUNTS_ENDPOINT);
		const page = await context.newPage();
		const route =
			'/general?set=custom&startDate=2099-01-01&endDate=2099-01-07';

		await page.goto(route);
		await waitForDashboard(page);
		await page.goto(`${route}&attempt=2`);
		await waitForDashboard(page);
		await expect
			.poll(async () => (await readCounts(request))[TIMEOUT_RANGE_KEY] ?? 0)
			.toBe(2);
	} finally {
		await context.close();
	}
});
