# RSC Navigation Dedup Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure each dashboard navigation action issues at most one final route fetch for its target route/filter combination.

**Architecture:** Use targeted Playwright regression tests to capture route request counts, then remove the specific client-side duplication sources in preset and filter navigation rather than introducing a broad routing abstraction.

**Tech Stack:** Next.js App Router, React, TypeScript, Playwright

---

## Chunk 1: Reproduction Tests

### Task 1: Add failing regression coverage for duplicate route requests

**Files:**
- Create: `e2e/rsc-navigation-dedup.spec.ts`

- [ ] **Step 1: Write failing tests**

Add Playwright coverage for:

- clicking a preset from a dashboard page
- applying a custom date filter from a dashboard page

Each test should capture requests for the target route and assert that the final route/filter combination is fetched once.

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx playwright test e2e/rsc-navigation-dedup.spec.ts`

Expected: FAIL because the current navigation layer still duplicates at least one final route fetch.

## Chunk 2: Minimal Fixes

### Task 2: Remove direct duplication sources

**Files:**
- Modify: `src/app/(dashboard)/_components/FormFilter.tsx`
- Modify: `src/app/(dashboard)/_components/LinkPreSet.tsx`
- Review/modify if needed:
  - `src/app/(dashboard)/_components/HeaderClient.tsx`
  - `src/app/(dashboard)/_components/filter-mobile.tsx`
  - `src/app/(dashboard)/_components/menu-mobile.tsx`

- [ ] **Step 3: Implement the minimal code changes**

Make only the smallest changes needed to remove duplicate fetch triggers:

- remove `router.refresh()` when redundant after `router.push(...)`
- remove no-op transition wrappers around declarative navigation
- add same-target guards only where imperative navigation still exists

- [ ] **Step 4: Run the regression spec**

Run: `npx playwright test e2e/rsc-navigation-dedup.spec.ts`

Expected: PASS

## Chunk 3: Safety Verification

### Task 3: Verify no regression in earlier tasks

**Files:**
- No code changes expected

- [ ] **Step 5: Run targeted lint**

Run: `npm run lint -- "src/app/(dashboard)/_components/FormFilter.tsx" "src/app/(dashboard)/_components/LinkPreSet.tsx" "src/app/(dashboard)/_components/HeaderClient.tsx" "src/app/(dashboard)/_components/filter-mobile.tsx" "src/app/(dashboard)/_components/menu-mobile.tsx" e2e/rsc-navigation-dedup.spec.ts`

Expected: exit code 0

- [ ] **Step 6: Re-run relevant regression specs**

Run: `npx playwright test e2e/preset-prefetch.spec.ts e2e/session-bootstrap.spec.ts e2e/rsc-navigation-dedup.spec.ts`

Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add docs/superpowers/specs/2026-03-26-rsc-navigation-dedup-design.md docs/superpowers/plans/2026-03-26-rsc-navigation-dedup.md src/app/(dashboard)/_components/FormFilter.tsx src/app/(dashboard)/_components/LinkPreSet.tsx src/app/(dashboard)/_components/HeaderClient.tsx src/app/(dashboard)/_components/filter-mobile.tsx src/app/(dashboard)/_components/menu-mobile.tsx e2e/rsc-navigation-dedup.spec.ts
git commit -m "fix: deduplicate dashboard navigation requests"
```

Plan complete and saved to `docs/superpowers/plans/2026-03-26-rsc-navigation-dedup.md`. Ready to execute?
