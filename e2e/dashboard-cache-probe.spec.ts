import { expect, test } from '@playwright/test';

const COUNTS_ENDPOINT = '/api/mock-backend/__test__/fetch-counts';
const DELAYED_RANGE_KEY =
	'Company/kpis/date-range?startDate=01%2F04%2F2026&endDate=07%2F04%2F2026';

test('completes a cached fill that crosses the dev probe threshold', async ({
	page,
	request,
	baseURL,
}) => {
	if (!baseURL) throw new Error('Missing baseURL in Playwright config');
	const origin = new URL(baseURL).origin;
	await page.context().addCookies([
		{ name: 'access_token', value: 'probe-access', url: `${origin}/` },
		{ name: 'refresh_token', value: 'probe-refresh', url: `${origin}/` },
	]);
	await request.delete(COUNTS_ENDPOINT);

	const startedAt = Date.now();

	await page.goto(
		'/general?set=custom&startDate=2026-04-01&endDate=2026-04-07',
		{ waitUntil: 'domcontentloaded' },
	);
	await expect(page).toHaveURL(/\/general(?:\?|$)/);
	await expect(page.getByTestId('general-kpis-loading')).toHaveCount(0);
	const countsResponse = await request.get(COUNTS_ENDPOINT);
	expect(countsResponse.ok()).toBe(true);
	const counts = (await countsResponse.json()) as Record<string, number>;
	// Next 16.3.1 re-executes a cache fill in an isolated worker after 10 s
	// without a chunk: one main fill plus one diagnostic probe.
	expect(counts[DELAYED_RANGE_KEY]).toBe(2);

	// The fixture waits 12 s. A deadlocked cache fill would wait for Next's
	// development render timeout instead of completing with the backend result.
	const elapsed = Date.now() - startedAt;
	expect(elapsed).toBeGreaterThanOrEqual(11_500);
	expect(elapsed).toBeLessThan(25_000);
});
