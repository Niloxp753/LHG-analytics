import 'server-only';

import { AdminActionAuthorizationError, requireAdminSession } from '@/lib/require-auth';
import { SessionUnavailableError } from '@/lib/session/session-errors';
import { UserUpstreamError } from '@/http/user/user-upstream-error';
import { type UserActionFailure, userActionFailure } from './user-action-result';

export async function authorizeAdminAction(): Promise<UserActionFailure | null> {
	try {
		await requireAdminSession();
		return null;
	} catch (error) {
		if (error instanceof AdminActionAuthorizationError) {
			return userActionFailure(
				error.authorizationFailure === 'forbidden' ? 'FORBIDDEN' : 'UNAUTHORIZED',
			);
		}
		if (error instanceof SessionUnavailableError) {
			return userActionFailure('SESSION_UNAVAILABLE');
		}
		throw error;
	}
}

export function upstreamActionFailure(error: unknown): UserActionFailure {
	if (error instanceof UserUpstreamError) {
		return userActionFailure('UPSTREAM_ERROR');
	}
	throw error;
}
