# Task 03 Design: Eliminate Duplicate RSC Navigation Requests

## Context

After Task 01 and Task 02, the main remaining source of duplicate route fetching should come from client navigation patterns rather than preset prefetch or session bootstrap. The current dashboard still mixes declarative navigation (`Link`) with imperative navigation (`router.push`) and, in at least one path, combines `router.push(...)` with `router.refresh()`.

## Problem

The accepted product requirement for this task is:

> one user action must produce at most one fetch for the final route + filter combination

This must hold for:

- initial page load
- preset changes
- custom date filter submission

## Root Cause Hypothesis

The most likely causes in the current code are:

- `router.push(...)` followed by `router.refresh()` in the same action
- declarative links still wrapped in redundant client transitions that do not own navigation
- imperative handlers that do not guard against same-URL navigation

## Goal

Remove duplicate route fetches caused by the client navigation layer without redesigning the dashboard routing model.

## Approach

1. Reproduce duplicate requests with targeted browser tests.
2. Eliminate direct duplication sources:
   - remove `router.refresh()` when the route navigation already causes data reload
   - remove redundant transition wrappers around declarative `Link` navigation
3. Add a small same-target guard only where navigation is imperative.

## Scope

- inspect and adjust:
  - `src/app/(dashboard)/_components/FormFilter.tsx`
  - `src/app/(dashboard)/_components/LinkPreSet.tsx`
  - `src/app/(dashboard)/_components/HeaderClient.tsx`
  - mobile/menu handlers if they show the same duplication pattern
- add regression tests covering:
  - preset click
  - custom date filter submit

## Non-goals

- rewriting all dashboard navigation into one centralized router abstraction
- changing backend caching strategy
- changing URL format or filter semantics

## Acceptance Criteria

- clicking a preset causes at most one request for the final route/filter
- submitting the custom date filter causes at most one request for the final route/filter
- no regression in visible navigation behavior
- regression tests fail before the fix and pass after the fix
