# Task 01 Design: Disable Preset Link Prefetch

## Context

The dashboard header renders a group of preset period links through `HeaderClient` and `LinkPreSet`. These links currently behave like normal `next/link` elements, which allows automatic prefetch for visible links. For dashboard filters, this is undesirable because the preset links represent alternate states of the same page rather than likely next-page navigation.

## Problem

Automatic prefetch on preset filter links can trigger unnecessary RSC traffic before the user clicks anything. The active preset also remains clickable even when it points to the current URL, which allows redundant same-state navigations.

## Goal

Keep preset filters as declarative navigation, but prevent unnecessary network work by:

- disabling prefetch on preset links
- rendering the active preset as a non-navigable current-state element

## Approach

`LinkPreSet` will become responsible for two behaviors:

1. Inactive presets render as `Link` with `prefetch={false}`.
2. The active preset renders as a non-link element with the same styling and `aria-current="page"`.

This keeps the current UX intact while preventing both eager prefetch and same-URL clicks for the active state.

## Scope

- modify `src/app/(dashboard)/_components/LinkPreSet.tsx`
- keep `HeaderClient` API unchanged unless a small prop adjustment is needed
- add a regression test that proves preset links do not expose Next.js prefetch behavior in the rendered DOM

## Non-goals

- rewriting preset filters to imperative router navigation
- changing the custom date filter flow
- changing sidebar navigation behavior

## Acceptance Criteria

- inactive preset links render with `prefetch={false}`
- the active preset is not rendered as a clickable `Link`
- the active preset exposes `aria-current="page"`
- existing preset styling remains visually consistent
- a regression test fails before the fix and passes after the fix
