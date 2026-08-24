import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const DASHBOARD_DIR = path.join(process.cwd(), 'src', 'app', '(dashboard)');

function readDashboardFile(...segments: string[]) {
	return readFileSync(path.join(DASHBOARD_DIR, ...segments), 'utf8');
}

test('keeps 20px between chart blocks and 8px around chart-local selects', () => {
	const generalContent = readDashboardFile(
		'general',
		'_components',
		'general-kpi-content.tsx',
	);
	const generalUnitContent = readDashboardFile(
		'general',
		'_components',
		'unit-data-content.tsx',
	);
	const operationalContent = readDashboardFile(
		'operational',
		'_components',
		'operational-kpi-content.tsx',
	);
	const reservationsContent = readDashboardFile(
		'reservations',
		'_components',
		'reservations-kpi-content.tsx',
	);
	const restaurantContent = readDashboardFile(
		'restaurant',
		'_components',
		'restaurant-kpi-content.tsx',
	);

	for (const source of [
		generalContent,
		generalUnitContent,
		operationalContent,
		reservationsContent,
		restaurantContent,
	]) {
		expect(source).toContain('gap-5');
	}

	const categoryChart = readDashboardFile(
		'_components',
		'kpis',
		'OccupationCasaLush.tsx',
	);
	expect(
		categoryChart.match(/className='flex w-full flex-col gap-2'/g) ?? [],
	).toHaveLength(2);
});

test('releases placeholder height after a chart mounts', () => {
	const boundary = readDashboardFile(
		'_components',
		'charts',
		'deferred-chart-mount.tsx',
	);

	expect(boundary).toContain(
		'style={mounted ? undefined : { minHeight }}',
	);
});
