import { expect, test } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const scriptUrl = pathToFileURL(
	resolve(process.cwd(), 'scripts/dashboard-performance-budget.mjs'),
).href;

function evaluateModule(source: string) {
	return execFileSync(
		process.execPath,
		[
			'--input-type=module',
			'-e',
			`import { assertDashboardPerformance, parseClientReferenceManifest } from ${JSON.stringify(scriptUrl)};\n${source}`,
		],
		{ encoding: 'utf8' },
	).trim();
}

test('parses the dashboard route entry chunks from its RSC manifest', () => {
	const source =
		'globalThis.__RSC_MANIFEST["/(dashboard)/general/page"] = {"entryJSFiles":{"[project]/src/app/layout":["static/chunks/root.js"],"[project]/src/app/(dashboard)/layout":["static/chunks/root.js","static/chunks/dashboard.js"]}};';

	const result = evaluateModule(
		`const source = ${JSON.stringify(source)}; console.log(JSON.stringify(parseClientReferenceManifest(source, '/(dashboard)/general/page').entryJSFiles['[project]/src/app/(dashboard)/layout']));`,
	);

	expect(JSON.parse(result)).toEqual([
		'static/chunks/root.js',
		'static/chunks/dashboard.js',
	]);
});

test('reports every dashboard performance budget violation', () => {
	const layoutViolation = evaluateModule(`
	try {
		assertDashboardPerformance({
			dashboardLayoutBrotliBytes: 84_355,
			dynamicChartBrotliBytes: 149_400,
			forbiddenLayoutMatches: [],
			apexInInitialEntry: false,
		});
	} catch (error) {
		console.log(error.message);
	}
`);
	expect(layoutViolation).toMatch(/84,355.*84,354/);

	const chartViolation = evaluateModule(`
	try {
		assertDashboardPerformance({
			dashboardLayoutBrotliBytes: 84_354,
			dynamicChartBrotliBytes: 149_401,
			forbiddenLayoutMatches: ['react-day-picker'],
			apexInInitialEntry: true,
		});
	} catch (error) {
		console.log(error.message);
	}
`);
	expect(chartViolation).toMatch(/react-day-picker|149,401|ApexCharts/);
});
