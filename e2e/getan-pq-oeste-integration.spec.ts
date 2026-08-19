import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import * as accessControl from '../src/lib/access-control';

const repoRoot = path.resolve(__dirname, '..');
const unitSlug = 'getanpqoeste';
const backendUnitKey = 'getan_pq_oeste';

function readRelativeFile(relativePath: string) {
	return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

test.describe('Getan Parque Oeste integration', () => {
	test('registers the unit in access control and generates module routes', async () => {
		const getanUser = {
			role: 'GERENTE_GERAL',
			unit: 'GETAN_PQ_OESTE',
		};

		expect(accessControl.normalizeUnit('GETAN_PQ_OESTE')).toBe(
			'GETAN_PQ_OESTE',
		);
		expect(accessControl.getUnitLabel('GETAN_PQ_OESTE')).toBe(
			'Getan Parque Oeste',
		);
		expect(accessControl.UNIT_OPTIONS).toContainEqual({
			value: 'GETAN_PQ_OESTE',
			label: 'Getan Parque Oeste',
		});
		expect(
			(accessControl.UNIT_SLUG_TO_UNIT as Record<string, string>)[unitSlug],
		).toBe('GETAN_PQ_OESTE');
		expect(
			(accessControl.UNIT_TO_SLUG as Record<string, string>).GETAN_PQ_OESTE,
		).toBe(unitSlug);
		expect(
			accessControl.buildModuleHref(
				getanUser,
				'company',
				'ultimos_7_dias',
			),
		).toBe('/general/getanpqoeste?menu=general&set=ultimos_7_dias');
		expect(
			accessControl.canAccessRoute(
				getanUser,
				'/restaurant/getanpqoeste?menu=restaurant&set=ultimos_7_dias',
			),
		).toBe(true);
	});

	test('routes all unit fetches through the dedicated backend client', async () => {
		const apiClient = readRelativeFile('src/http/api-client.ts');
		expect(apiClient).toContain('BACKEND_ENDPOINT_GETAN_PQ_OESTE');
		expect(apiClient).toContain(
			'export const api_getan_pq_oeste = ky.create({',
		);

		for (const relativePath of [
			'src/http/company/getCompanyCustom.ts',
			'src/http/reservations/get-bookings-custom.ts',
			'src/http/restaurant/get-restaurant-custom.ts',
			'src/http/operation/get-governance-custom.ts',
		]) {
			const source = readRelativeFile(relativePath);
			expect(source).toContain(backendUnitKey);
			expect(source).toContain('api_getan_pq_oeste');
		}
	});

	test('exposes Getan Parque Oeste from every dashboard module', async () => {
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

	test('keeps the approved operational ideal number at seven', async () => {
		const source = readRelativeFile(
			`src/app/(dashboard)/operational/(unidades)/${unitSlug}/unit-data-section.tsx`,
		);

		expect(source).toContain('idealNumber={7}');
	});
});
