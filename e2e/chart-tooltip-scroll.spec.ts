import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';

for (const height of [900, 480]) {
	test(`long chart tooltip scrolls internally at viewport height ${height}`, async ({ page }) => {
		await page.setViewportSize({ width: 1440, height });
		await page.setContent('<main style="padding:40px 100px 1200px"><div id="chart"></div></main>');
		await page.addStyleTag({ content: readFileSync(path.join(process.cwd(), 'src/app/globals.css'), 'utf8') });
		await page.addScriptTag({ path: path.join(process.cwd(), 'node_modules/apexcharts/dist/apexcharts.min.js') });
		await page.evaluate(async () => {
			// Use the installed chart library so real mouse-out and wheel behavior are exercised.
			const ApexCharts = (window as unknown as { ApexCharts: new (element: Element, options: unknown) => { render(): Promise<void> } }).ApexCharts;
			await new ApexCharts(document.querySelector('#chart')!, {
				chart: { type: 'line', height: 300, animations: { enabled: false }, toolbar: { show: false } },
				series: Array.from({ length: 12 }, (_, index) => ({ name: `Unidade ${index + 1}`, data: [index + 10, index + 20, index + 15] })),
				xaxis: { categories: ['01/09/2026', '02/09/2026', '03/09/2026'] },
				markers: { size: 4 },
				tooltip: { shared: true, intersect: false },
			}).render();
		});
		const documentHeight = await page.evaluate(() => document.documentElement.scrollHeight);
		const plot = (await page.locator('.apexcharts-grid').boundingBox())!;
		await page.mouse.move(plot.x + plot.width / 2, plot.y + plot.height / 2);
		const tooltip = page.locator('.apexcharts-tooltip');
		await expect(tooltip).toHaveCSS('opacity', '1');
		expect((await tooltip.boundingBox())!.height).toBeLessThanOrEqual(Math.min(182, height / 2));
		const visibleItems = await tooltip.evaluate(el => {
			const bounds = el.getBoundingClientRect();
			return Array.from(el.querySelectorAll('.apexcharts-tooltip-series-group')).filter(item => {
				const row = item.getBoundingClientRect();
				return row.height > 0 && row.top >= bounds.top && row.bottom <= bounds.bottom;
			}).length;
		});
		expect(visibleItems).toBe(4);
		expect(await tooltip.evaluate(el => el.scrollHeight > el.clientHeight)).toBe(true);
		const bounds = (await tooltip.boundingBox())!;
		await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + Math.min(80, bounds.height / 2));
		await expect(tooltip).toHaveCSS('opacity', '1');
		const scrollY = await page.evaluate(() => window.scrollY);
		await page.mouse.wheel(0, 300);
		await expect.poll(() => tooltip.evaluate(el => el.scrollTop)).toBeGreaterThan(0);
		await page.mouse.wheel(0, 2000);
		await expect.poll(() => tooltip.evaluate(el => Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop))).toBeLessThanOrEqual(1);
		await page.mouse.wheel(0, 500);
		await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
		await expect(tooltip).toHaveCSS('opacity', '1');
		expect(await page.evaluate(() => window.scrollY)).toBe(scrollY);
		expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBe(documentHeight);
		await page.mouse.move(10, 10);
		await expect(tooltip).toHaveCSS('opacity', '0');
	});
}
