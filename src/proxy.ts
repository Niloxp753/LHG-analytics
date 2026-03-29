/** @format */

import {
	canAccessModule,
	getDefaultModule,
	isAdmin,
	MODULE_TO_PATH,
	normalizeUnit,
	PATH_TO_MODULE,
	UNIT_SLUG_TO_UNIT,
	UNIT_TO_SLUG,
} from '@/lib/access-control';
import { normalizeRangeTag } from '@/lib/date-range';
import {
	encodeSessionUserHeader,
	extractSessionUser,
	SESSION_USER_HEADER,
	type SessionUser,
} from '@/lib/session-user';
import { NextRequest, NextResponse } from 'next/server';

const authUrl = process.env.NEXT_PUBLIC_AUTH_URL;

function buildCookieHeader(
	accessToken?: string,
	refreshToken?: string,
): string | null {
	const parts = [
		accessToken ? `access_token=${accessToken}` : null,
		refreshToken ? `refresh_token=${refreshToken}` : null,
	].filter(Boolean);

	return parts.length ? parts.join('; ') : null;
}

function parseCookieHeader(value: string | null): Map<string, string> {
	const parsed = new Map<string, string>();
	if (!value) {
		return parsed;
	}

	value
		.split(';')
		.map((part) => part.trim())
		.filter(Boolean)
		.forEach((part) => {
			const separatorIndex = part.indexOf('=');
			if (separatorIndex <= 0) {
				return;
			}

			const name = part.slice(0, separatorIndex).trim();
			const cookieValue = part.slice(separatorIndex + 1).trim();
			if (!name) {
				return;
			}

			parsed.set(name, cookieValue);
		});

	return parsed;
}

function parseSetCookieHeader(value: string): {
	name: string;
	cookieValue: string;
	expired: boolean;
} | null {
	const parts = value
		.split(';')
		.map((part) => part.trim())
		.filter(Boolean);

	if (!parts.length) {
		return null;
	}

	const [nameAndValue, ...attributes] = parts;
	const separatorIndex = nameAndValue.indexOf('=');
	if (separatorIndex <= 0) {
		return null;
	}

	const name = nameAndValue.slice(0, separatorIndex).trim();
	const cookieValue = nameAndValue.slice(separatorIndex + 1).trim();
	if (!name) {
		return null;
	}

	let expired = false;

	for (const attribute of attributes) {
		const [rawKey, ...rawValueParts] = attribute.split('=');
		const key = rawKey.trim().toLowerCase();
		const rawValue = rawValueParts.join('=').trim();

		if (key === 'max-age' && rawValue === '0') {
			expired = true;
			continue;
		}

		if (key === 'expires' && rawValue) {
			const expiresAt = new Date(rawValue);
			if (!Number.isNaN(expiresAt.getTime()) && expiresAt.getTime() <= Date.now()) {
				expired = true;
			}
		}
	}

	return { name, cookieValue, expired };
}

function mergeCookieHeader(
	currentCookieHeader: string | null,
	setCookies: string[],
): string | null {
	const merged = parseCookieHeader(currentCookieHeader);

	setCookies.forEach((setCookie) => {
		const parsed = parseSetCookieHeader(setCookie);
		if (!parsed) {
			return;
		}

		if (parsed.expired) {
			merged.delete(parsed.name);
			return;
		}

		merged.set(parsed.name, parsed.cookieValue);
	});

	if (!merged.size) {
		return null;
	}

	return Array.from(merged.entries())
		.map(([name, value]) => `${name}=${value}`)
		.join('; ');
}

function getSetCookies(headers: Headers): string[] {
	const anyHeaders = headers as Headers & { getSetCookie?: () => string[] };
	if (typeof anyHeaders.getSetCookie === 'function') {
		return anyHeaders.getSetCookie();
	}

	const combined = headers.get('set-cookie');
	return combined ? [combined] : [];
}

function applySetCookies(response: NextResponse, cookies: string[]) {
	cookies.forEach((value) => {
		response.headers.append('set-cookie', value);
	});
}

async function getAuthUser(
	request: NextRequest,
	options: { allowRefresh: boolean },
): Promise<{
	user: SessionUser | null;
	setCookies: string[];
	requestCookieHeader: string | null;
}> {
	const accessToken = request.cookies.get('access_token')?.value;
	const refreshToken = request.cookies.get('refresh_token')?.value;
	const cookieHeader = buildCookieHeader(accessToken, refreshToken);

	if (!authUrl || !cookieHeader) {
		return { user: null, setCookies: [], requestCookieHeader: cookieHeader };
	}

	try {
		if (accessToken) {
			const meResp = await fetch(`${authUrl}/api/me`, {
				method: 'GET',
				headers: {
					accept: 'application/json',
					cookie: cookieHeader,
				},
				cache: 'no-store',
			});

			if (meResp.ok) {
				const data = await meResp.json().catch(() => null);
				const user = extractSessionUser(data);
				if (user) {
					return {
						user,
						setCookies: [],
						requestCookieHeader: cookieHeader,
					};
				}
			}
		}

		if (!options.allowRefresh) {
			return { user: null, setCookies: [], requestCookieHeader: cookieHeader };
		}

		const refreshResp = await fetch(`${authUrl}/api/refresh`, {
			method: 'POST',
			headers: {
				accept: 'application/json',
				cookie: cookieHeader,
			},
			cache: 'no-store',
		});

		if (!refreshResp.ok) {
			return { user: null, setCookies: [], requestCookieHeader: cookieHeader };
		}

		const refreshData = await refreshResp.json().catch(() => null);
		const user = extractSessionUser(refreshData);
		const setCookies = getSetCookies(refreshResp.headers);
		const requestCookieHeader =
			mergeCookieHeader(cookieHeader, setCookies) ?? cookieHeader;
		if (!user) {
			return { user: null, setCookies, requestCookieHeader };
		}

		return {
			user,
			setCookies,
			requestCookieHeader,
		};
	} catch {
		return { user: null, setCookies: [], requestCookieHeader: cookieHeader };
	}
}

function buildDefaultRoute(request: NextRequest, user: SessionUser): URL {
	const url = request.nextUrl.clone();
	const mappedSet = normalizeRangeTag(url.searchParams.get('set'));

	if (isAdmin(user)) {
		url.pathname = '/general';
		url.search = '';
		url.searchParams.set('menu', 'general');
		url.searchParams.set('set', mappedSet);
		return url;
	}

	const moduleKey = getDefaultModule(user.role ?? '');
	const normalizedUnit = normalizeUnit(user.unit);
	const unitSlug =
		normalizedUnit && normalizedUnit in UNIT_TO_SLUG
			? UNIT_TO_SLUG[normalizedUnit as keyof typeof UNIT_TO_SLUG]
			: null;

	if (!moduleKey || !unitSlug || !canAccessModule(user, moduleKey)) {
		url.pathname = '/login';
		url.search = '';
		return url;
	}

	const modulePath = MODULE_TO_PATH[moduleKey];
	url.pathname = `/${modulePath}/${unitSlug}`;
	url.search = '';
	url.searchParams.set('menu', modulePath);
	url.searchParams.set('set', mappedSet);
	return url;
}

function buildNextResponse(
	request: NextRequest,
	auth: {
		user: SessionUser | null;
		setCookies: string[];
		requestCookieHeader: string | null;
	},
): NextResponse {
	const requestHeaders = new Headers(request.headers);
	const encodedUser = encodeSessionUserHeader(auth.user);

	if (auth.requestCookieHeader) {
		requestHeaders.set('cookie', auth.requestCookieHeader);
	} else {
		requestHeaders.delete('cookie');
	}

	if (encodedUser) {
		requestHeaders.set(SESSION_USER_HEADER, encodedUser);
	} else {
		requestHeaders.delete(SESSION_USER_HEADER);
	}

	const response = NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});
	applySetCookies(response, auth.setCookies);
	return response;
}

export async function proxy(request: NextRequest) {
	const normalizeUrl = request.nextUrl.clone();
	const rawSet = normalizeUrl.searchParams.get('set');
	if (rawSet) {
		const normalizedSet = normalizeRangeTag(rawSet);
		if (normalizedSet !== rawSet) {
			normalizeUrl.searchParams.set('set', normalizedSet);
			return NextResponse.redirect(normalizeUrl);
		}
	}

	const pathname = request.nextUrl.pathname;
	const segments = pathname.split('/').filter(Boolean);

	const shouldAllowRefresh = pathname !== '/login';
	const auth = await getAuthUser(request, {
		allowRefresh: shouldAllowRefresh,
	});

	if (pathname === '/login') {
		if (!auth.user) {
			return NextResponse.next();
		}

		const redirectUrl = buildDefaultRoute(request, auth.user);
		if (redirectUrl.pathname === '/login') {
			const response = NextResponse.next();
			applySetCookies(response, auth.setCookies);
			return response;
		}
		const response = NextResponse.redirect(redirectUrl);
		applySetCookies(response, auth.setCookies);
		return response;
	}

	if (pathname === '/') {
		if (!auth.user) {
			const url = request.nextUrl.clone();
			url.pathname = '/login';
			return NextResponse.redirect(url);
		}

		const redirectUrl = buildDefaultRoute(request, auth.user);
		const response = NextResponse.redirect(redirectUrl);
		applySetCookies(response, auth.setCookies);
		return response;
	}

	if (!auth.user) {
		const url = request.nextUrl.clone();
		url.pathname = '/login';
		return NextResponse.redirect(url);
	}

	if (isAdmin(auth.user)) {
		return buildNextResponse(request, auth);
	}

	if (pathname === '/settings') {
		const redirectUrl = buildDefaultRoute(request, auth.user);
		const response = NextResponse.redirect(redirectUrl);
		applySetCookies(response, auth.setCookies);
		return response;
	}

	const modulePath = segments[0];
	const moduleKey =
		modulePath && modulePath in PATH_TO_MODULE
			? PATH_TO_MODULE[modulePath as keyof typeof PATH_TO_MODULE]
			: null;

	if (!moduleKey) {
		return buildNextResponse(request, auth);
	}

	if (segments.length === 1) {
		const redirectUrl = buildDefaultRoute(request, auth.user);
		const response = NextResponse.redirect(redirectUrl);
		applySetCookies(response, auth.setCookies);
		return response;
	}

	const unitSlug = segments[1];
	const targetUnit =
		unitSlug && unitSlug in UNIT_SLUG_TO_UNIT
			? UNIT_SLUG_TO_UNIT[unitSlug as keyof typeof UNIT_SLUG_TO_UNIT]
			: null;

	if (!targetUnit) {
		const redirectUrl = buildDefaultRoute(request, auth.user);
		const response = NextResponse.redirect(redirectUrl);
		applySetCookies(response, auth.setCookies);
		return response;
	}

	if (normalizeUnit(auth.user.unit) !== targetUnit) {
		const redirectUrl = buildDefaultRoute(request, auth.user);
		const response = NextResponse.redirect(redirectUrl);
		applySetCookies(response, auth.setCookies);
		return response;
	}

	if (!canAccessModule(auth.user, moduleKey)) {
		const redirectUrl = buildDefaultRoute(request, auth.user);
		const response = NextResponse.redirect(redirectUrl);
		applySetCookies(response, auth.setCookies);
		return response;
	}

	return buildNextResponse(request, auth);
}

export const config = {
	// Protect all pages (no public routes), excluding Next internals and static assets.
	matcher: [
		'/((?!api|_next|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|map|txt|xml|woff|woff2|ttf|otf)$).*)',
	],
};
