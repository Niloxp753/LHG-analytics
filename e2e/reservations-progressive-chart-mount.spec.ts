import { expect, test } from '@playwright/test';
import type { APIRequestContext, Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { deferredBlock } from './helpers/deferred-block';

const RESERVATIONS_DIR = path.join(
	process.cwd(),
	'src',
	'app',
	'(dashboard)',
	'reservations',
	'_components',
);

function readSource(fileName: string) {
	return readFileSync(path.join(RESERVATIONS_DIR, fileName), 'utf8');
}

test.describe('Reservations progressive chart structure', () => {
	test('keeps consolidated numbers and company charts immediate', () => {
		const source = readSource('reservations-kpi-content.tsx');
		const firstDeferred = source.indexOf(
			"name='reservations-consolidated-billing-by-period'",
		);

		expect(source).toContain(
			"import DeferredChartMount from '../../_components/charts/deferred-chart-mount'",
		);
		expect(source.indexOf('<BigNumbersReservationPage')).toBeLessThan(firstDeferred);
		expect(source.indexOf('<RevenueByCompany')).toBeLessThan(firstDeferred);
		expect(source.indexOf('<BookingsByCompany')).toBeLessThan(firstDeferred);
		for (const name of [
			'reservations-consolidated-billing-by-period',
			'reservations-consolidated-number-by-period',
			'reservations-consolidated-representation-by-period',
			'reservations-consolidated-ecommerce-billing',
			'reservations-consolidated-ecommerce-reservations',
		]) {
			expect(source).toContain(`name='${name}'`);
			expect(deferredBlock(source, name)).toContain(
				'<DataByCompanyReservationsInTime',
			);
		}
	});

	test('keeps ecommerce heading and big numbers outside deferred charts', () => {
		const source = readSource('reservations-kpi-content.tsx');
		const ecommerceHeading = source.indexOf('Indicadores de E-Commerce');
		const ecommerceNumbers = source.indexOf('<BigNumbersEcommerce');
		const firstEcommerceDeferred = source.indexOf(
			"name='reservations-consolidated-ecommerce-billing'",
		);

		expect(source).toContain('bigNumbersEcommerce');
		expect(ecommerceHeading).toBeGreaterThanOrEqual(0);
		expect(ecommerceNumbers).toBeGreaterThan(ecommerceHeading);
		expect(firstEcommerceDeferred).toBeGreaterThan(ecommerceNumbers);
	});

	test('uses the calculated paired-bar height and keeps the reservation table immediate', () => {
		const source = readSource('standard-unit-data-section.tsx');
		const pairedBlock = deferredBlock(
			source,
			'reservations-unit-payment-channel',
		);

		expect(source).toContain('resolvePairedBarChartHeight(');
		expect(source).toContain('const pairedBarChartHeight = resolvePairedBarChartHeight(');
		expect(pairedBlock).toContain('minHeight={pairedBarChartHeight}');
		expect(pairedBlock).toContain('<InvoicingXTypes');
		expect(pairedBlock).toContain('<InvoicingXChannel');
		expect(pairedBlock).not.toContain('<TableReservs');
		const numberByPeriodBlock = deferredBlock(
			source,
			'reservations-unit-number-by-period',
		);
		const numberByPeriodStart = source.indexOf(numberByPeriodBlock);
		const numberByPeriodEnd =
			numberByPeriodStart + numberByPeriodBlock.length;
		expect(numberByPeriodStart).toBeGreaterThanOrEqual(0);
		expect(source.indexOf('<TableReservs')).toBeGreaterThan(
			numberByPeriodEnd,
		);
		for (const name of [
			'reservations-unit-billing-by-period',
			'reservations-unit-representation-by-period',
			'reservations-unit-number-by-period',
			'reservations-unit-ecommerce-reservations',
			'reservations-unit-ecommerce-billing',
		]) {
			expect(source).toContain(`name="${name}"`);
		}
	});
});

async function readBookingKpiCount(request: APIRequestContext) {
	const response = await request.get('/api/mock-backend/__test__/fetch-counts');
	expect(response.ok()).toBe(true);
	const counts = (await response.json()) as Record<string, number>;
	return Object.entries(counts)
		.filter(([key]) => key.includes('Bookings') && key.includes('date-range'))
		.reduce((total, [, count]) => total + count, 0);
}

async function waitForStableBookingKpiCount(
	page: Page,
	request: APIRequestContext,
): Promise<number> {
	await expect.poll(() => readBookingKpiCount(request)).toBeGreaterThan(0);
	await page.waitForLoadState('networkidle');
	return readBookingKpiCount(request);
}

test.describe('Reservations progressive chart browser behavior', () => {
	test('keeps ecommerce charts stable until they approach the viewport', async ({
		page,
		request,
	}, testInfo) => {
		const baseURL = testInfo.project.use.baseURL;
		if (!baseURL) throw new Error('Missing baseURL in Playwright config');

		await page.setViewportSize({ width: 1365, height: 700 });
		await page.context().addCookies([
			{ name: 'access_token', value: 'playwright', url: `${baseURL}/` },
			{ name: 'refresh_token', value: 'playwright_refresh', url: `${baseURL}/` },
		]);
		await request.delete('/api/mock-backend/__test__/fetch-counts');

		await page.goto('/reservations?menu=reservations&set=ultimos_7_dias');
		await expect(
			page.getByRole('heading', { name: 'Indicadores de E-Commerce' }),
		).toBeVisible();
		await expect(
			page.locator('[data-chart-deferred="reservations-consolidated-ecommerce-billing"]'),
		).toHaveAttribute('data-chart-state', 'placeholder');
		const countBeforeScroll = await waitForStableBookingKpiCount(page, request);

		const finalChart = page.locator(
			'[data-chart-deferred="reservations-consolidated-ecommerce-reservations"]',
		);
		await finalChart.scrollIntoViewIfNeeded();
		await expect(finalChart).toHaveAttribute('data-chart-state', 'mounted');
		expect(await readBookingKpiCount(request)).toBe(countBeforeScroll);
	});
});
