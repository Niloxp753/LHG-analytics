import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
	const baseURL = testInfo.project.use.baseURL;
	if (!baseURL) throw new Error('Missing baseURL');
	await page.context().addCookies([
		{ name: 'access_token', value: 'playwright', url: `${baseURL}/` },
		{ name: 'refresh_token', value: 'playwright_refresh', url: `${baseURL}/` },
	]);
});

for (const width of [320, 390]) {
	test(`mobile labels stay outside bars and fit at ${width}px`, async ({ page }) => {
		await page.setViewportSize({ width, height: 900 });
		await page.goto('/general?menu=general&set=ultimos_7_dias');
		const chart = page.getByRole('region', { name: 'Faturamento por unidade', exact: true });
		const rows = chart.getByRole('listitem');
		await expect(rows).toHaveCount(5);
		await expect(rows.first()).toContainText('Lush Ipiranga');
		await expect(rows.first()).toContainText('R$\u00a0100,00');
		for (const row of await rows.all()) {
			const bar = await row.getByTestId('comparison-bar').boundingBox();
			expect(bar).not.toBeNull();
			for (const label of await row.locator('span').all()) {
				const bounds = await label.boundingBox();
				expect(bounds).not.toBeNull();
				expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(bar!.y);
				expect(await label.evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(14);
			}
		}
		expect(await chart.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
	});
}

for (const unit of ['liv', 'altana']) {
	test(`remaining operational pies render as full-width columns on desktop for ${unit}`, async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 1000 });
		await page.goto(`/operational/${unit}?menu=operational&set=ultimos_7_dias`);
		const performance = page.getByRole('region', { name: 'Performance de Supervisores', exact: true });
		const cleaning = page.getByRole('region', { name: 'Limpezas por Turno', exact: true });
		for (const chart of [performance, cleaning]) {
			await expect(chart.locator('.apexcharts-bar-series')).toBeVisible();
			await expect(chart.locator('.apexcharts-pie')).toHaveCount(0);
		}
		const first = await performance.boundingBox();
		const second = await cleaning.boundingBox();
		expect(first!.width).toBeGreaterThan(1000);
		expect(second!.width).toBeCloseTo(first!.width, 0);
		expect(second!.y).toBeGreaterThanOrEqual(first!.y + first!.height);
	});
}
