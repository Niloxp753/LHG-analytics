/** @format */

'use client';

import type { SessionUser } from '@/lib/session-user';
import { createContext, useContext } from 'react';
import { useStore } from 'zustand';
import { createStore, type StoreApi } from 'zustand/vanilla';

export type SessionStatus = 'idle' | 'loading' | 'authed' | 'unauthed';

type SessionStoreState = {
	status: SessionStatus;
	user: SessionUser | null;
	setUser: (user: SessionUser | null) => void;
	clear: () => void;
};

export type SessionStoreApi = StoreApi<SessionStoreState>;

export function createSessionStore(
	initialUser: SessionUser | null = null,
): SessionStoreApi {
	return createStore<SessionStoreState>((set) => ({
		status: initialUser ? 'authed' : 'idle',
		user: initialUser,
		setUser: (user) =>
			set({
				user,
				status: user ? 'authed' : 'unauthed',
			}),
		clear: () => set({ user: null, status: 'unauthed' }),
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
