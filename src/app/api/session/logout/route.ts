import { expireAuthCookies } from '@/lib/auth-cookie';
import { NextRequest, NextResponse } from 'next/server';

const CACHE_CONTROL =
	'private, no-store, no-cache, max-age=0, must-revalidate';
const FAILURE_REASON = 'session_validation_failed';

function isTrustedLogoutNavigation(request: NextRequest): boolean {
	const fetchSite = request.headers.get('sec-fetch-site');
	if (!fetchSite || !['same-origin', 'same-site', 'none'].includes(fetchSite)) {
		return false;
	}

	const origin = request.headers.get('origin');
	if (!origin) {
		return true;
	}

	try {
		return new URL(origin).origin === request.nextUrl.origin;
	} catch {
		return false;
	}
}

export function GET(request: NextRequest) {
	if (!isTrustedLogoutNavigation(request)) {
		const response = new NextResponse(null, { status: 403 });
		response.headers.set('cache-control', CACHE_CONTROL);
		return response;
	}

	const response = NextResponse.redirect(
		new URL(`/login?reason=${FAILURE_REASON}`, request.url),
		303,
	);
	response.headers.set('cache-control', CACHE_CONTROL);
	expireAuthCookies(response, request);
	return response;
}
