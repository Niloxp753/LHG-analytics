import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const CONSOLIDATED_PAGES = [
	{
		file: ['general', 'page.tsx'],
		actionCall: 'getGeneralPageData(',
		localResolver: 'resolveGeneralData(',
	},
	{
		file: ['operational', 'page.tsx'],
		actionCall: 'getOperationalPageData(',
		localResolver: 'resolveOperationalData(',
	},
	{
		file: ['restaurant', 'page.tsx'],
		actionCall: 'getRestaurantPageData(',
		localResolver: 'resolveRestaurantData(',
	},
	{
		file: ['reservations', 'page.tsx'],
		actionCall: 'getReservationPageData(',
		localResolver: 'resolveReservationsData(',
	},
] as const;

test.describe('Consolidated dashboard streaming structure', () => {
	for (const page of CONSOLIDATED_PAGES) {
		test(`${page.file[0]} page streams KPI content from a nested server component`, async () => {
			const source = readFileSync(
				path.join(process.cwd(), 'src', 'app', '(dashboard)', ...page.file),
				'utf8',
			);

			expect(source).toContain('Suspense');
			expect(source).not.toContain(page.actionCall);
			expect(source).not.toContain('const dataPromise =');
			expect(source).not.toContain(page.localResolver);
		});
	}
});
