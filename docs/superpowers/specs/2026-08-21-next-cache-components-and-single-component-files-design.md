# Next.js 16 Cache Components and Single-Component Files

**Date:** 2026-08-21

## Goal

Correct the dashboard's Next.js 16 Cache Components architecture so that every dashboard route ships a meaningful static shell, dashboard KPI requests gain effective server-side caching, and project-owned React files contain at most one component declaration.

The change must preserve the pending Getan Garavelo and LIV work already present in the worktree.

## Current Problems

The dashboard layout reads `headers()` before rendering the session provider and wraps the whole dashboard tree in a `Suspense` boundary with a `null` fallback. This makes the prerendered dashboard HTML effectively empty even though the build reports partial prerendering.

All ten cached HTTP readers currently use `use cache: private`. Next.js never stores private-cache results on the server, so the eight KPI readers do not reduce repeated backend work across server renders. The `dashboard_fast` profile also declares a 10-second client stale period, below the 30-second minimum used by private runtime prefetching.

The cache policy is abstracted through `applyPrivateDashboardCache`, which hides `cacheLife` and `cacheTag` away from the cached functions.

Enabling `react/no-multi-comp` against project-owned source currently identifies 54 additional component declarations across 44 files. Generated or installed shadcn files under `src/components/ui/**` account for a separate set of violations and are intentionally out of scope.

## Chosen Architecture

### Static dashboard shell and streamed session hydration

The dashboard layout will synchronously render a client-side session store provider with an initially empty store. The provider itself does not read request data and therefore can be part of the static shell.

A small async Server Component will read the session header and return a client hydration-effects component. Only this server component will sit behind the request-time `Suspense` boundary. It renders no visible UI.

The resulting tree is:

```text
Dashboard layout
└── Static session store provider
    ├── Suspense(null)
    │   └── Dynamic session-header reader
    │       └── Client session hydration effects
    └── Static dashboard shell
        ├── Navigation fallbacks
        └── Route content and KPI fallbacks
```

While the dynamic session value streams, session-aware controls read the existing `idle` state and show their current loading or disabled behavior. When a user is present, the hydration effect writes it into the store. When the header has no user, the effect runs the existing client hydration flow. The existing periodic refresh behavior remains active after authentication.

This keeps request-specific data out of the static path without duplicating the dashboard tree.

### Cache classification

The eight company, reservations, restaurant, and operational KPI readers will use regular `use cache`. Each cached function will declare its own `cacheLife('dashboard')` and domain `cacheTag(...)` calls.

The authentication cookie will continue to be read outside the cached scope and passed as a serializable function argument. Next.js will therefore include the cookie, date range, unit, and function identity in the cache key. KPI entries may remain in the server cache for the configured profile lifetime, up to five minutes, without being reused across different authentication-cookie values.

The two user readers will continue to use `use cache: private` because they return user records. They will declare `cacheLife('dashboard_fast')` and `cacheTag('users')` directly. `dashboard_fast.stale` will increase from 10 to 30 seconds so the profile meets the Next.js minimum.

The obsolete `src/http/cache-profiles.ts` abstraction will be removed. Existing fetch error handling stays outside the cached functions and continues to convert backend, timeout, and unexpected failures to the current return values.

### Instant navigation validation

Every dashboard `page.tsx` will export:

```ts
export const unstable_instant = { prefetch: 'static' }
```

This export does not create the static shell and is not required for caching. It instructs Next.js to validate during development and production builds that every shared-layout entry point can produce an instant static shell. The project accepts the draft/experimental API as a build-time regression guard.

## One Component per Project-Owned File

The flat ESLint configuration will enable `react/no-multi-comp: 'error'` for project-owned JSX and TSX source. `src/components/ui/**` will be explicitly excluded because it contains generated or installed compound components from shadcn and Radix-based wrappers. Any future externally generated source must receive an explicit, narrow ignore rather than weakening the project-wide rule.

All 54 current project-owned violations will be resolved. Extracted components will be colocated with their current consumers and will retain their existing public names, props, rendering order, and behavior. Route files will contain only the route component plus non-component types and route configuration. Async search-parameter adapters, KPI content components, fallbacks, dashboard shell pieces, session effects, and settings content will each move to focused files.

Utility functions, types, constants, and inline collection callbacks may remain beside a component when they are not themselves React components.

## Data and Error Flow

1. Next.js returns the static dashboard shell and the closest KPI/navigation fallbacks.
2. The session-header reader resolves at request time inside its narrow `Suspense` boundary.
3. The client hydration effect updates the shared session store without replacing the visible route tree.
4. Dashboard data wrappers read the authentication cookie outside cached scopes.
5. KPI cached functions use the cookie and query arguments as their cache key and fetch only on a miss or revalidation.
6. User-reader results remain browser-memory-only through `use cache: private`.
7. Existing error boundaries, empty states, and logging continue to handle unavailable backend data.

## Testing Strategy

Implementation will follow test-driven development.

1. Update the dashboard navigation regression test to use `@next/playwright`'s `instant()` helper and assert meaningful page shell content before dynamic work is released. Confirm it fails against the current whole-layout session boundary.
2. Enable `react/no-multi-comp` with the shadcn exclusion and confirm lint fails on the existing project-owned violations before extracting components.
3. Add or adapt focused cache tests so repeated requests with the same serialized cache inputs demonstrate reuse while distinct authentication inputs remain isolated.
4. Add `unstable_instant` to dashboard routes and use the Next.js production build as structural validation for all entry points.
5. Run relevant Playwright suites, full ESLint, TypeScript checking, and the production build.
6. Inspect representative generated dashboard HTML to confirm it contains meaningful route markup or fallbacks rather than only metadata and a null placeholder.

## Success Criteria

- Representative dashboard HTML contains a visible, meaningful static shell.
- Session-aware navigation still hydrates with the authenticated user and refreshes as before.
- KPI readers use server caching keyed by authentication and query inputs.
- User readers remain private and use a valid 30-second-or-greater stale period.
- `next build` validates every dashboard route through `unstable_instant`.
- ESLint reports no `react/no-multi-comp` violations in project-owned source while tolerating `src/components/ui/**`.
- Existing Getan Garavelo and LIV behavior remains covered and passing.

## References

- [Next.js caching guide](https://nextjs.org/docs/app/getting-started/caching)
- [Next.js `use cache: private`](https://nextjs.org/docs/app/api-reference/directives/use-cache-private)
- [Next.js instant navigation guide](https://nextjs.org/docs/app/guides/instant-navigation)
- [Next.js `unstable_instant` route configuration](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config/instant)
