import { expect, test } from '@playwright/test';

test('suite revenue fills a row and Revpar/Trevpar share the next desktop row', async ({ page, baseURL }) => {
	await page.context().addCookies([
		{ name: 'access_token', value: 'playwright', url: baseURL! },
		{ name: 'refresh_token', value: 'playwright_refresh', url: baseURL! },
	]);
	await page.goto('/general/lushipiranga?menu=general&set=este_mes');
	const section = page.locator('[data-chart-deferred="general-unit-category-revpar"]');
	await section.scrollIntoViewIfNeeded();
	const category = section.getByRole('region', { name: 'Faturamento por Categoria de Suíte', exact: true });
	for (const width of [1440, 390, 1024, 1920]) {
		await page.setViewportSize({ width, height: 900 });
		await expect(category).toBeVisible();
		await expect.poll(async () => section.evaluate((el, desktop) => {
			const categoryCard = el.firstElementChild!.children[0];
			const cards = Array.from(el.firstElementChild!.children[1].children);
			if (cards.length !== 2) return false;
			const categoryBounds = categoryCard.getBoundingClientRect();
			const [trevpar, revpar] = cards.map(card => card.getBoundingClientRect());
			const sectionBounds = el.getBoundingClientRect();
			return Math.abs(categoryBounds.width - sectionBounds.width) <= 1
				&& Math.abs(trevpar.top - categoryBounds.bottom - 20) <= 1
				&& (desktop
					? Math.abs(trevpar.top - revpar.top) <= 1 && Math.abs(revpar.left - trevpar.right - 20) <= 1
					: Math.abs(revpar.top - trevpar.bottom - 20) <= 1);
		}, width >= 768)).toBe(true);
		if (width >= 768) {
			await expect(category.locator('.apexcharts-bar-area')).toHaveCount(4);
			await expect.poll(async () => category.locator('.apexcharts-bar-area').evaluateAll(bars => {
				const rects = bars.map(bar => bar.getBoundingClientRect());
				return rects.every((rect, index) => index === 0 || (rect.x > rects[index - 1].x && Math.abs(rect.bottom - rects[0].bottom) < 1));
			})).toBe(true);
		} else {
			await expect(category.getByRole('listitem')).toHaveCount(4);
			expect(await category.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
		}
	}
});
