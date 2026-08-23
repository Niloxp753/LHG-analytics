/** @format */

export type SessionUser = {
	email: string;
	name?: string;
	cpf?: string;
	unit?: string;
	role?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function sanitizeAndEnsureEmail(
	raw: Record<string, unknown>,
): SessionUser | null {
	const email = typeof raw.email === 'string' ? raw.email : null;

	if (!email) {
		return null;
	}

	return {
		email,
		...(typeof raw.name === 'string' ? { name: raw.name } : {}),
		...(typeof raw.cpf === 'string' ? { cpf: raw.cpf } : {}),
		...(typeof raw.unit === 'string' ? { unit: raw.unit } : {}),
		...(typeof raw.role === 'string' ? { role: raw.role } : {}),
	};
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
