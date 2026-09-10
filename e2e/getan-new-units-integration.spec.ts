import { expect, test } from '@playwright/test';
import { canAccessRoute, normalizeUnit, UNIT_OPTIONS } from '../src/lib/access-control';
import { resolveDashboardCompanyKey } from '../src/lib/dashboard-company';
import { getDefaultSessionHref } from '../src/lib/session/default-route';
import { resolveUnitPaletteFromLabels } from '../src/app/(dashboard)/_components/charts/consolidated-unit-palette';

const units = [
	{
		unit: 'GETAN_INDEPENDENCIA',
		label: 'Getan Independência',
		slug: 'getanindependencia',
		company: 'getan_independencia',
	},
	{
		unit: 'GETAN_NOVO_MUNDO',
		label: 'Getan Novo Mundo',
		slug: 'getannovomundo',
		company: 'getan_novo_mundo',
	},
	{
		unit: 'GETAN_VERA_CRUZ',
		label: 'Getan Vera Cruz',
		slug: 'getanveracruz',
		company: 'getan_vera_cruz',
	},
	{
		unit: 'GETAN_GRID',
		label: 'Getan Grid',
		slug: 'getangrid',
		company: 'getan_grid',
	},
] as const;

const modules = [
	{ path: 'general', endpoint: 'Company/kpis/date-range', role: 'GERENTE_FINANCEIRO' },
	{ path: 'restaurant', endpoint: 'Restaurants/restaurants/date-range', role: 'GERENTE_RESTAURANTE' },
	{ path: 'reservations', endpoint: 'Bookings/bookings/date-range', role: 'GERENTE_RESERVAS' },
	{ path: 'operational', endpoint: 'Governance/kpis/date-range', role: 'GERENTE_OPERACIONAL' },
] as const;

for (const unit of units) {
	test.describe(unit.label, () => {
		test('recognizes the unit when assigning users and resolving login destinations', () => {
			expect(normalizeUnit(unit.label)).toBe(unit.unit);
			expect(resolveDashboardCompanyKey(unit.company)).toBe(unit.company);
			expect(UNIT_OPTIONS).toContainEqual({ value: unit.unit, label: unit.label });
			for (const dashboardModule of modules) {
				expect(getDefaultSessionHref({ role: dashboardModule.role, unit: unit.unit }, 'este_mes'))
					.toBe(`/${dashboardModule.path}/${unit.slug}?menu=${dashboardModule.path}&set=este_mes`);
			}
		});

		test('keeps access restricted to the assigned unit and module', () => {
			for (const dashboardModule of modules) {
				const user = { role: dashboardModule.role, unit: unit.unit };
				expect(canAccessRoute(user, `/${dashboardModule.path}/${unit.slug}`)).toBe(true);
				expect(canAccessRoute(user, `/${dashboardModule.path}/getanpqoeste`)).toBe(false);
				for (const otherUnit of units.filter((candidate) => candidate.unit !== unit.unit)) {
					expect(canAccessRoute(user, `/${dashboardModule.path}/${otherUnit.slug}`)).toBe(false);
				}
				for (const otherModule of modules.filter((candidate) => candidate.path !== dashboardModule.path)) {
					expect(canAccessRoute(user, `/${otherModule.path}/${unit.slug}`)).toBe(false);
				}
			}
		});

		test('keeps the same chart color for display names and backend aliases', () => {
			const aliases = [unit.label, unit.company, unit.slug, unit.label.replace('Getan ', 'Getan - ')];
			const colors = resolveUnitPaletteFromLabels(aliases);
			for (const color of colors) expect(color).toMatch(/^#[0-9a-f]{6}$/i);
			expect(new Set(colors).size).toBe(1);
		});

		for (const dashboardModule of modules) {
			test(`${dashboardModule.path} navigates to the unit and fetches its backend with the selected dates`, async ({ page, request, baseURL }) => {
				if (!baseURL) throw new Error('Missing Playwright baseURL');
				await page.context().addCookies([
					{ name: 'access_token', value: 'playwright', url: baseURL },
					{ name: 'refresh_token', value: 'playwright_refresh', url: baseURL },
				]);
				const search = `menu=${dashboardModule.path}&set=este_mes&startDate=2026-09-01&endDate=2026-09-02`;
				await page.goto(`/${dashboardModule.path}?${search}`);
				await page.getByRole('combobox', { name: 'Selecionar unidade', exact: true }).click();
				await page.getByRole('combobox', { name: 'Buscar unidade' }).fill(unit.label);
				await page.getByRole('option', { name: unit.label, exact: true }).click();
				await expect(page).toHaveURL(`/${dashboardModule.path}/${unit.slug}?${search}`);
				await expect(page.getByRole('heading').filter({ hasText: unit.label })).toBeVisible();

				const requestKey = `unit/${unit.company}/${dashboardModule.endpoint}?startDate=01%2F09%2F2026&endDate=02%2F09%2F2026`;
				await expect.poll(async () => {
					const response = await request.get('/api/mock-backend/__test__/fetch-counts');
					const counts = await response.json();
					return counts[requestKey] ?? 0;
				}).toBeGreaterThan(0);
				if (dashboardModule.path === 'operational') {
					await expect(page.getByText('Número ideal de suítes limpas:')).toContainText('7');
				} else {
					await expect(page.getByRole('heading', { name: /^(Faturamento|Receita de A&B|Receita De Reservas)/i }).first()).toBeVisible();
				}
			});
		}
	});
}
