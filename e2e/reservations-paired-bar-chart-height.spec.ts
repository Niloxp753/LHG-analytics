import { expect, test } from '@playwright/test';
import { resolvePairedBarChartHeight } from '../src/app/(dashboard)/reservations/_components/paired-bar-chart-height';

test('uses one compact height based on the larger category group', () => {
	const height = resolvePairedBarChartHeight(
		['Dinheiro'],
		['Guia Programada', 'Guia Go', 'Direta'],
	);

	expect(height).toBe(280);
});

test('grows the shared height when the internal content grows', () => {
	const compactHeight = resolvePairedBarChartHeight(
		['Dinheiro'],
		['Guia Programada', 'Guia Go', 'Direta'],
	);
	const expandedHeight = resolvePairedBarChartHeight(
		['Dinheiro'],
		Array.from({ length: 8 }, (_, index) => `Canal ${index + 1}`),
	);

	expect(expandedHeight).toBeGreaterThan(compactHeight);
});

test('preserves a readable minimum when both groups are empty', () => {
	expect(resolvePairedBarChartHeight([], [])).toBe(240);
});
