import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const UNIT_CHART_WRAPPERS = [
	'src/app/(dashboard)/_components/kpis/InvoicingXUnity.tsx',
	'src/app/(dashboard)/_components/kpis/LocationsxUnity.tsx',
	'src/app/(dashboard)/_components/kpis/InvoicingXUnityXTime.tsx',
	'src/app/(dashboard)/_components/kpis/TKTxUnity.tsx',
	'src/app/(dashboard)/_components/kpis/TRevParXUnity.tsx',
	'src/app/(dashboard)/_components/kpis/OccupationXUnity.tsx',
	'src/app/(dashboard)/restaurant/_components/kpis/UnityxRevenue.tsx',
	'src/app/(dashboard)/restaurant/_components/kpis/UnityxSales.tsx',
	'src/app/(dashboard)/restaurant/_components/kpis/UnityxRevenuexTimeAB.tsx',
	'src/app/(dashboard)/restaurant/_components/kpis/UnityxTKTxTime.tsx',
	'src/app/(dashboard)/restaurant/_components/kpis/UnityxRevenuexTimeABPercent.tsx',
	'src/app/(dashboard)/reservations/_components/page-kpis/revenue-by-company.tsx',
	'src/app/(dashboard)/reservations/_components/page-kpis/bookings-by-company.tsx',
	'src/app/(dashboard)/reservations/_components/page-kpis/revenue-by-company-in-time.tsx',
	'src/app/(dashboard)/operational/_components/kpis-geral/total-cleaning-unity.tsx',
	'src/app/(dashboard)/operational/_components/kpis-geral/cleaning-average-unity.tsx',
	'src/app/(dashboard)/operational/_components/kpis-geral/Performance-unity.tsx',
	'src/app/(dashboard)/operational/_components/kpis-geral/morning-cleaning.tsx',
	'src/app/(dashboard)/operational/_components/kpis-geral/afternoon-cleaning.tsx',
	'src/app/(dashboard)/operational/_components/kpis-geral/night-cleaning .tsx',
] as const;

test('all unit comparison wrappers opt into the unit palette', async () => {
	for (const relativePath of UNIT_CHART_WRAPPERS) {
		const source = readFileSync(path.join(process.cwd(), relativePath), 'utf8');
		expect(source, relativePath).toMatch(/palette=['"]units['"]/);
	}
});
