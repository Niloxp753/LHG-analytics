import type { NextRequest } from 'next/server';

type HeaderResponse = {
	headers: Pick<Headers, 'append'>;
};

export function buildCookieHeader(
	accessToken?: string,
	refreshToken?: string,
): string | null {
	const parts = [
		accessToken ? `access_token=${accessToken}` : null,
		refreshToken ? `refresh_token=${refreshToken}` : null,
	].filter((part): part is string => Boolean(part));

	return parts.length ? parts.join('; ') : null;
}

export function parseCookieHeader(value: string | null): Map<string, string> {
	const parsed = new Map<string, string>();
	if (!value) {
		return parsed;
	}

	for (const part of value.split(';')) {
		const separatorIndex = part.indexOf('=');
		if (separatorIndex <= 0) {
			continue;
		}

		const name = part.slice(0, separatorIndex).trim();
		if (name) {
			parsed.set(name, part.slice(separatorIndex + 1).trim());
		}
	}

	return parsed;
}

function splitSetCookieHeader(value: string): string[] {
	return value.split(/,(?=\s*[^;=,\s]+=)/).map((cookie) => cookie.trim());
}

export function getSetCookies(headers: Headers): string[] {
	const headersWithGetSetCookie = headers as Headers & {
		getSetCookie?: () => string[];
	};
	if (typeof headersWithGetSetCookie.getSetCookie === 'function') {
		return headersWithGetSetCookie.getSetCookie();
	}

	const combined = headers.get('set-cookie');
	return combined ? splitSetCookieHeader(combined) : [];
}

function parseSetCookie(value: string): {
	name: string;
	value: string;
	expired: boolean;
} | null {
	const [nameAndValue, ...attributes] = value
		.split(';')
		.map((part) => part.trim())
		.filter(Boolean);
	const separatorIndex = nameAndValue?.indexOf('=') ?? -1;
	if (separatorIndex <= 0) {
		return null;
	}

	const name = nameAndValue.slice(0, separatorIndex).trim();
	if (!name) {
		return null;
	}

	let expired = false;
	for (const attribute of attributes) {
		const [rawKey, ...rawValue] = attribute.split('=');
		const key = rawKey.trim().toLowerCase();
		const attributeValue = rawValue.join('=').trim();
		if (key === 'max-age' && attributeValue === '0') {
			expired = true;
		}
		if (key === 'expires' && attributeValue) {
			const expiresAt = new Date(attributeValue);
			if (!Number.isNaN(expiresAt.getTime()) && expiresAt.getTime() <= Date.now()) {
				expired = true;
			}
		}
	}

	return { name, value: nameAndValue.slice(separatorIndex + 1).trim(), expired };
}

export function mergeCookieHeader(
	currentCookieHeader: string | null,
	setCookies: string[],
): string | null {
	const merged = parseCookieHeader(currentCookieHeader);

	for (const setCookie of setCookies) {
		const parsed = parseSetCookie(setCookie);
		if (!parsed) {
			continue;
		}
		if (parsed.expired) {
			merged.delete(parsed.name);
		} else {
			merged.set(parsed.name, parsed.value);
		}
	}

	return merged.size
		? Array.from(merged, ([name, value]) => `${name}=${value}`).join('; ')
		: null;
}

export function appendSetCookies(response: HeaderResponse, cookies: string[]) {
	for (const cookie of cookies) {
		response.headers.append('set-cookie', cookie);
	}
}

function isLocalOrIpAddress(hostname: string): boolean {
	return (
		hostname === 'localhost' ||
		hostname === '127.0.0.1' ||
		/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)
	);
}

function getRegistrableDomain(hostname: string): string | null {
	const labels = hostname.split('.').filter(Boolean);
	if (labels.length < 2) {
		return null;
	}

	const last = labels.at(-1) as string;
	const penultimate = labels.at(-2) as string;
	const hasSecondLevelTld =
		last.length === 2 && ['com', 'net', 'org', 'gov', 'edu', 'co'].includes(penultimate);
	return hasSecondLevelTld && labels.length >= 3
		? labels.slice(-3).join('.')
		: labels.slice(-2).join('.');
}

function getCookieDomains(request: NextRequest): string[] {
	const domains = new Set<string>();
	const add = (value?: string | null) => {
		const hostname = value?.trim().toLowerCase();
		if (!hostname || isLocalOrIpAddress(hostname)) {
			return;
		}
		domains.add(hostname);
		const registrable = getRegistrableDomain(hostname);
		if (registrable) {
			domains.add(registrable);
		}
	};
	const addHeaderHost = (value: string | null) => {
		const forwardedHost = value?.split(',')[0]?.trim();
		if (!forwardedHost) {
			return;
		}

		try {
			add(new URL(`http://${forwardedHost}`).hostname);
		} catch {
			// Malformed proxy host metadata must not prevent host-only cleanup.
		}
	};

	add(request.nextUrl.hostname);
	addHeaderHost(
		request.headers.get('x-forwarded-host') ?? request.headers.get('host'),
	);
	for (const rawUrl of [
		process.env.BACKEND_AUTH_ENDPOINT,
		process.env.NEXT_PUBLIC_AUTH_URL,
	]) {
		if (!rawUrl) {
			continue;
		}
		try {
			add(new URL(rawUrl).hostname);
		} catch {
			// Invalid external configuration must not prevent host-only cleanup.
		}
	}

	return Array.from(domains);
}

export function expireAuthCookies(response: HeaderResponse, request?: NextRequest) {
	const secure = process.env.NODE_ENV === 'production';
	const append = (name: 'access_token' | 'refresh_token', domain?: string) => {
		const parts = [
			`${name}=`,
			'Path=/',
			'Max-Age=0',
			'Expires=Thu, 01 Jan 1970 00:00:00 GMT',
			'HttpOnly',
			'SameSite=Lax',
		];
		if (secure) {
			parts.push('Secure');
		}
		if (domain) {
			parts.push(`Domain=${domain}`);
		}
		response.headers.append('set-cookie', parts.join('; '));
	};

	for (const domain of [undefined, ...(request ? getCookieDomains(request) : [])]) {
		append('access_token', domain);
		append('refresh_token', domain);
	}
}
