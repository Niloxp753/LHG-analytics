# Preset Prefetch Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stop automatic prefetch and redundant same-state navigation for dashboard preset filter links.

**Architecture:** Keep preset filters as declarative UI in `LinkPreSet`, but split rendering between inactive links and the active current-state pill. Use Playwright as the regression harness because this repo already has end-to-end coverage and no dedicated unit-test runner.

**Tech Stack:** Next.js App Router, React, TypeScript, Playwright

---

## Chunk 1: Regression Test

### Task 1: Add a failing regression test for preset links

**Files:**
- Create: `e2e/preset-prefetch.spec.ts`
- Modify: `playwright.config.ts` (only if the new spec needs explicit project matching or setup)

- [ ] **Step 1: Write the failing test**

Create a Playwright spec that loads a dashboard module page under mocks and asserts:

- inactive preset controls are links
- the active preset control is marked as current state
- inactive preset links do not expose prefetch behavior in rendered markup

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx playwright test e2e/preset-prefetch.spec.ts`

Expected: FAIL because the current implementation still renders the active preset as a `Link`, and/or because preset links do not yet satisfy the expected regression contract.

## Chunk 2: Minimal Implementation

### Task 2: Update preset rendering logic

**Files:**
- Modify: `src/app/(dashboard)/_components/LinkPreSet.tsx`
- Review: `src/app/(dashboard)/_components/HeaderClient.tsx`

- [ ] **Step 3: Write the minimal implementation**

Update `LinkPreSet` so that:

- inactive presets render as `Link` with `prefetch={false}`
- active preset renders as a non-link element with `aria-current="page"`
- styling remains consistent between both render paths

- [ ] **Step 4: Run the regression test to verify it passes**

Run: `npx playwright test e2e/preset-prefetch.spec.ts`

Expected: PASS

## Chunk 3: Safety Verification

### Task 3: Run targeted regression checks

**Files:**
- No code changes expected

- [ ] **Step 5: Run targeted lint**

Run: `npm run lint -- src/app/(dashboard)/_components/LinkPreSet.tsx e2e/preset-prefetch.spec.ts`

Expected: exit code 0

- [ ] **Step 6: Re-run the new Playwright spec**

Run: `npx playwright test e2e/preset-prefetch.spec.ts`

Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add docs/superpowers/specs/2026-03-26-preset-prefetch-design.md docs/superpowers/plans/2026-03-26-preset-prefetch.md src/app/(dashboard)/_components/LinkPreSet.tsx e2e/preset-prefetch.spec.ts
git commit -m "fix: disable preset link prefetch"
```

Plan complete and saved to `docs/superpowers/plans/2026-03-26-preset-prefetch.md`. Ready to execute?
