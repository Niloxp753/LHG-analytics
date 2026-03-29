# Task 02 Design: Enriched Session On First Render

## Context

The dashboard is protected by `proxy.ts`, which already calls `auth/api/me` on the server to authorize navigation. After the page mounts in the browser, the client store runs `hydrate()` and calls `api/me` again, then calls `api/users/email/:email` to enrich the user object.

## Problem

The application resolves the same session twice during the initial dashboard load:

- server-side in `proxy.ts` for authorization
- client-side in `session-store.ts` for bootstrap

This adds redundant network work and delays the moment when the client has the enriched user object. The desired product behavior is to have the enriched session available on the first dashboard render.

## Goal

Keep route protection in `proxy.ts`, but make the server the single source of truth for the initial dashboard session. The client should start with an enriched user snapshot and should not call `/api/me` again during the first dashboard mount.

## Approach

1. `proxy.ts` authenticates as today.
2. While still on the server, it resolves the enriched session snapshot:
   - base session from `auth/api/me`
   - full user from `auth/api/users/email/:email` when available
   - fallback to the base session payload when enrichment fails
3. The proxy forwards this snapshot to the request via an internal request header.
4. The server layout reads the snapshot and passes it into the session provider.
5. The session store is initialized with that snapshot for the first dashboard render.
6. Automatic `hydrate()` on mount is skipped when an initial enriched user already exists.
7. Periodic refresh remains in place for later session updates.

## Scope

- refactor session bootstrap around a provider-backed Zustand store instance
- pass `initialUser` from server layout to the client provider
- stop initial dashboard mount from calling `/api/me` and `/api/users/email/:email`
- preserve login/logout and periodic refresh behavior

## Non-goals

- removing proxy-based route protection
- redesigning the authentication backend contract
- removing the later refresh flow

## Acceptance Criteria

- dashboard first mount has access to an enriched user snapshot
- browser-side initial load does not call `/api/me`
- browser-side initial load does not call `/api/users/email/:email`
- session-dependent UI still renders correctly
- login flow and logout flow continue to work
- a regression test fails before the fix and passes after the fix
