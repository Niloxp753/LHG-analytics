/** @format */

'use client';

import { getMeWithCookies, getUserByEmailWithCookies } from '@/lib/auth-client';
import { create } from 'zustand';

export type SessionUser = {
	email: string;
	name?: string;
	cpf?: string;
	unit?: string;
	role?: string;
	[key: string]: unknown;
};

export type SessionStatus = 'idle' | 'loading' | 'authed' | 'unauthed';

type SessionStore = {
	status: SessionStatus;
	user: SessionUser | null;
	error: string | null;
	setUser: (user: SessionUser | null) => void;
	clear: () => void;
	hydrate: () => Promise<void>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function sanitizeUser(raw: Record<string, unknown>): SessionUser {
	const {
		id: _id,
		password: _password,
		createdAt: _createdAt,
		updatedAt: _updatedAt,
		...rest
	} = raw;
	return rest as SessionUser;
}

let inflightHydrate: Promise<void> | null = null;

export const useSessionStore = create<SessionStore>((set) => ({
	status: 'idle',
	user: null,
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

				const meResp = await getMeWithCookies();
				if (!meResp.ok || !meResp.data || !isRecord(meResp.data)) {
					set({
						user: null,
						status: 'unauthed',
						error: meResp.ok ? null : 'Not authenticated',
					});
					return;
				}

				const email =
					typeof meResp.data.email === 'string' ? meResp.data.email : null;
				if (!email) {
					set({ user: null, status: 'unauthed', error: 'Missing email' });
					return;
				}

				const fullResp = await getUserByEmailWithCookies(email);
				if (fullResp.ok && fullResp.data && isRecord(fullResp.data)) {
					const sanitized = sanitizeUser(fullResp.data);
					const ensuredEmail =
						typeof sanitized.email === 'string' ? sanitized.email : email;
					set({
						user: { ...sanitized, email: ensuredEmail },
						status: 'authed',
						error: null,
					});
					return;
				}

				const fallback = sanitizeUser(meResp.data);
				set({
					user: { ...fallback, email },
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
}));
