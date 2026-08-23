import 'server-only';

import { isAdmin } from '@/lib/access-control';
import { readSession } from '@/lib/session/session-dal';
import { SessionUnavailableError } from '@/lib/session/session-errors';
import type { SessionUser } from '@/lib/session-user';

export type AdminActionAuthorizationFailure = 'unauthorized' | 'forbidden';

export class AdminActionAuthorizationError extends Error {
	readonly authorizationFailure: AdminActionAuthorizationFailure;

	constructor(authorizationFailure: AdminActionAuthorizationFailure) {
		super(
			authorizationFailure === 'unauthorized'
				? 'Authentication is required for this action'
				: 'ADMIN authorization is required for this action',
		);
		this.name = 'AdminActionAuthorizationError';
		this.authorizationFailure = authorizationFailure;
	}
}

export async function requireAdminSession(): Promise<SessionUser> {
	const session = await readSession();

	if (session.status === 'unavailable') {
		throw new SessionUnavailableError();
	}

	if (session.status === 'unauthenticated') {
		throw new AdminActionAuthorizationError(
			session.reason === 'forbidden' ? 'forbidden' : 'unauthorized',
		);
	}

	if (!isAdmin(session.user)) {
		throw new AdminActionAuthorizationError('forbidden');
	}

	return session.user;
}
