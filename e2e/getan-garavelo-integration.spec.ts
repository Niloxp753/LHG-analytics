import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import * as accessControl from '../src/lib/access-control';

const repoRoot = path.resolve(__dirname, '..');
const unitSlug = 'getangaravelo';
const backendUnitKey = 'getan_garavelo';

function readRelativeFile(relativePath: string) {
	return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

test.describe('Getan Garavelo integration', () => {
	test('registers the unit in access control and generates module routes', async () => {
		const getanUser = {
			role: 'GERENTE_GERAL',
			unit: 'GETAN_GARAVELO',
		};

		expect(accessControl.normalizeUnit('GETAN_GARAVELO')).toBe(
			'GETAN_GARAVELO',
		);
		expect(accessControl.getUnitLabel('GETAN_GARAVELO')).toBe(
			'Getan Garavelo',
		);
		expect(accessControl.UNIT_OPTIONS).toContainEqual({
			value: 'GETAN_GARAVELO',
			label: 'Getan Garavelo',
		});
		expect(
			(accessControl.UNIT_SLUG_TO_UNIT as Record<string, string>)[unitSlug],
		).toBe('GETAN_GARAVELO');
		expect(
			(accessControl.UNIT_TO_SLUG as Record<string, string>).GETAN_GARAVELO,
		).toBe(unitSlug);
		expect(
			accessControl.buildModuleHref(
				getanUser,
				'company',
				'ultimos_7_dias',
			),
		).toBe('/general/getangaravelo?menu=general&set=ultimos_7_dias');
		expect(
			accessControl.canAccessRoute(
				getanUser,
				'/restaurant/getangaravelo?menu=restaurant&set=ultimos_7_dias',
			),
		).toBe(true);
	});

	test('routes all unit fetches through the dedicated backend client', async () => {
		const apiClient = readRelativeFile('src/http/api-client.ts');
		expect(apiClient).toContain('BACKEND_ENDPOINT_GETAN_GARAVELO');
		expect(apiClient).toContain(
			'export const api_getan_garavelo = ky.create({',
		);
		expect(apiClient).toContain(`case "${backendUnitKey}":`);
		expect(apiClient).toContain('return api_getan_garavelo;');

		for (const relativePath of [
			'src/http/company/getCompanyCustom.ts',
			'src/http/reservations/get-bookings-custom.ts',
			'src/http/restaurant/get-restaurant-custom.ts',
			'src/http/operation/get-governance-custom.ts',
		]) {
			const source = readRelativeFile(relativePath);
			expect(source).toContain('getUnitApiClient(companyKey)');
		}
	});

	test('exposes Getan Garavelo from every dashboard module', async () => {
		for (const modulePath of [
			'general',
			'reservations',
			'restaurant',
			'operational',
		] as const) {
			for (const fileName of ['page.tsx', 'unit-data-section.tsx']) {
				expect(
					fs.existsSync(
						path.join(
							repoRoot,
							'src/app/(dashboard)',
							modulePath,
							'(unidades)',
							unitSlug,
							fileName,
						),
					),
				).toBe(true);
			}
		}
	});

	test('keeps the operational ideal number aligned with Parque Oeste', async () => {
		const source = readRelativeFile(
			`src/app/(dashboard)/operational/(unidades)/${unitSlug}/unit-data-section.tsx`,
		);

		expect(source).toContain('idealNumber={7}');
	});
});
