# Unit Chart Palette Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Standardize unit-comparison chart colors by unit identity across pie, line, and area charts without changing non-unit chart palettes.

**Architecture:** Keep a single semantic palette source in the existing chart palette module and make base chart components opt into it with an explicit `palette="units"` API. Resolve colors from normalized unit labels or series names using `tailwindcss/colors` from the current Tailwind version, then migrate only the wrappers that render “by unit” dashboards.

**Tech Stack:** Next.js App Router, React 18, TypeScript, ApexCharts, Playwright, ESLint, Tailwind CSS v3 (`tailwindcss/colors`)

---

## File Map

- Modify: `src/app/(dashboard)/_components/charts/consolidated-unit-palette.ts`
  - Replace positional arrays with a semantic resolver built on `tailwindcss/colors`.
- Modify: `src/app/(dashboard)/_components/charts/PieChartsApex.tsx`
  - Add explicit `palette?: 'default' | 'units'` support for label-based unit coloring.
- Modify: `src/app/(dashboard)/_components/charts/LineChart.tsx`
  - Add explicit `palette?: 'default' | 'units'` support for series-name-based unit coloring.
- Modify: `src/app/(dashboard)/_components/charts/AreaChartsApex.tsx`
  - Add explicit `palette?: 'default' | 'units'` support for future unit-comparison area charts.
- Modify: `src/app/(dashboard)/_components/kpis/InvoicingXUnity.tsx`
- Modify: `src/app/(dashboard)/_components/kpis/LocationsxUnity.tsx`
- Modify: `src/app/(dashboard)/_components/kpis/InvoicingXUnityXTime.tsx`
- Modify: `src/app/(dashboard)/_components/kpis/TKTxUnity.tsx`
- Modify: `src/app/(dashboard)/_components/kpis/TRevParXUnity.tsx`
- Modify: `src/app/(dashboard)/_components/kpis/OccupationXUnity.tsx`
- Modify: `src/app/(dashboard)/restaurant/_components/kpis/UnityxRevenue.tsx`
- Modify: `src/app/(dashboard)/restaurant/_components/kpis/UnityxSales.tsx`
- Modify: `src/app/(dashboard)/restaurant/_components/kpis/UnityxRevenuexTimeAB.tsx`
- Modify: `src/app/(dashboard)/restaurant/_components/kpis/UnityxTKTxTime.tsx`
- Modify: `src/app/(dashboard)/restaurant/_components/kpis/UnityxRevenuexTimeABPercent.tsx`
- Modify: `src/app/(dashboard)/reservations/_components/page-kpis/revenue-by-company.tsx`
- Modify: `src/app/(dashboard)/reservations/_components/page-kpis/bookings-by-company.tsx`
- Modify: `src/app/(dashboard)/reservations/_components/page-kpis/revenue-by-company-in-time.tsx`
- Modify: `src/app/(dashboard)/operational/_components/kpis-geral/total-cleaning-unity.tsx`
- Modify: `src/app/(dashboard)/operational/_components/kpis-geral/cleaning-average-unity.tsx`
- Modify: `src/app/(dashboard)/operational/_components/kpis-geral/Performance-unity.tsx`
- Modify: `src/app/(dashboard)/operational/_components/kpis-geral/morning-cleaning.tsx`
- Modify: `src/app/(dashboard)/operational/_components/kpis-geral/afternoon-cleaning.tsx`
- Modify: `src/app/(dashboard)/operational/_components/kpis-geral/night-cleaning .tsx`
- Create: `e2e/unit-chart-palette-contract.spec.ts`
  - Cover palette resolution by alias, label order, and explicit default-vs-units behavior.
- Create: `e2e/unit-chart-palette-rollout.spec.ts`
  - Guard that all known “by unit” wrappers opt into `palette="units"`.

## Chunk 1: Semantic Palette Resolver

### Task 1: Build the canonical unit palette and resolver helpers

**Files:**
- Modify: `src/app/(dashboard)/_components/charts/consolidated-unit-palette.ts`
- Test: `e2e/unit-chart-palette-contract.spec.ts`

- [ ] **Step 1: Write the failing contract tests**

```ts
import { expect, test } from '@playwright/test';

test.describe('unit chart palette contract', () => {
	test('maps canonical units to approved Tailwind colors', async () => {
		const {
			resolveUnitPaletteFromLabels,
			UNIT_CHART_COLORS,
		} = require('../src/app/(dashboard)/_components/charts/consolidated-unit-palette');

		expect(
			resolveUnitPaletteFromLabels([
				'Lush Ipiranga',
				'Lush Lapa',
				'Tout',
				'Andar de Cima',
				'LIV',
				'Altana',
			]),
		).toEqual([
			UNIT_CHART_COLORS.ipiranga.series,
			UNIT_CHART_COLORS.lapa.series,
			UNIT_CHART_COLORS.tout.series,
			UNIT_CHART_COLORS.andarDeCima.series,
			UNIT_CHART_COLORS.liv.series,
			UNIT_CHART_COLORS.altana.series,
		]);
	});

	test('normalizes aliases before resolving unit colors', async () => {
		const { resolveUnitPaletteFromLabels } = require('../src/app/(dashboard)/_components/charts/consolidated-unit-palette');

		expect(
			resolveUnitPaletteFromLabels(['Ipiranga', 'Liv', 'Andar de cima']),
		).toEqual(resolveUnitPaletteFromLabels(['Lush Ipiranga', 'LIV', 'Andar de Cima']));
	});
});
```

- [ ] **Step 2: Run the contract test to verify it fails**

Run: `npx playwright test e2e/unit-chart-palette-contract.spec.ts --project=chromium`

Expected: FAIL because the resolver helpers and semantic palette exports do not exist yet.

- [ ] **Step 3: Implement the minimal semantic palette**

```ts
import colors from 'tailwindcss/colors';

export const UNIT_CHART_COLORS = {
	ipiranga: { series: colors.violet[500], accent: colors.violet[700] },
	lapa: { series: colors.indigo[600], accent: colors.indigo[800] },
	tout: { series: colors.rose[500], accent: colors.rose[700] },
	andarDeCima: { series: colors.fuchsia[500], accent: colors.fuchsia[700] },
	liv: { series: colors.red[500], accent: colors.red[700] },
	altana: { series: colors.blue[500], accent: colors.blue[700] },
} as const;

export function normalizeUnitLabel(label: string) {
	// return canonical names such as 'Lush Ipiranga', 'LIV', 'Andar de Cima'
}

export function resolveUnitPaletteFromLabels(labels?: string[]) {
	// map canonical unit labels to UNIT_CHART_COLORS.*.series
}
```

- [ ] **Step 4: Run the contract test to verify it passes**

Run: `npx playwright test e2e/unit-chart-palette-contract.spec.ts --project=chromium`

Expected: PASS

- [ ] **Step 5: Commit the resolver**

```bash
git add e2e/unit-chart-palette-contract.spec.ts src/app/(dashboard)/_components/charts/consolidated-unit-palette.ts
git commit -m "feat: add semantic unit chart palette"
```

## Chunk 2: Base Chart Opt-In API

### Task 2: Add `palette="units"` to the reusable Apex chart components

**Files:**
- Modify: `src/app/(dashboard)/_components/charts/consolidated-unit-palette.ts`
- Modify: `src/app/(dashboard)/_components/charts/PieChartsApex.tsx`
- Modify: `src/app/(dashboard)/_components/charts/LineChart.tsx`
- Modify: `src/app/(dashboard)/_components/charts/AreaChartsApex.tsx`
- Test: `e2e/unit-chart-palette-contract.spec.ts`

- [ ] **Step 1: Extend the failing contract test for explicit opt-in behavior**

```ts
test('keeps fallback colors when palette mode is default', async () => {
	const { resolveChartPalette } = require('../src/app/(dashboard)/_components/charts/consolidated-unit-palette');

	expect(
		resolveChartPalette({
			palette: 'default',
			labels: ['Lush Ipiranga', 'LIV'],
			fallbackSeriesColors: ['#111111', '#222222'],
			fallbackAccentColors: ['#333333', '#444444'],
		}),
	).toEqual({
		seriesColors: ['#111111', '#222222'],
		accentColors: ['#333333', '#444444'],
	});
});

test('resolves line colors from series names in unit palette mode', async () => {
	const { resolveChartPalette } = require('../src/app/(dashboard)/_components/charts/consolidated-unit-palette');

	expect(
		resolveChartPalette({
			palette: 'units',
			seriesNames: ['Lush Lapa', 'Liv', 'Altana'],
			fallbackSeriesColors: ['#111111'],
			fallbackAccentColors: ['#222222'],
		}).seriesColors,
	).toEqual(
		resolveChartPalette({
			palette: 'units',
			labels: ['Lush Lapa', 'LIV', 'Altana'],
			fallbackSeriesColors: ['#111111'],
			fallbackAccentColors: ['#222222'],
		}).seriesColors,
	);
});
```

- [ ] **Step 2: Run the contract test to verify it fails**

Run: `npx playwright test e2e/unit-chart-palette-contract.spec.ts --project=chromium`

Expected: FAIL because `resolveChartPalette` and the base chart opt-in path do not exist yet.

- [ ] **Step 3: Implement the minimal chart API and resolver wiring**

```ts
type ChartPaletteMode = 'default' | 'units';

export function resolveChartPalette(input: {
	palette?: ChartPaletteMode;
	labels?: string[];
	seriesNames?: string[];
	fallbackSeriesColors: string[];
	fallbackAccentColors: string[];
}) {
	// if palette !== 'units', return fallbacks
	// else resolve by labels or seriesNames using normalizeUnitLabel()
}
```

```tsx
interface PieChartsApexProps {
	palette?: 'default' | 'units';
}

const palette = resolveChartPalette({
	palette: props.palette,
	labels: props.labels,
	fallbackSeriesColors: DEFAULT_PIE_COLORS,
	fallbackAccentColors: DEFAULT_PIE_DATA_LABEL_COLORS,
});
```

```tsx
interface AreaChartsApexProps {
	palette?: 'default' | 'units';
}

const palette = resolveChartPalette({
	palette: props.palette,
	seriesNames,
	fallbackSeriesColors: DEFAULT_LINE_OR_AREA_COLORS,
	fallbackAccentColors: DEFAULT_LINE_OR_AREA_ACCENTS,
});
```

- [ ] **Step 4: Run focused verification**

Run: `npx playwright test e2e/unit-chart-palette-contract.spec.ts --project=chromium`

Run: `npx eslint src/app/(dashboard)/_components/charts/consolidated-unit-palette.ts src/app/(dashboard)/_components/charts/PieChartsApex.tsx src/app/(dashboard)/_components/charts/LineChart.tsx src/app/(dashboard)/_components/charts/AreaChartsApex.tsx`

Expected: both commands PASS

- [ ] **Step 5: Commit the base chart API**

```bash
git add e2e/unit-chart-palette-contract.spec.ts src/app/(dashboard)/_components/charts/consolidated-unit-palette.ts src/app/(dashboard)/_components/charts/PieChartsApex.tsx src/app/(dashboard)/_components/charts/LineChart.tsx src/app/(dashboard)/_components/charts/AreaChartsApex.tsx
git commit -m "feat: add unit palette mode to base charts"
```

## Chunk 3: Wrapper Rollout

### Task 3: Migrate every consolidated “by unit” wrapper to the explicit palette API

**Files:**
- Modify: `src/app/(dashboard)/_components/kpis/InvoicingXUnity.tsx`
- Modify: `src/app/(dashboard)/_components/kpis/LocationsxUnity.tsx`
- Modify: `src/app/(dashboard)/_components/kpis/InvoicingXUnityXTime.tsx`
- Modify: `src/app/(dashboard)/_components/kpis/TKTxUnity.tsx`
- Modify: `src/app/(dashboard)/_components/kpis/TRevParXUnity.tsx`
- Modify: `src/app/(dashboard)/_components/kpis/OccupationXUnity.tsx`
- Modify: `src/app/(dashboard)/restaurant/_components/kpis/UnityxRevenue.tsx`
- Modify: `src/app/(dashboard)/restaurant/_components/kpis/UnityxSales.tsx`
- Modify: `src/app/(dashboard)/restaurant/_components/kpis/UnityxRevenuexTimeAB.tsx`
- Modify: `src/app/(dashboard)/restaurant/_components/kpis/UnityxTKTxTime.tsx`
- Modify: `src/app/(dashboard)/restaurant/_components/kpis/UnityxRevenuexTimeABPercent.tsx`
- Modify: `src/app/(dashboard)/reservations/_components/page-kpis/revenue-by-company.tsx`
- Modify: `src/app/(dashboard)/reservations/_components/page-kpis/bookings-by-company.tsx`
- Modify: `src/app/(dashboard)/reservations/_components/page-kpis/revenue-by-company-in-time.tsx`
- Modify: `src/app/(dashboard)/operational/_components/kpis-geral/total-cleaning-unity.tsx`
- Modify: `src/app/(dashboard)/operational/_components/kpis-geral/cleaning-average-unity.tsx`
- Modify: `src/app/(dashboard)/operational/_components/kpis-geral/Performance-unity.tsx`
- Modify: `src/app/(dashboard)/operational/_components/kpis-geral/morning-cleaning.tsx`
- Modify: `src/app/(dashboard)/operational/_components/kpis-geral/afternoon-cleaning.tsx`
- Modify: `src/app/(dashboard)/operational/_components/kpis-geral/night-cleaning .tsx`
- Test: `e2e/unit-chart-palette-rollout.spec.ts`

- [ ] **Step 1: Write the failing rollout contract**

```ts
import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';

const UNIT_WRAPPERS = [
	'src/app/(dashboard)/_components/kpis/LocationsxUnity.tsx',
	'src/app/(dashboard)/restaurant/_components/kpis/UnityxRevenuexTimeAB.tsx',
	'src/app/(dashboard)/reservations/_components/page-kpis/bookings-by-company.tsx',
];

test('all consolidated unit wrappers opt into the unit palette', async () => {
	for (const filePath of UNIT_WRAPPERS) {
		const source = readFileSync(filePath, 'utf8');
		expect(source).toMatch(/palette=['"]units['"]/);
	}
});
```

- [ ] **Step 2: Run the rollout contract to verify it fails**

Run: `npx playwright test e2e/unit-chart-palette-rollout.spec.ts --project=chromium`

Expected: FAIL because the wrappers do not yet pass `palette="units"`.

- [ ] **Step 3: Migrate pie and line wrappers to the new API**

```tsx
<PieChartsApex
	palette='units'
	series={normalized.series}
	labels={normalized.categories}
/>
```

```tsx
<LineChart
	palette='units'
	series={data?.series}
	categories={data?.categories}
/>
```

Notes:
- remove manual `colors` / `dataLabelColors` arrays from unit wrappers
- keep non-unit wrappers untouched
- do not change titles, metric flags, or layout props

- [ ] **Step 4: Run full task verification**

Run: `npx playwright test e2e/unit-chart-palette-contract.spec.ts e2e/unit-chart-palette-rollout.spec.ts --project=chromium`

Run: `npm run lint`

Run: `npm run build`

Expected: all commands PASS

- [ ] **Step 5: Commit the rollout**

```bash
git add e2e/unit-chart-palette-contract.spec.ts e2e/unit-chart-palette-rollout.spec.ts src/app/(dashboard)/_components/charts/consolidated-unit-palette.ts src/app/(dashboard)/_components/charts/PieChartsApex.tsx src/app/(dashboard)/_components/charts/LineChart.tsx src/app/(dashboard)/_components/charts/AreaChartsApex.tsx src/app/(dashboard)/_components/kpis/InvoicingXUnity.tsx src/app/(dashboard)/_components/kpis/LocationsxUnity.tsx src/app/(dashboard)/_components/kpis/InvoicingXUnityXTime.tsx src/app/(dashboard)/_components/kpis/TKTxUnity.tsx src/app/(dashboard)/_components/kpis/TRevParXUnity.tsx src/app/(dashboard)/_components/kpis/OccupationXUnity.tsx src/app/(dashboard)/restaurant/_components/kpis/UnityxRevenue.tsx src/app/(dashboard)/restaurant/_components/kpis/UnityxSales.tsx src/app/(dashboard)/restaurant/_components/kpis/UnityxRevenuexTimeAB.tsx src/app/(dashboard)/restaurant/_components/kpis/UnityxTKTxTime.tsx src/app/(dashboard)/restaurant/_components/kpis/UnityxRevenuexTimeABPercent.tsx src/app/(dashboard)/reservations/_components/page-kpis/revenue-by-company.tsx src/app/(dashboard)/reservations/_components/page-kpis/bookings-by-company.tsx src/app/(dashboard)/reservations/_components/page-kpis/revenue-by-company-in-time.tsx src/app/(dashboard)/operational/_components/kpis-geral/total-cleaning-unity.tsx src/app/(dashboard)/operational/_components/kpis-geral/cleaning-average-unity.tsx src/app/(dashboard)/operational/_components/kpis-geral/Performance-unity.tsx src/app/(dashboard)/operational/_components/kpis-geral/morning-cleaning.tsx src/app/(dashboard)/operational/_components/kpis-geral/afternoon-cleaning.tsx src/app/(dashboard)/operational/_components/kpis-geral/night-cleaning\ .tsx
git commit -m "feat: standardize unit chart colors"
```
