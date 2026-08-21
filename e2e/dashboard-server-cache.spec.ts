import { expect, test } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';

const COUNTS_ENDPOINT = '/api/mock-backend/__test__/fetch-counts';
const FIRST_RANGE_KEY =
	'Company/kpis/date-range?startDate=01%2F01%2F2040&endDate=07%2F01%2F2040';
const SECOND_RANGE_KEY =
	'Company/kpis/date-range?startDate=01%2F02%2F2040&endDate=07%2F02%2F2040';

async function readCounts(request: APIRequestContext) {
	const response = await request.get(COUNTS_ENDPOINT);
	expect(response.ok()).toBe(true);
	return (await response.json()) as Record<string, number>;
}

test('reuses KPI data for equal inputs and separates different ranges', async ({
	page,
	request,
	baseURL,
}) => {
	if (!baseURL) {
		throw new Error('Missing baseURL in Playwright config');
	}

	const origin = new URL(baseURL).origin;
	await page.context().addCookies([
		{ name: 'access_token', value: 'playwright', url: `${origin}/` },
		{
			name: 'refresh_token',
			value: 'playwright_refresh',
			url: `${origin}/`,
		},
	]);
	await request.delete(COUNTS_ENDPOINT);

	const firstRange =
		'/general?set=custom&startDate=2040-01-01&endDate=2040-01-07';
	await page.goto(firstRange);
	await expect(page.getByTestId('general-kpis-loading')).toHaveCount(0);
	await page.reload();
	await expect(page.getByTestId('general-kpis-loading')).toHaveCount(0);

	const firstCounts = await readCounts(request);
	expect(firstCounts[FIRST_RANGE_KEY]).toBe(1);

	await page.goto(
		'/general?set=custom&startDate=2040-02-01&endDate=2040-02-07',
	);
	await expect(page.getByTestId('general-kpis-loading')).toHaveCount(0);

	const secondCounts = await readCounts(request);
	expect(secondCounts[SECOND_RANGE_KEY]).toBe(1);
});
