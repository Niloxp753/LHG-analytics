/** @format */

import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const authUrl = process.env.NEXT_PUBLIC_AUTH_URL;

type CookieOptions = {
	path?: string;
	domain?: string;
	expires?: Date;
	maxAge?: number;
	httpOnly?: boolean;
	secure?: boolean;
	sameSite?: 'lax' | 'strict' | 'none';
};

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

function parseSetCookie(value: string): {
	name: string;
	cookieValue: string;
	options: CookieOptions;
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

	const options: CookieOptions = {};

	for (const attribute of attributes) {
		const [rawKey, ...rawValueParts] = attribute.split('=');
		const key = rawKey.trim().toLowerCase();
		const rawValue = rawValueParts.join('=').trim();

		if (key === 'path' && rawValue) {
			options.path = rawValue;
			continue;
		}
		if (key === 'domain' && rawValue) {
			options.domain = rawValue;
			continue;
		}
		if (key === 'max-age' && rawValue) {
			const maxAge = Number(rawValue);
			if (Number.isFinite(maxAge)) {
				options.maxAge = maxAge;
			}
			continue;
		}
		if (key === 'expires' && rawValue) {
			const expires = new Date(rawValue);
			if (!Number.isNaN(expires.getTime())) {
				options.expires = expires;
			}
			continue;
		}
		if (key === 'httponly') {
			options.httpOnly = true;
			continue;
		}
		if (key === 'secure') {
			options.secure = true;
			continue;
		}
		if (key === 'samesite' && rawValue) {
			const normalized = rawValue.toLowerCase();
			if (
				normalized === 'lax' ||
				normalized === 'strict' ||
				normalized === 'none'
			) {
				options.sameSite = normalized;
			}
		}
	}

	if (!options.path) {
		options.path = '/';
	}

	return { name, cookieValue, options };
}

function applySetCookiesToStore(
	cookieStore: Awaited<ReturnType<typeof cookies>>,
	setCookies: string[],
) {
	for (const setCookie of setCookies) {
		const parsed = parseSetCookie(setCookie);
		if (!parsed) {
			continue;
		}

		cookieStore.set(parsed.name, parsed.cookieValue, parsed.options);
	}
}

export async function requireAccessToken() {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get('access_token')?.value;
	const refreshToken = cookieStore.get('refresh_token')?.value;

	if (!authUrl) {
		redirect('/login');
	}
	const cookieHeader = buildCookieHeader(accessToken, refreshToken);
	if (!cookieHeader) {
		redirect('/login');
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
				return accessToken;
			}
		}

		if (!refreshToken) {
			redirect('/login');
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
			redirect('/login');
		}

		const setCookies = getSetCookies(refreshResp.headers);
		if (setCookies.length) {
			applySetCookiesToStore(cookieStore, setCookies);
		}

		const updatedAccessToken = cookieStore.get('access_token')?.value;
		if (!updatedAccessToken) {
			redirect('/login');
		}

		return updatedAccessToken;
	} catch {
		redirect('/login');
	}
}
