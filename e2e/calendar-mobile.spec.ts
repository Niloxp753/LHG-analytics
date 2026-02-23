import { expect, test } from '@playwright/test';

function pad2(value: number) {
	return String(value).padStart(2, '0');
}

function getSaoPauloTodayParts(date: Date = new Date()) {
	const formatter = new Intl.DateTimeFormat('en-US', {
		timeZone: 'America/Sao_Paulo',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});

	const parts = formatter.formatToParts(date);
	const lookup = parts.reduce<Record<string, string>>((acc, part) => {
		if (part.type !== 'literal') {
			acc[part.type] = part.value;
		}
		return acc;
	}, {});

	return {
		year: Number(lookup.year),
		month: Number(lookup.month),
		day: Number(lookup.day),
	};
}

test.describe('Task 13 - Calendário Mobile (iPhone)', () => {
	test.beforeEach(async ({ page }, testInfo) => {
		const baseURL = testInfo.project.use.baseURL;
		if (!baseURL) {
			throw new Error('Missing baseURL in Playwright config');
		}

		const cookieUrl = `${new URL(baseURL).origin}/`;
		await page.context().addCookies([
			{
				name: 'access_token',
				value: 'playwright',
				url: cookieUrl,
			},
			{
				name: 'refresh_token',
				value: 'playwright_refresh',
				url: cookieUrl,
			},
		]);
	});

	test('Seleciona intervalo e aplica filtro (URL + dados atualizam)', async ({
		page,
	}) => {
		const today = getSaoPauloTodayParts();
		const endDay = Math.min(7, today.day);

		const expectedStartDate = `01/${pad2(today.month)}/${today.year}`;
		const expectedEndDate = `${pad2(endDay)}/${pad2(today.month)}/${today.year}`;

		await page.goto('/general?menu=general&set=ultimos_7_dias');

		const faturamentoValue = page
			.getByRole('heading', { name: 'Faturamento' })
			.locator('xpath=ancestor::div[contains(@class, "bg-gradient-to-br")][1]')
			.locator('p.text-2xl');
		const initialValueText = (await faturamentoValue.innerText()).trim();

		await page.getByTestId('filter-mobile-trigger').click();
		const sheet = page.getByRole('dialog', { name: /Filtrar por data/i });
		await expect(sheet).toBeVisible();

		await sheet.getByRole('button', { name: 'Data Inicial' }).click();
		const startPopover = sheet.locator('[data-state="open"][data-side]');
		await expect(startPopover.getByRole('grid')).toBeVisible();
		await startPopover.getByRole('gridcell', { name: /^1$/ }).tap();

		await sheet.getByRole('button', { name: 'Data Final' }).click();
		const endPopover = sheet.locator('[data-state="open"][data-side]');
		await expect(endPopover.getByRole('grid')).toBeVisible();
		await endPopover
			.getByRole('gridcell', { name: new RegExp(`^${endDay}$`) })
			.tap();

		const updateButton = sheet.getByRole('button', { name: /Atualizar/i });
		await expect(updateButton).toBeEnabled();
		await updateButton.click();

		await expect.poll(() => new URL(page.url()).searchParams.get('startDate')).toBe(
			expectedStartDate,
		);
		await expect.poll(() => new URL(page.url()).searchParams.get('endDate')).toBe(
			expectedEndDate,
		);

		await page.getByRole('button', { name: 'Close' }).click();

		await expect(faturamentoValue).not.toHaveText(initialValueText);
	});
});

