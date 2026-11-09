import { HUB_PORTAL_URL, resolveHubLoginUrl } from '@/lib/auth-url';
import { getDefaultSessionHref } from '@/lib/session/default-route';
import type { SessionReadResult } from '@/lib/session/session-dal';

export type LoginRedirectInput = {
	hubError: string | null;
	returnTo: string | null;
	set: string | null;
	session: SessionReadResult;
};

// /login has no screen: every request is sent to the HUB, the HUB portal or
// the forced logout. Error outcomes never send back to the HUB login, because
// its single sign-on session would return the person immediately (a loop).
export function resolveLoginRedirect({
	hubError,
	returnTo,
	set,
	session,
}: LoginRedirectInput): string {
	if (hubError !== null) {
		return HUB_PORTAL_URL;
	}

	if (
		session.status === 'unavailable' ||
		(session.status === 'unauthenticated' && session.reason === 'forbidden')
	) {
		return '/api/session/logout';
	}

	if (session.status === 'authenticated') {
		const defaultHref = getDefaultSessionHref(session.user, set);
		return defaultHref === '/login' ? HUB_PORTAL_URL : defaultHref;
	}

	return resolveHubLoginUrl(returnTo) ?? HUB_PORTAL_URL;
}
