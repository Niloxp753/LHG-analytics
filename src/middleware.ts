/** @format */

import { NextRequest, NextResponse } from 'next/server';
import {
	canAccessModule,
	getDefaultModule,
	isAdmin,
	MODULE_TO_PATH,
	PATH_TO_MODULE,
	UNIT_SLUG_TO_UNIT,
	UNIT_TO_SLUG,
} from '@/lib/access-control';

const authUrl = process.env.NEXT_PUBLIC_AUTH_URL;

type AuthUser = {
	role: string;
	unit: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function extractUser(payload: unknown): AuthUser | null {
	if (!isRecord(payload)) {
		return null;
	}

	const raw = isRecord(payload.user) ? payload.user : payload;
	if (!isRecord(raw)) {
		return null;
	}

	const role = typeof raw.role === 'string' ? raw.role : null;
	const unit = typeof raw.unit === 'string' ? raw.unit : null;
	if (!role || !unit) {
		return null;
	}

	return { role, unit };
}

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

async function getAuthUser(request: NextRequest): Promise<{
	user: AuthUser | null;
	setCookies: string[];
}> {
	const accessToken = request.cookies.get('access_token')?.value;
	const refreshToken = request.cookies.get('refresh_token')?.value;
	const cookieHeader = buildCookieHeader(accessToken, refreshToken);

	if (!accessToken || !authUrl || !cookieHeader) {
		return { user: null, setCookies: [] };
	}

	try {
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
			const user = extractUser(data);
			if (user) {
				return { user, setCookies: [] };
			}
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
			return { user: null, setCookies: [] };
		}

		const refreshData = await refreshResp.json().catch(() => null);
		const user = extractUser(refreshData);
		const setCookies = getSetCookies(refreshResp.headers);
		return { user, setCookies };
	} catch {
		return { user: null, setCookies: [] };
	}
}

function buildDefaultRoute(request: NextRequest, user: AuthUser): URL {
	const url = request.nextUrl.clone();
	const preSet = url.searchParams.get('set') ?? '7days';

	if (isAdmin(user)) {
		url.pathname = '/general';
		url.search = '';
		url.searchParams.set('menu', 'general');
		url.searchParams.set('set', preSet);
		return url;
	}

	const moduleKey = getDefaultModule(user.role);
	const unitSlug =
		user.unit in UNIT_TO_SLUG
			? UNIT_TO_SLUG[user.unit as keyof typeof UNIT_TO_SLUG]
			: null;

	if (!moduleKey || !unitSlug) {
		url.pathname = '/login';
		url.search = '';
		return url;
	}

	const modulePath = MODULE_TO_PATH[moduleKey];
	url.pathname = `/${modulePath}/${unitSlug}`;
	url.search = '';
	url.searchParams.set('menu', modulePath);
	url.searchParams.set('set', preSet);
	return url;
}

export async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const segments = pathname.split('/').filter(Boolean);

	const auth = await getAuthUser(request);

	if (pathname === '/login') {
		if (!auth.user) {
			return NextResponse.next();
		}

		const redirectUrl = buildDefaultRoute(request, auth.user);
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
		const response = NextResponse.next();
		applySetCookies(response, auth.setCookies);
		return response;
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
		const response = NextResponse.next();
		applySetCookies(response, auth.setCookies);
		return response;
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

	if (auth.user.unit !== targetUnit) {
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

	const response = NextResponse.next();
	applySetCookies(response, auth.setCookies);
	return response;
}

export const config = {
	// Protect all pages (no public routes), excluding Next internals and static assets.
	matcher: [
		'/((?!api|_next|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|map|txt|xml|woff|woff2|ttf|otf)$).*)',
	],
};
