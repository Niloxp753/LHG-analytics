# Altana Integration Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the new unit `altana` across access control, data fetching, navigation, and dashboard pages while preserving the existing unit patterns.

**Architecture:** The codebase currently has two unit integration patterns. Core units (`Lush Ipiranga`, `Lush Lapa`, `Tout`, `Andar de Cima`) reuse shared HTTP/actions and branch by `company` slug; `LIV` is a dedicated integration with its own `http`, `actions`, `types`, cache tags, and unit pages. `Altana` should follow the core pattern unless its backend contract differs materially from the shared endpoints.

**Tech Stack:** Next.js App Router, server actions, server-side `ky`, route proxy/auth headers, Tailwind, Playwright.

---

### Task 1: Decide the Altana integration model

**Files:**
- Inspect: `src/http/api-client.ts`
- Inspect: `src/http/company/getCompanyCustom.ts`
- Inspect: `src/http/restaurant/get-restaurant-custom.ts`
- Inspect: `src/http/reservations/get-bookings-custom.ts`
- Inspect: `src/http/operation/get-governance-custom.ts`
- Inspect: `src/http/liv/get-liv-company.ts`
- Inspect: `src/actions/liv/get-liv-company-page.ts`

- [ ] **Step 1: Confirm Altana backend contract**

Answer these before implementation:
- Does Altana expose the same four endpoints as the core units?
  - `Company/kpis/date-range`
  - `Restaurants/restaurants/date-range`
  - `Bookings/bookings/date-range`
  - `Governance/kpis/date-range`
- Does Altana return the same response shapes as the current shared dashboards?
- Does Altana use BRL and the same chart/table components as the core units?

- [ ] **Step 2: Choose the implementation path**

Recommended:
- Use the **core-unit path** if Altana matches the shared endpoint/response pattern.
- Use the **dedicated-unit path** only if Altana behaves like `LIV` with different schemas, KPIs, or formatting rules.

- [ ] **Step 3: Stop implementation if the answer is unknown**

Do not start coding until this is confirmed, because this choice determines whether we add a single shared backend client plus four pages, or a full dedicated integration slice.

### Task 2: Register Altana as a first-class unit in access control and navigation

**Files:**
- Modify: `src/lib/access-control.ts`
- Verify: `src/proxy.ts`
- Verify: `src/components/back-btn.tsx`
- Verify: `src/app/(dashboard)/_components/SidebarMenu.tsx`
- Verify: `src/app/(dashboard)/_components/menu-mobile.tsx`

- [ ] **Step 1: Add Altana to the unit model**

Update:
- `UNIT_VALUES`
- `UNIT_LABELS`
- `LEGACY_UNIT_MAP` if Altana needs legacy aliases or numeric IDs
- `UNIT_SLUG_TO_UNIT`
- `UNIT_TO_SLUG`

Target values:
- enum value: `ALTANA`
- label: `Altana`
- slug: `altana`

- [ ] **Step 2: Verify derived consumers**

After `access-control.ts` is updated, these should work automatically without extra logic:
- user create/update forms via `UNIT_OPTIONS`
- `buildModuleHref`
- route authorization via `canAccessRoute`
- proxy slug validation and redirects
- back button unit detection

- [ ] **Step 3: Confirm any unit-specific access rules**

If Altana needs special access rules like `LIV`, add them in `canAccessModule`. Otherwise it should follow the default role-based rules.

### Task 3: Wire Altana into backend configuration and HTTP layer

**Files (core-unit path):**
- Modify: `src/http/api-client.ts`
- Modify: `src/http/company/getCompanyCustom.ts`
- Modify: `src/http/restaurant/get-restaurant-custom.ts`
- Modify: `src/http/reservations/get-bookings-custom.ts`
- Modify: `src/http/operation/get-governance-custom.ts`

**Files (dedicated-unit path):**
- Modify: `src/http/api-client.ts`
- Create: `src/http/altana/get-altana-company.ts`
- Create: `src/http/altana/get-altana-restaurant.ts`
- Create: `src/http/altana/get-altana-reservations.ts`
- Create: `src/http/altana/get-altana-operational.ts`

- [ ] **Step 1: Add the backend endpoint binding**

Add a new `ky` client in `src/http/api-client.ts`:
- `api_altana`
- `prefixUrl: process.env.BACKEND_ENDPOINT_ALTANA`
- keep the same `timeout`, `retry`, `mode`, and custom `fetch` pattern as the other clients

- [ ] **Step 2: Connect Altana to the fetchers**

If Altana is a core unit:
- extend each shared `switch (companyKey)` to recognize `'altana'`
- route those requests to `api_altana`

If Altana is dedicated:
- create four Altana-specific HTTP files following the `src/http/liv/*` pattern
- keep the same error handling, timeout, retry, auth cookie header, and cache profile behavior

- [ ] **Step 3: Confirm environment rollout**

Add `BACKEND_ENDPOINT_ALTANA` anywhere the project documents or provisions env vars.

Note:
- there is no `.env.example` in the repo today, so if envs are documented elsewhere this needs to be updated there as part of rollout.

### Task 4: Add cache tag coverage for Altana where needed

**Files:**
- Modify: `src/lib/cache-tags.ts`
- Verify: `src/http/cache-profiles.ts`

- [ ] **Step 1: Extend cache tags only if the data path requires them**

Current pattern:
- unified company/reservations/operational use shared tags
- `restaurant` has both shared and per-unit tags
- dedicated `LIV` paths have their own tags

Recommended:
- If Altana follows the core-unit path, add only the tags that the invalidation strategy actually uses.
- If Altana gets dedicated HTTP/actions like `LIV`, add:
  - `company_altana`
  - `operational_altana`
  - `reservations_altana`
  - `restaurant_altana`

- [ ] **Step 2: Keep tag naming consistent**

Use lowercase suffixes matching slugs, e.g. `restaurant_altana`.

### Task 5: Add Altana to admin landing pages and cross-unit navigation

**Files:**
- Modify: `src/app/(dashboard)/general/page.tsx`
- Modify: `src/app/(dashboard)/restaurant/page.tsx`
- Modify: `src/app/(dashboard)/reservations/page.tsx`
- Modify: `src/app/(dashboard)/operational/page.tsx`
- Verify: shared card/grid components under `src/app/(dashboard)/_components`

- [ ] **Step 1: Add Altana card links to each module landing page**

Each landing page currently renders a card strip linking to:
- `lushipiranga`
- `lushlapa`
- `tout`
- `andardecima`
- `liv`

Add:
- `/general/altana?...`
- `/restaurant/altana?...`
- `/reservations/altana?...`
- `/operational/altana?...`

- [ ] **Step 2: Adjust the grid layout for six units**

Current landing grids are tuned for five cards. Update the grid classes and card spacing to handle six units cleanly on desktop and mobile.

- [ ] **Step 3: Decide whether Altana participates in unified aggregate charts**

Important:
- the card link can be added immediately
- the aggregate admin charts only show Altana if the unified backend endpoints already include Altana data

Do not fake Altana in aggregate charts from the frontend.

### Task 6: Create the Altana unit pages for each module

**Files (core-unit path):**
- Create: `src/app/(dashboard)/general/(unidades)/altana/page.tsx`
- Create: `src/app/(dashboard)/restaurant/(unidades)/altana/page.tsx`
- Create: `src/app/(dashboard)/reservations/(unidades)/altana/page.tsx`
- Create: `src/app/(dashboard)/operational/(unidades)/altana/page.tsx`

**Files (dedicated-unit path):**
- Create the same four page files above
- plus dedicated supporting actions/types from Tasks 3 and 7

- [ ] **Step 1: Pick the source pattern per module**

Core-unit recommendation:
- clone from `tout` or another core unit page in the same module
- replace only:
  - page title
  - unit slug
  - company argument string

Dedicated-unit recommendation:
- clone from the matching `liv` page for the module
- preserve any dedicated response typing or currency/component differences if Altana needs them

- [ ] **Step 2: Keep the error-state pattern consistent**

All unit pages should:
- read `set`, `startDate`, `endDate`
- format dates
- load data server-side
- render a single unit-level error state when the fetch fails

- [ ] **Step 3: Do not duplicate shared components unnecessarily**

Only create new unit-specific KPI components if Altana truly has unique schema or UI requirements.

### Task 7: Add Altana actions and types only if Altana is a dedicated integration

**Files:**
- Create: `src/actions/altana/get-altana-company-page.ts`
- Create: `src/actions/altana/get-altana-restaurant-page.ts`
- Create: `src/actions/altana/get-altana-reservations-page.ts`
- Create: `src/actions/altana/get-altana-operational-page.ts`
- Create: `src/types/altana/company.ts`
- Create: `src/types/altana/restaurant.ts`
- Create: `src/types/altana/reservations.ts`
- Create: `src/types/altana/operational.ts`

- [ ] **Step 1: Reuse the LIV structure if Altana is dedicated**

The `LIV` slice is the existing reference for:
- typed page-data actions
- dedicated HTTP layer
- module-specific response types
- dedicated page composition

- [ ] **Step 2: Skip this entire task if Altana is a core unit**

Core units do not need their own actions or type folders today.

### Task 8: Update the login/brand surface if Altana must appear there

**Files:**
- Modify: `src/app/(public)/login/page.tsx`
- Create: `src/assets/images/<altana-logo-file>` or public asset if provided
- Verify: `e2e/login-brand-strip-alignment.spec.ts`

- [ ] **Step 1: Confirm whether Altana should be visible in the login brand strip**

This is a product decision, not an automatic requirement.

- [ ] **Step 2: If yes, add the logo using the current `LogoImage` pattern**

Keep the existing centered strip alignment behavior intact.

### Task 9: Review api routes and mocks impact

**Files:**
- Verify: `src/app/api/me/route.ts`
- Verify: `src/app/api/users/email/[email]/route.ts`
- Verify: `src/app/api/mock-backend/[...path]/route.ts`

- [ ] **Step 1: Confirm no production api route changes are needed**

Current state:
- api routes are session/user/mock helpers
- unit business data does not flow through app api routes

Expected:
- no production api route change for Altana

- [ ] **Step 2: Update mocks only if tests need Altana-specific fake data**

If new Playwright tests navigate to `/.../altana`, extend the mock backend/session fixtures accordingly.

### Task 10: Add regression coverage for Altana routing and visibility

**Files:**
- Modify or create: `e2e/rsc-navigation-dedup.spec.ts`
- Modify or create: `e2e/session-bootstrap.spec.ts`
- Modify or create: module-specific E2E or focused regression specs

- [ ] **Step 1: Add a route visibility check**

Cover:
- an Altana user lands on the correct default module URL
- admin can open Altana unit pages from the landing pages

- [ ] **Step 2: Add at least one data-loading smoke test**

Recommended:
- a lightweight mocked navigation to one Altana route, proving the page renders without 404/redirect loops

- [ ] **Step 3: Re-run existing auth/navigation tests**

At minimum:
- proxy/auth flow
- session bootstrap
- route dedup/navigation tests if the new slug participates there

### Task 11: Verification and rollout

**Files:**
- Verify all files from Tasks 2-10

- [ ] **Step 1: Run lint on the touched files**

Run:
```bash
npx eslint src/lib/access-control.ts src/http/api-client.ts
```

Add the rest of the touched files to the command based on the chosen path.

- [ ] **Step 2: Run focused Playwright coverage**

Run the relevant existing configs/specs plus the new Altana tests.

- [ ] **Step 3: Manual verification checklist**

Verify:
- Altana appears in settings unit selectors
- Altana user routing resolves to the right module and slug
- admin landing pages show Altana links
- all four Altana unit routes load
- login brand strip still aligns correctly if the logo was added

### Recommendation

Use the **core-unit path** unless Altana is functionally closer to `LIV` than to the existing shared units. The current codebase strongly favors shared integrations for non-LIV units, and that path minimizes file count, future maintenance, and test surface.
