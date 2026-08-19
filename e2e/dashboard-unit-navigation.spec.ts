import { expect, test } from '@playwright/test';
import { UNIT_VALUES } from '../src/lib/access-control';

const landingPages = [
	'/general?menu=general&set=ultimos_7_dias',
	'/restaurant?menu=restaurant&set=ultimos_7_dias',
	'/reservations?menu=reservations&set=ultimos_7_dias',
	'/operational?menu=operational&set=ultimos_7_dias',
];

test.describe('Dashboard unit navigation', () => {
	test.beforeEach(async ({ page }, testInfo) => {
		const baseURL = testInfo.project.use.baseURL;
		if (!baseURL) {
			throw new Error('Missing baseURL in Playwright config');
		}

		await page.context().addCookies([
			{
				name: 'access_token',
				value: 'playwright',
				url: `${new URL(baseURL).origin}/`,
			},
			{
				name: 'refresh_token',
				value: 'playwright_refresh',
				url: `${new URL(baseURL).origin}/`,
			},
		]);
	});

	test('defaults to the seven-day period and changes presets from one selector', async ({
		page,
	}) => {
		await page.goto('/general?menu=general');

		const periodSelector = page.getByRole('combobox', {
			name: 'Selecionar período',
		});
		await expect(periodSelector).toContainText('Últimos 7 dias');
		await periodSelector.click();
		await page.getByRole('option', { name: 'Este mês' }).click();

		await expect(page).toHaveURL('/general?menu=general&set=este_mes');
	});

	test('keeps selectors on the left and date filters on the right', async ({
		page,
	}) => {
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.goto('/general?menu=general&set=ultimos_7_dias');

		const toolbar = page.getByRole('region', {
			name: 'Filtros do dashboard',
		});
		const periodSelector = toolbar.getByRole('combobox', {
			name: 'Selecionar período',
		});
		const unitSelector = toolbar.getByRole('combobox', {
			name: 'Selecionar unidade',
		});
		const dateControls = [
			toolbar.locator('#header-start-date button'),
			toolbar.locator('#header-end-date button'),
			toolbar.getByRole('button', { name: 'Atualizar' }),
		];
		const controls = [periodSelector, unitSelector, ...dateControls];

		const boxes = await Promise.all(
			controls.map(async (control) => {
				await expect(control).toBeVisible();
				return control.boundingBox();
			}),
		);
		const bottoms = boxes.map((box) => (box?.y ?? 0) + (box?.height ?? 0));
		const selectorGap =
			(boxes[1]?.x ?? 0) -
			((boxes[0]?.x ?? 0) + (boxes[0]?.width ?? 0));
		const middleGap =
			(boxes[2]?.x ?? 0) -
			((boxes[1]?.x ?? 0) + (boxes[1]?.width ?? 0));
		const dateGaps = boxes.slice(3).map((box, index) => {
			const previousBox = boxes[index + 2];
			return (
				(box?.x ?? 0) -
				((previousBox?.x ?? 0) + (previousBox?.width ?? 0))
			);
		});

		expect(Math.max(...bottoms) - Math.min(...bottoms)).toBeLessThanOrEqual(2);
		expect(selectorGap).toBeLessThanOrEqual(12);
		expect(middleGap).toBeGreaterThanOrEqual(80);
		expect(Math.max(...dateGaps)).toBeLessThanOrEqual(12);
	});

	test('uses the same period selector in the mobile date filter', async ({
		page,
	}) => {
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto('/general?menu=general');
		await page.getByRole('button', { name: 'Abrir filtro por data' }).click();

		await expect(
			page.getByRole('combobox', { name: 'Selecionar período' }),
		).toContainText('Últimos 7 dias');
	});

	test('shows pointer feedback on enabled selector controls', async ({ page }) => {
		await page.goto('/general?menu=general&set=ultimos_7_dias');

		const periodSelector = page.getByRole('combobox', {
			name: 'Selecionar período',
		});
		const unitSelector = page.getByRole('combobox', {
			name: 'Selecionar unidade',
		});

		await expect(periodSelector).toHaveCSS('cursor', 'pointer');
		await expect(unitSelector).toHaveCSS('cursor', 'pointer');
		await unitSelector.click();
		await expect(page.getByRole('option').first()).toHaveCSS(
			'cursor',
			'pointer',
		);
	});

	test('uses a subtle dark scrollbar without a divider above the unit list', async ({
		page,
	}) => {
		await page.goto('/general?menu=general&set=ultimos_7_dias');
		await page
			.getByRole('combobox', { name: 'Selecionar unidade' })
			.click();

		const searchWrapper = page
			.getByRole('combobox', { name: 'Buscar unidade' })
			.locator('..');
		const commandList = page.locator('[cmdk-list]');

		await expect(searchWrapper).toHaveCSS('border-bottom-width', '0px');
		await expect(commandList).toHaveCSS('scrollbar-width', 'thin');
		await expect(commandList).toHaveCSS(
			'scrollbar-color',
			'rgb(82, 82, 91) rgba(0, 0, 0, 0)',
		);
	});

	test('exposes every registered unit from the compact selector on all landing pages', async ({
		page,
	}) => {
		for (const href of landingPages) {
			await page.goto(href);

			const trigger = page.getByRole('combobox', {
				name: 'Selecionar unidade',
			});
			await expect(trigger).toBeVisible();
			await trigger.click();
			await expect(page.getByRole('option')).toHaveCount(UNIT_VALUES.length);
			await page.keyboard.press('Escape');
		}
	});

	test('filters units and preserves the selected period when navigating', async ({
		page,
	}) => {
		await page.goto(
			'/general?menu=general&set=este_mes&startDate=2026-08-01&endDate=2026-08-10',
		);

		await page
			.getByRole('combobox', { name: 'Selecionar unidade' })
			.click();
		await page.getByRole('combobox', { name: 'Buscar unidade' }).fill('parque');

		const option = page.getByRole('option', { name: /Getan Parque Oeste/i });
		await expect(option).toBeVisible();
		await expect(page.getByRole('option')).toHaveCount(1);
		await option.click();

		await expect(page).toHaveURL(
			'/general/getanpqoeste?menu=general&set=este_mes&startDate=2026-08-01&endDate=2026-08-10',
		);
	});
});
