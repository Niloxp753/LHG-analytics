/** @format */

import { auth_api } from '@/http/api-client';
import { AUTH_CACHE_TAGS } from '@/lib/cache-tags';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const AUTH_PATHS_TO_REVALIDATE = [
	'/settings',
	'/general',
	'/operational',
	'/reservations',
	'/restaurant',
] as const;

function buildCookieHeader(request: NextRequest): string | null {
	const accessToken = request.cookies.get('access_token')?.value;
	const refreshToken = request.cookies.get('refresh_token')?.value;
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

function expireAuthCookies(response: NextResponse) {
	response.cookies.set({
		name: 'access_token',
		value: '',
		maxAge: 0,
		path: '/',
	});
	response.cookies.set({
		name: 'refresh_token',
		value: '',
		maxAge: 0,
		path: '/',
	});
}

function invalidateAuthenticatedCache() {
	for (const tag of AUTH_CACHE_TAGS) {
		revalidateTag(tag, { expire: 0 });
	}

	for (const path of AUTH_PATHS_TO_REVALIDATE) {
		revalidatePath(path);
	}
}

export async function POST(request: NextRequest) {
	let upstreamOk = true;
	let upstreamStatus: number | undefined;
	let upstreamSetCookies: string[] = [];

	if (process.env.DISABLE_AUTH_COOKIES !== 'true') {
		const cookieHeader = buildCookieHeader(request);
		const headers: Record<string, string> = { accept: 'application/json' };
		if (cookieHeader) {
			headers.cookie = cookieHeader;
		}

		try {
			const upstreamResp = await auth_api.post('logout', {
				headers,
				throwHttpErrors: false,
				cache: 'no-store',
			});

			upstreamOk = upstreamResp.ok;
			upstreamStatus = upstreamResp.status;
			upstreamSetCookies = getSetCookies(upstreamResp.headers);
		} catch (error) {
			upstreamOk = false;
			console.error('logout route: upstream logout failed', error);
		}
	}

	try {
		invalidateAuthenticatedCache();
	} catch (error) {
		upstreamOk = false;
		console.error('logout route: cache invalidation failed', error);
	}

	const body: { ok: boolean; upstreamStatus?: number } = { ok: upstreamOk };
	if (typeof upstreamStatus === 'number') {
		body.upstreamStatus = upstreamStatus;
	}

	const response = NextResponse.json(body);

	for (const setCookie of upstreamSetCookies) {
		response.headers.append('set-cookie', setCookie);
	}

	expireAuthCookies(response);
	return response;
}
