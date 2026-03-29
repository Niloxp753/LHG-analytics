import { expect, test } from '@playwright/test';
import * as accessControl from '../src/lib/access-control';

test.describe('Altana core integration contract', () => {
	test('registers Altana as a core unit in access control and route generation', async () => {
		const altanaUser = {
			role: 'GERENTE_GERAL',
			unit: 'ALTANA',
		};

		expect(accessControl.normalizeUnit('ALTANA')).toBe('ALTANA');
		expect(accessControl.getUnitLabel('ALTANA')).toBe('Altana');
		expect(accessControl.UNIT_OPTIONS).toContainEqual({
			value: 'ALTANA',
			label: 'Altana',
		});
		expect(accessControl.UNIT_SLUG_TO_UNIT.altana).toBe('ALTANA');
		expect(accessControl.UNIT_TO_SLUG.ALTANA).toBe('altana');
		expect(
			accessControl.buildModuleHref(
				altanaUser,
				'company',
				'ultimos_7_dias',
			),
		).toBe('/general/altana?menu=general&set=ultimos_7_dias');
		expect(
			accessControl.canAccessRoute(
				altanaUser,
				'/restaurant/altana?menu=restaurant&set=ultimos_7_dias',
			),
		).toBe(true);
	});
});
