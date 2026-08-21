import { readFileSync, readdirSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { brotliCompressSync } from 'node:zlib';

export const DASHBOARD_LAYOUT_BROTLI_BUDGET = 84_354;
export const DYNAMIC_CHART_BROTLI_BUDGET = 149_400;

const ROOT_MODULE = '[project]/src/app/layout';
const DASHBOARD_LAYOUT_MODULE = '[project]/src/app/(dashboard)/layout';
const DYNAMIC_CHART_MARKERS = [
	'react-apexcharts',
	'node_modules/apexcharts',
	'apexcharts',
	'LineChart.tsx',
	'AreaChartsApex.tsx',
];
const FORBIDDEN_LAYOUT_MARKERS = ['react-day-picker', 'FormFilter'];

export function parseClientReferenceManifest(source, routeKey) {
	const marker = `globalThis.__RSC_MANIFEST[${JSON.stringify(routeKey)}] = `;
	const start = source.indexOf(marker);
	if (start < 0) {
		throw new Error(`RSC manifest route not found: ${routeKey}`);
	}

	const payload = source.slice(start + marker.length).trim().replace(/;$/, '');
	return JSON.parse(payload);
}

function unique(values) {
	return [...new Set(values.filter((value) => typeof value === 'string'))];
}

function getRouteEntryFiles(entryJSFiles, routeKey) {
	return entryJSFiles[`${ROOT_MODULE.replace('/layout', '')}${routeKey}`] ?? [];
}

function readChunk(rootDir, chunk) {
	const filePath = join(rootDir, '.next', chunk);
	return {
		chunk,
		filePath,
		body: readFileSync(filePath, 'utf8'),
	};
}

function getBrotliBytes(body) {
	return brotliCompressSync(Buffer.from(body)).byteLength;
}

function listStaticJavaScriptFiles(rootDir) {
	const directory = join(rootDir, '.next', 'static', 'chunks');
	return readdirSync(directory)
		.filter((file) => file.endsWith('.js'))
		.map((file) => `static/chunks/${file}`);
}

function sumBrotliBytes(chunks) {
	return chunks.reduce((total, chunk) => total + getBrotliBytes(chunk.body), 0);
}

export function createDashboardPerformanceReport({ rootDir = process.cwd() } = {}) {
	const absoluteRoot = resolve(rootDir);
	const routeKey = '/(dashboard)/general/page';
	const manifestPath = join(
		absoluteRoot,
		'.next',
		'server',
		'app',
		'(dashboard)',
		'general',
		'page_client-reference-manifest.js',
	);
	const source = readFileSync(manifestPath, 'utf8');
	const manifest = parseClientReferenceManifest(source, routeKey);
	const entryJSFiles = manifest.entryJSFiles ?? {};
	const rootEntry = unique(entryJSFiles[ROOT_MODULE] ?? []);
	const dashboardEntry = unique(entryJSFiles[DASHBOARD_LAYOUT_MODULE] ?? []);
	const routeEntry = unique(getRouteEntryFiles(entryJSFiles, routeKey));
	const rootEntrySet = new Set(rootEntry);
	const layoutChunks = dashboardEntry.filter((chunk) => !rootEntrySet.has(chunk));
	const initialEntryChunks = unique([
		...rootEntry,
		...dashboardEntry,
		...routeEntry,
	]);
	const initialEntrySet = new Set(initialEntryChunks);
	const layoutBodies = layoutChunks.map((chunk) => readChunk(absoluteRoot, chunk));
	const initialBodies = initialEntryChunks.map((chunk) =>
		readChunk(absoluteRoot, chunk),
	);
	const staticJavaScriptFiles = listStaticJavaScriptFiles(absoluteRoot);
	const dynamicChartChunks = staticJavaScriptFiles
		.filter((chunk) => !initialEntrySet.has(chunk))
		.map((chunk) => readChunk(absoluteRoot, chunk))
		.filter(({ body }) =>
			DYNAMIC_CHART_MARKERS.some((marker) => body.includes(marker)),
		);
	const forbiddenLayoutMatches = layoutBodies.flatMap(({ chunk, body }) =>
		FORBIDDEN_LAYOUT_MARKERS.filter((marker) => body.includes(marker)).map(
			(marker) => `${marker} in ${chunk}`,
		),
	);
	const apexInInitialEntry = initialBodies.some(({ body }) =>
		DYNAMIC_CHART_MARKERS.some((marker) => body.includes(marker)),
	);

	return {
		manifestPath: relative(absoluteRoot, manifestPath),
		rootEntryChunks: rootEntry,
		dashboardLayoutChunks: layoutChunks,
		routeEntryChunks: routeEntry,
		dynamicChartChunks: dynamicChartChunks.map(({ chunk }) => chunk),
		dashboardLayoutBrotliBytes: sumBrotliBytes(layoutBodies),
		dynamicChartBrotliBytes: sumBrotliBytes(dynamicChartChunks),
		forbiddenLayoutMatches,
		apexInInitialEntry,
	};
}

export function assertDashboardPerformance(report) {
	const violations = [];
	if (report.dashboardLayoutBrotliBytes > DASHBOARD_LAYOUT_BROTLI_BUDGET) {
		violations.push(
			`Dashboard layout Brotli is ${report.dashboardLayoutBrotliBytes.toLocaleString('en-US')} bytes; budget is ${DASHBOARD_LAYOUT_BROTLI_BUDGET.toLocaleString('en-US')}`,
		);
	}
	if (report.dynamicChartBrotliBytes > DYNAMIC_CHART_BROTLI_BUDGET) {
		violations.push(
			`Dynamic chart Brotli is ${report.dynamicChartBrotliBytes.toLocaleString('en-US')} bytes; budget is ${DYNAMIC_CHART_BROTLI_BUDGET.toLocaleString('en-US')}`,
		);
	}
	if (report.forbiddenLayoutMatches.length > 0) {
		violations.push(
			`Forbidden layout modules: ${report.forbiddenLayoutMatches.join(', ')}`,
		);
	}
	if (report.apexInInitialEntry) {
		violations.push('ApexCharts is present in an initial dashboard entry');
	}

	if (violations.length > 0) {
		throw new Error(violations.join('; '));
	}

	return report;
}

const scriptPath = process.argv[1] ? resolve(process.argv[1]) : null;
if (scriptPath === resolve(new URL(import.meta.url).pathname)) {
	try {
		const report = assertDashboardPerformance(
			createDashboardPerformanceReport(),
		);
		console.log(JSON.stringify(report, null, 2));
	} catch (error) {
		console.error(error instanceof Error ? error.message : error);
		process.exitCode = 1;
	}
}
