import { expect, test } from '@playwright/test';

test.describe('buildWeeklyCleaningRows', () => {
	test('returns only the available team sizing shifts in display order', async () => {
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		const { buildWeeklyCleaningRows } = require(
			'../src/app/(dashboard)/operational/_components/kpis-unidade/operational-shifts'
		) as typeof import('../src/app/(dashboard)/operational/_components/kpis-unidade/operational-shifts');

		const rows = buildWeeklyCleaningRows({
			Noite: {
				totalAverageShiftCleaning: 13,
				idealShiftMaid: 3,
				realShiftMaid: 2,
				difference: -1,
			},
			'Manhã': {
				totalAverageShiftCleaning: 39,
				idealShiftMaid: 6,
				realShiftMaid: 5,
				difference: -1,
			},
			Totals: {
				totalAverageDailyWeekCleaning: {
					quarta: 28.5,
					quinta: 24.5,
					sexta: 5.5,
				},
				totalAllAverageShiftCleaning: 52,
				totalIdealShiftMaid: 9,
				totalRealShiftMaid: 7,
				totalDifference: -2,
			},
		});

		expect(rows.map((row: { label: string }) => row.label)).toEqual([
			'Manhã',
			'Noite',
		]);
	});
});
