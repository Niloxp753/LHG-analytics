/** @format */

'use client';

import {
	getMeWithCookies,
	getUserByEmailWithCookies,
	refreshWithCookies,
} from '@/lib/auth-client';
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
	refresh: () => Promise<void>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function sanitizeUser(raw: Record<string, unknown>): SessionUser {
	const sanitized = { ...raw };
	delete sanitized.id;
	delete sanitized.password;
	delete sanitized.createdAt;
	delete sanitized.updatedAt;
	return sanitized as SessionUser;
}

function sanitizeAndEnsureEmail(
	raw: Record<string, unknown>,
): SessionUser | null {
	const sanitized = sanitizeUser(raw);
	const email =
		typeof sanitized.email === 'string'
			? sanitized.email
			: typeof raw.email === 'string'
			? raw.email
			: null;

	if (!email) {
		return null;
	}

	return { ...sanitized, email };
}

function extractUserFromPayload(payload: unknown): SessionUser | null {
	if (!isRecord(payload)) {
		return null;
	}

	if (isRecord(payload.user)) {
		return sanitizeAndEnsureEmail(payload.user);
	}

	return sanitizeAndEnsureEmail(payload);
}

async function resolveFullUserByEmail(
	email: string,
	fallback: SessionUser,
): Promise<SessionUser> {
	const fullResp = await getUserByEmailWithCookies(email);
	if (fullResp.ok && fullResp.data && isRecord(fullResp.data)) {
		const sanitized = sanitizeUser(fullResp.data);
		const ensuredEmail =
			typeof sanitized.email === 'string' ? sanitized.email : email;
		return { ...sanitized, email: ensuredEmail };
	}

	return fallback;
}

async function resolveSessionFromMe(): Promise<{
	user: SessionUser | null;
	error: string | null;
	meOk: boolean;
}> {
	const meResp = await getMeWithCookies();
	if (!meResp.ok || !meResp.data || !isRecord(meResp.data)) {
		return {
			user: null,
			error: meResp.ok ? null : 'Not authenticated',
			meOk: meResp.ok,
		};
	}

	const email =
		typeof meResp.data.email === 'string' ? meResp.data.email : null;
	if (!email) {
		return { user: null, error: 'Missing email', meOk: true };
	}

	const fallback = sanitizeUser(meResp.data);
	const fallbackWithEmail = { ...fallback, email };
	const user = await resolveFullUserByEmail(email, fallbackWithEmail);
	return { user, error: null, meOk: true };
}

let inflightHydrate: Promise<void> | null = null;
let inflightRefresh: Promise<void> | null = null;

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

				const refreshedUser = extractUserFromPayload(refreshResp.data);
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

				const refreshedUser = extractUserFromPayload(refreshResp.data);
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
