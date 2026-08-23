import 'server-only';

import { canAccessRoute } from '@/lib/access-control';
import { getDefaultSessionHref } from '@/lib/session/default-route';
import { DASHBOARD_REQUEST_PATH_HEADER } from '@/lib/session/request-path';
import { sanitizeSessionReturnTo } from '@/lib/session/return-to';
import { requireDashboardSession } from '@/lib/session/session-dal';
import type { SessionUser } from '@/lib/session-user';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function requireAuthorizedDashboardSession(): Promise<SessionUser> {
	const requestHeaders = await headers();
	const requestPath = requestHeaders.get(DASHBOARD_REQUEST_PATH_HEADER);
	const user = await requireDashboardSession();
	const sanitizedRequestPath = sanitizeSessionReturnTo(requestPath);

	if (
		!requestPath ||
		requestPath === '/' ||
		sanitizedRequestPath !== requestPath
	) {
		redirect(getDefaultSessionHref(user));
	}

	if (!canAccessRoute(user, sanitizedRequestPath)) {
		redirect(getDefaultSessionHref(user));
	}

	return user;
}
