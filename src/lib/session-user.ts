/** @format */

export type SessionUser = {
	email: string;
	name?: string;
	cpf?: string;
	unit?: string;
	role?: string;
	[key: string]: unknown;
};

export const SESSION_USER_HEADER = 'x-session-user';

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

export function extractSessionUser(payload: unknown): SessionUser | null {
	if (!isRecord(payload)) {
		return null;
	}

	if (isRecord(payload.user)) {
		return sanitizeAndEnsureEmail(payload.user);
	}

	return sanitizeAndEnsureEmail(payload);
}

export function encodeSessionUserHeader(
	user: SessionUser | null | undefined,
): string | null {
	if (!user) {
		return null;
	}

	return encodeURIComponent(JSON.stringify(user));
}

export function decodeSessionUserHeader(
	value: string | null | undefined,
): SessionUser | null {
	if (!value) {
		return null;
	}

	try {
		return extractSessionUser(JSON.parse(decodeURIComponent(value)));
	} catch {
		return null;
	}
}
