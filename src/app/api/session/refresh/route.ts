import {
	appendSetCookies,
	expireAuthCookies,
	getSetCookies,
	mergeCookieHeader,
} from '@/lib/auth-cookie';
import { resolveAuthApiBaseUrl } from '@/lib/auth-url';
import { sanitizeSessionReturnTo } from '@/lib/session/return-to';
import { extractSessionUser } from '@/lib/session-user';
import { NextRequest, NextResponse } from 'next/server';

const CACHE_CONTROL =
	'private, no-store, no-cache, max-age=0, must-revalidate';
const FAILURE_REASON = 'session_refresh_failed';
const UPSTREAM_TIMEOUT_MS = 5_000;

async function runWithTimeout<T>(
	operation: (signal: AbortSignal) => Promise<T>,
): Promise<T> {
	const abortController = new AbortController();
	const timeout = setTimeout(
		() => abortController.abort(),
		UPSTREAM_TIMEOUT_MS,
	);

	try {
		return await operation(abortController.signal);
	} finally {
		clearTimeout(timeout);
	}
}

function createRejectedResponse() {
	const response = new NextResponse(null, { status: 403 });
	response.headers.set('cache-control', CACHE_CONTROL);
	return response;
}

function createRedirect(request: NextRequest, destination: string) {
	const response = NextResponse.redirect(new URL(destination, request.url), 303);
	response.headers.set('cache-control', CACHE_CONTROL);
	return response;
}

function createFailureResponse(request: NextRequest) {
	const response = createRedirect(
		request,
		`/login?reason=${FAILURE_REASON}`,
	);
	expireAuthCookies(response, request);
	return response;
}

function isTrustedRefreshNavigation(request: NextRequest): boolean {
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

export async function GET(request: NextRequest) {
	const returnTo = sanitizeSessionReturnTo(
		request.nextUrl.searchParams.get('returnTo'),
	);

	if (!isTrustedRefreshNavigation(request)) {
		return createRejectedResponse();
	}

	const authApiBaseUrl = resolveAuthApiBaseUrl();
	const incomingCookieHeader = request.headers.get('cookie');
	if (!authApiBaseUrl || !incomingCookieHeader) {
		return createFailureResponse(request);
	}

	try {
		const refreshResponse = await runWithTimeout((signal) =>
			fetch(`${authApiBaseUrl}/refresh`, {
				method: 'POST',
				headers: {
					accept: 'application/json',
					cookie: incomingCookieHeader,
				},
				cache: 'no-store',
				signal,
			}),
		);

		if (!refreshResponse.ok) {
			return createFailureResponse(request);
		}

		const refreshedSetCookies = getSetCookies(refreshResponse.headers);
		if (!refreshedSetCookies.length) {
			return createFailureResponse(request);
		}

		const verificationCookieHeader = mergeCookieHeader(
			incomingCookieHeader,
			refreshedSetCookies,
		);
		if (!verificationCookieHeader) {
			return createFailureResponse(request);
		}

		const verification = await runWithTimeout(async (signal) => {
			const response = await fetch(`${authApiBaseUrl}/me`, {
				method: 'GET',
				headers: {
					accept: 'application/json',
					cookie: verificationCookieHeader,
				},
				cache: 'no-store',
				signal,
			});

			if (!response.ok) {
				return { ok: false, user: null };
			}

			const user = extractSessionUser(await response.json());
			return { ok: true, user };
		});

		if (!verification.ok || !verification.user) {
			return createFailureResponse(request);
		}

		const response = createRedirect(request, returnTo);
		appendSetCookies(response, refreshedSetCookies);
		return response;
	} catch {
		return createFailureResponse(request);
	}
}
