/** @format */

'use client';

import type { SessionUser } from '@/lib/session-user';
import {
	getMeWithCookies,
	getUserByEmailWithCookies,
	refreshWithCookies,
} from '@/lib/auth-client';
import { extractSessionUser } from '@/lib/session-user';
import { createContext, useContext } from 'react';
import { useStore } from 'zustand';
import { createStore, type StoreApi } from 'zustand/vanilla';

export type SessionStatus = 'idle' | 'loading' | 'authed' | 'unauthed';

type SessionStoreState = {
	status: SessionStatus;
	user: SessionUser | null;
	error: string | null;
	setUser: (user: SessionUser | null) => void;
	clear: () => void;
	hydrate: () => Promise<void>;
	refresh: () => Promise<void>;
};

export type SessionStoreApi = StoreApi<SessionStoreState>;

async function resolveFullUserByEmail(
	email: string,
	fallback: SessionUser,
): Promise<SessionUser> {
	const fullResp = await getUserByEmailWithCookies(email);
	if (fullResp.ok && fullResp.data) {
		const resolved = extractSessionUser(fullResp.data);
		if (resolved) {
			return resolved.email ? resolved : { ...resolved, email };
		}
	}

	return fallback;
}

async function resolveSessionFromMe(): Promise<{
	user: SessionUser | null;
	error: string | null;
	meOk: boolean;
}> {
	const meResp = await getMeWithCookies();
	if (!meResp.ok || !meResp.data) {
		return {
			user: null,
			error: meResp.ok ? null : 'Not authenticated',
			meOk: meResp.ok,
		};
	}

	const baseUser = extractSessionUser(meResp.data);
	if (!baseUser?.email) {
		return { user: null, error: 'Missing email', meOk: true };
	}

	const user = await resolveFullUserByEmail(baseUser.email, baseUser);
	return { user, error: null, meOk: true };
}

let inflightHydrate: Promise<void> | null = null;
let inflightRefresh: Promise<void> | null = null;

export function createSessionStore(
	initialUser: SessionUser | null = null,
): SessionStoreApi {
	return createStore<SessionStoreState>((set) => ({
		status: initialUser ? 'authed' : 'idle',
		user: initialUser,
		error: null,
		setUser: (user) =>
			set({
				user,
				status: user ? 'authed' : 'unauthed',
				error: null,
			}),
		clear: () => set({ user: null, status: 'unauthed', error: null }),
		hydrate: async () => {
			if (inflightHydrate) return inflightHydrate;

			inflightHydrate = (async () => {
				try {
					set({ status: 'loading', error: null });

					const result = await resolveSessionFromMe();
					if (result.user || result.meOk) {
						set({
							user: result.user,
							status: result.user ? 'authed' : 'unauthed',
							error: result.error,
						});
						return;
					}

					const refreshResp = await refreshWithCookies();
					if (!refreshResp.ok) {
						set({
							user: null,
							status: 'unauthed',
							error: null,
						});
						return;
					}

					const refreshedUser = extractSessionUser(refreshResp.data);
					if (!refreshedUser) {
						set({
							user: null,
							status: 'unauthed',
							error: null,
						});
						return;
					}

					const fullUser = await resolveFullUserByEmail(
						refreshedUser.email,
						refreshedUser,
					);
					set({
						user: fullUser,
						status: 'authed',
						error: null,
					});
				} catch (error) {
					set({
						user: null,
						status: 'unauthed',
						error:
							error instanceof Error ? error.message : 'Failed to load session',
					});
				}
			})();

			try {
				await inflightHydrate;
			} finally {
				inflightHydrate = null;
			}
		},
		refresh: async () => {
			if (inflightRefresh) return inflightRefresh;

			inflightRefresh = (async () => {
				if (inflightHydrate) {
					await inflightHydrate;
				}

				try {
					const refreshResp = await refreshWithCookies();
					if (!refreshResp.ok) {
						set({
							user: null,
							status: 'unauthed',
							error: null,
						});
						return;
					}

					const refreshedUser = extractSessionUser(refreshResp.data);
					if (!refreshedUser) {
						set({
							user: null,
							status: 'unauthed',
							error: null,
						});
						return;
					}

					const fullUser = await resolveFullUserByEmail(
						refreshedUser.email,
						refreshedUser,
					);
					set({
						user: fullUser,
						status: 'authed',
						error: null,
					});
				} catch (error) {
					set({
						user: null,
						status: 'unauthed',
						error:
							error instanceof Error
								? error.message
								: 'Failed to refresh session',
					});
				}
			})();

			try {
				await inflightRefresh;
			} finally {
				inflightRefresh = null;
			}
		},
	}));
}

export const SessionStoreContext = createContext<SessionStoreApi | null>(null);

export function useSessionStore<T>(
	selector: (state: SessionStoreState) => T,
): T {
	const store = useContext(SessionStoreContext);

	if (!store) {
		throw new Error('useSessionStore deve ser usado dentro de SessionStoreProvider');
	}

	return useStore(store, selector);
}

export function useSessionStoreApi(): SessionStoreApi {
	const store = useContext(SessionStoreContext);

	if (!store) {
		throw new Error(
			'useSessionStoreApi deve ser usado dentro de SessionStoreProvider',
		);
	}

	return store;
}
