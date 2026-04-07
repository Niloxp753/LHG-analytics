import { expect, test } from '@playwright/test';

test.describe('buildShiftCleaningPieData', () => {
	test('builds donut totals from direct category series data', async () => {
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		const { buildShiftCleaningPieData } = require(
			'../src/app/(dashboard)/operational/_components/kpis-unidade/shift-cleaning-pie-data'
		) as typeof import('../src/app/(dashboard)/operational/_components/kpis-unidade/shift-cleaning-pie-data');

		expect(
			buildShiftCleaningPieData({
				categories: ['Manh\u00e3', 'Noite', 'Terceirizado'],
				series: [78, 39, 57],
			}),
		).toEqual({
			error: undefined,
			labels: ['Manh\u00e3', 'Noite', 'Terceirizado'],
			series: [78, 39, 57],
		});
	});

	test('builds donut totals from normalized shift cleaning data', async () => {
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		const { buildShiftCleaningPieData } = require(
			'../src/app/(dashboard)/operational/_components/kpis-unidade/shift-cleaning-pie-data'
		) as typeof import('../src/app/(dashboard)/operational/_components/kpis-unidade/shift-cleaning-pie-data');

		expect(
			buildShiftCleaningPieData({
				categories: ['22/03', '23/03'],
				Manhã: [{ name: 'Lush Ipiranga', data: [10, 11] }],
				Tarde: [{ name: 'Lush Ipiranga', data: [7, 8] }],
				Noite: [{ name: 'Lush Ipiranga', data: [4, 5] }],
			}),
		).toEqual({
			error: undefined,
			labels: ['Manhã', 'Tarde', 'Noite'],
			series: [21, 15, 9],
		});
	});

	test('builds donut totals from legacy liv shift cleaning data', async () => {
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		const { buildShiftCleaningPieData } = require(
			'../src/app/(dashboard)/operational/_components/kpis-unidade/shift-cleaning-pie-data'
		) as typeof import('../src/app/(dashboard)/operational/_components/kpis-unidade/shift-cleaning-pie-data');

		expect(
			buildShiftCleaningPieData({
				categories: ['22/03', '23/03'],
				series: [
					{ name: 'Manhã', data: [3, 4] },
					{ name: 'Tarde', data: [2, 3] },
					{ name: 'Noite', data: [1, 2] },
				],
			}),
		).toEqual({
			error: undefined,
			labels: ['Manhã', 'Tarde', 'Noite'],
			series: [7, 5, 3],
		});
	});

	test('returns an error state when shift cleaning data is missing', async () => {
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		const { buildShiftCleaningPieData } = require(
			'../src/app/(dashboard)/operational/_components/kpis-unidade/shift-cleaning-pie-data'
		) as typeof import('../src/app/(dashboard)/operational/_components/kpis-unidade/shift-cleaning-pie-data');

		expect(buildShiftCleaningPieData(undefined)).toEqual({
			error: 'Não foi possível carregar os dados.',
			labels: ['Manhã', 'Tarde', 'Noite'],
			series: null,
		});
	});
});
