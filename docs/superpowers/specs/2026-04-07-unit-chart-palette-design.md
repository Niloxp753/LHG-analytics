# Task 04 Design: Standardize Unit Chart Colors

## Context

The dashboard currently mixes two color strategies for charts that compare units. Some KPI wrappers already pass a shared `consolidated-unit-palette`, while the base Apex chart components still contain positional hardcoded color arrays. Because of this, the same unit can appear with different colors depending on chart type, series order, or screen.

## Problem

Unit comparison charts need a stable visual identity per unit. Today, chart colors are often assigned by array position instead of unit identity, which creates inconsistencies across pie, line, and area charts.

The approved palette is:

- `Lush Ipiranga` -> Tailwind `violet-500`
- `Lush Lapa` -> Tailwind `indigo-600`
- `Tout` -> Tailwind `rose-500`
- `Andar de Cima` -> Tailwind `fuchsia-500`
- `LIV` -> Tailwind `red-500`
- `Altana` -> Tailwind `blue-500`

The implementation must stay on the current Tailwind version used by the project and should prefer `tailwindcss/colors` instead of scattering raw hex values through the app.

## Goal

Standardize colors for charts that represent units or companies, while preserving the existing default palettes for charts that represent other concepts such as categories, channels, or reservation types.

## Approach

Create a single semantic unit palette module and make the base chart components opt into it through an explicit API such as `palette="units"`.

The palette module will be responsible for:

1. Defining the canonical unit-to-color mapping using `tailwindcss/colors`.
2. Normalizing unit aliases such as `Liv`/`LIV`, `Ipiranga`/`Lush Ipiranga`, and `Andar de cima`/`Andar de Cima`.
3. Resolving Apex-compatible color arrays from chart `labels` or `series[].name`.
4. Providing darker companion shades where needed for markers or data labels to preserve contrast without changing unit identity.

The base components that currently own default series colors for multi-series comparisons will gain explicit unit-palette support:

- `src/app/(dashboard)/_components/charts/PieChartsApex.tsx`
- `src/app/(dashboard)/_components/charts/LineChart.tsx`
- `src/app/(dashboard)/_components/charts/AreaChartsApex.tsx`

`ColumnChart` should only be updated if a unit-comparison column chart currently depends on positional colors. Otherwise it remains out of scope for this task.

Wrappers for consolidated "by unit" KPIs will be migrated to the explicit unit palette mode so that color selection happens by unit identity rather than wrapper-local arrays.

## Scope

- replace the current positional unit palette constants with a semantic palette module
- add explicit unit-palette support to the relevant base chart components
- migrate unit-comparison KPI wrappers to use the explicit unit palette mode
- keep the non-unit chart behavior unchanged
- add regression coverage for palette resolution and chart opt-in behavior

## Non-goals

- redesigning charts that do not compare units
- changing metric semantics, chart ordering, or label copy
- upgrading Tailwind
- forcing a global palette on every chart in the dashboard

## Acceptance Criteria

- the same unit always renders with the same color across pie, line, and area charts when the chart is in unit-palette mode
- color resolution is based on normalized unit identity, not array position
- aliases such as `Liv` and `LIV` resolve to the same unit color
- non-unit charts keep their existing default palettes
- regression tests fail before the change and pass after the change
