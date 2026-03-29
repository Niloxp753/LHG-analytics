# Enriched Session Bootstrap Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove duplicate initial session fetching by hydrating the dashboard client with an enriched session snapshot from the server.

**Architecture:** The proxy remains responsible for access control and becomes the source of the initial enriched session snapshot. The dashboard layout reads that snapshot and initializes a provider-backed Zustand session store so client components have the enriched user without re-fetching `/api/me` on mount.

**Tech Stack:** Next.js App Router, React, TypeScript, Zustand, Playwright

---

## Chunk 1: Regression Test

### Task 1: Add a failing session bootstrap regression test

**Files:**
- Create: `e2e/session-bootstrap.spec.ts`

- [ ] **Step 1: Write the failing test**

Create a Playwright spec that:

- opens a protected dashboard route with mocked auth cookies
- records browser requests to `/api/me` and `/api/users/email/:email`
- asserts that session-dependent UI is available
- expects zero client-side auth bootstrap requests on initial load

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx playwright test e2e/session-bootstrap.spec.ts`

Expected: FAIL because the current client bootstrap still requests `/api/me` and `/api/users/email/:email`.

## Chunk 2: Shared Session Snapshot Utilities

### Task 2: Extract shared session parsing helpers

**Files:**
- Create: `src/lib/session-user.ts`
- Modify: `src/stores/session-store.ts`
- Modify: `src/proxy.ts`

- [ ] **Step 3: Create shared helpers for session payload parsing**

Move shared user parsing/sanitization logic into a neutral module that both proxy and client store can use.

## Chunk 3: Provider-backed Session Store

### Task 3: Convert the session store to a provider-backed instance

**Files:**
- Modify: `src/stores/session-store.ts`
- Modify: `src/providers/session-hydrator-provider.tsx`
- Create: `src/app/(public)/layout.tsx`

- [ ] **Step 4: Refactor the session store**

Implement a provider-backed Zustand store instance that accepts initial state and remains available in both dashboard and public pages.

- [ ] **Step 5: Update the provider**

Pass `initialUser` into the provider, skip mount-time `hydrate()` when it exists, and preserve periodic refresh behavior.

## Chunk 4: Server Snapshot Wiring

### Task 4: Wire enriched session snapshot from proxy to dashboard layout

**Files:**
- Modify: `src/proxy.ts`
- Modify: `src/app/(dashboard)/layout.tsx`

- [ ] **Step 6: Resolve the enriched user in proxy**

Fetch `/api/me`, enrich with `/api/users/email/:email` when possible, and forward a compact session snapshot through request headers for the dashboard request.

- [ ] **Step 7: Read the snapshot in the layout**

Read the forwarded header in the dashboard layout and pass the parsed user into `SessionHydratorProvider`.

## Chunk 5: Verification

### Task 5: Run targeted verification

**Files:**
- No code changes expected

- [ ] **Step 8: Run the new regression test**

Run: `npx playwright test e2e/session-bootstrap.spec.ts`

Expected: PASS

- [ ] **Step 9: Run targeted lint**

Run: `npm run lint -- "src/proxy.ts" "src/stores/session-store.ts" "src/providers/session-hydrator-provider.tsx" "src/app/(dashboard)/layout.tsx" "src/app/(public)/layout.tsx" "src/lib/session-user.ts" e2e/session-bootstrap.spec.ts`

Expected: exit code 0

- [ ] **Step 10: Re-run the regression test**

Run: `npx playwright test e2e/session-bootstrap.spec.ts`

Expected: PASS

- [ ] **Step 11: Commit**

```bash
git add docs/superpowers/specs/2026-03-26-enriched-session-bootstrap-design.md docs/superpowers/plans/2026-03-26-enriched-session-bootstrap.md src/proxy.ts src/stores/session-store.ts src/providers/session-hydrator-provider.tsx src/app/(dashboard)/layout.tsx src/app/(public)/layout.tsx src/lib/session-user.ts e2e/session-bootstrap.spec.ts
git commit -m "fix: bootstrap dashboard session from server snapshot"
```

Plan complete and saved to `docs/superpowers/plans/2026-03-26-enriched-session-bootstrap.md`. Ready to execute?
