import { expect, test } from '@playwright/test';

test('category labels stay inside their card after loading and resizing', async ({ page, baseURL }) => {
	await page.context().addCookies([
		{ name: 'access_token', value: 'playwright', url: baseURL! },
		{ name: 'refresh_token', value: 'playwright_refresh', url: baseURL! },
	]);
	await page.goto('/general/lushipiranga?menu=general&set=este_mes');
	const section = page.locator('[data-chart-deferred="general-unit-category-revpar"]');
	await section.scrollIntoViewIfNeeded();
	// Exercise extra vertical space as well as narrow/wide viewports.
	await page.addStyleTag({ content: '@media (min-width: 768px) { [data-chart-deferred="general-unit-category-revpar"] > .grid > div:first-child { min-height: 1000px; } }' });
	for (const width of [1440, 390, 1024, 1920]) {
		await page.setViewportSize({ width, height: 900 });
		await expect(section.locator('.apexcharts-yaxis-label').first()).toBeVisible();
		await expect.poll(async () => section.evaluate(el => {
			const columns = Array.from(el.firstElementChild!.children);
			const card = columns[0].querySelector('.bg-gradient-to-br');
			if (!card) return false;
			const bounds = card.getBoundingClientRect();
			const labels = Array.from(card.querySelectorAll('.apexcharts-yaxis-label, .apexcharts-datalabel'));
			return labels.length > 0 && labels.every(label => {
				const row = label.getBoundingClientRect();
				return row.top >= bounds.top && row.bottom <= bounds.bottom;
			});
		})).toBe(true);
		if (width >= 768) {
			await expect.poll(async () => section.evaluate(el => {
				const [left, right] = Array.from(el.firstElementChild!.children).map(c => c.getBoundingClientRect());
				return Math.abs(left.bottom - right.bottom);
			})).toBeLessThanOrEqual(1);
			await expect.poll(async () => section.evaluate(el => {
				const cards = Array.from(el.firstElementChild!.children[1].children);
				if (cards.length !== 2) return false;
				const [top, bottom] = cards.map(card => card.getBoundingClientRect());
				return Math.abs(bottom.top - top.bottom - 20) <= 1 && cards.every(card => {
					const plot = card.querySelector('.apexcharts-canvas');
					if (!plot) return false;
					const bounds = card.getBoundingClientRect();
					const chart = plot.getBoundingClientRect();
					const drawing = plot.querySelector('.apexcharts-grid')?.getBoundingClientRect();
					return chart.height >= bounds.height - 48 && chart.bottom <= bounds.bottom
						&& !!drawing && drawing.height >= chart.height - 160;
				});
			})).toBe(true);
		}
	}
});
