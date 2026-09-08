import { expect, test } from '@playwright/test';
import { NextRequest, NextResponse } from 'next/server';

type SessionUser = {
	role?: string;
	unit?: string;
};

function getContracts() {
	// These contracts stay independent from the app server and exercise the
	// request-scoped utilities directly.
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	const cookies = require('../src/lib/auth-cookie') as typeof import('../src/lib/auth-cookie');
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	const requestPath = require('../src/lib/session/request-path') as typeof import('../src/lib/session/request-path');
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	const returnTo = require('../src/lib/session/return-to') as typeof import('../src/lib/session/return-to');
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	const defaultRoute = require('../src/lib/session/default-route') as typeof import('../src/lib/session/default-route');
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	const authUrl = require('../src/lib/auth-url') as typeof import('../src/lib/auth-url');

	return { ...cookies, ...requestPath, ...returnTo, ...defaultRoute, ...authUrl };
}

test.describe('session routing contracts', () => {
	test('merges upstream cookies and removes expired cookies', () => {
		const { appendSetCookies, getSetCookies, mergeCookieHeader } = getContracts();
		const current = 'access_token=stale; refresh_token=refresh; theme=dark';
		const upstream = [
			'access_token=fresh; Path=/; HttpOnly',
			'theme=; Path=/; Max-Age=0',
			'refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
		];

		expect(mergeCookieHeader(current, upstream)).toBe('access_token=fresh');

		const response = NextResponse.next();
		appendSetCookies(response, upstream);
		expect(getSetCookies(response.headers)).toEqual(upstream);
	});

	test('expires both auth cookies with secure production attributes and cookie domains', () => {
		const { expireAuthCookies, getSetCookies } = getContracts();
		const originalAuthUrl = process.env.NEXT_PUBLIC_AUTH_URL;
		const originalNodeEnv = process.env.NODE_ENV;
		process.env.NEXT_PUBLIC_AUTH_URL = 'https://auth.lhgmoteis.com.br';
		Reflect.set(process.env, 'NODE_ENV', 'production');

		try {
			const response = NextResponse.next();
			expireAuthCookies(
				response,
				new NextRequest('https://analytics-dev.lhgmoteis.com.br/api/logout'),
			);

			const cookies = getSetCookies(response.headers);
			expect(cookies).toEqual(
				expect.arrayContaining([
					expect.stringMatching(/^access_token=; Path=\/; Max-Age=0; Expires=.*; HttpOnly; SameSite=Lax; Secure$/),
					expect.stringMatching(/^refresh_token=; Path=\/; Max-Age=0; Expires=.*; HttpOnly; SameSite=Lax; Secure$/),
					expect.stringMatching(/access_token=.*Domain=lhgmoteis\.com\.br/),
					expect.stringMatching(/refresh_token=.*Domain=lhgmoteis\.com\.br/),
				]),
			);
		} finally {
			if (originalAuthUrl === undefined) {
				delete process.env.NEXT_PUBLIC_AUTH_URL;
			} else {
				process.env.NEXT_PUBLIC_AUTH_URL = originalAuthUrl;
			}
			if (originalNodeEnv === undefined) {
				Reflect.deleteProperty(process.env, 'NODE_ENV');
			} else {
				Reflect.set(process.env, 'NODE_ENV', originalNodeEnv);
			}
		}
	});

	test('expires host-only auth cookies without a request', () => {
		const { expireAuthCookies, getSetCookies } = getContracts();
		const response = NextResponse.next();

		expireAuthCookies(response);

		expect(getSetCookies(response.headers)).toEqual([
			expect.stringMatching(/^access_token=; Path=\/; Max-Age=0;/),
			expect.stringMatching(/^refresh_token=; Path=\/; Max-Age=0;/),
		]);
	});

	test('builds a request path from pathname and search only', () => {
		const { DASHBOARD_REQUEST_PATH_HEADER, buildInternalRequestPath } = getContracts();

		expect(DASHBOARD_REQUEST_PATH_HEADER).toBe('x-lhg-request-path');
		expect(buildInternalRequestPath('/general/liv', '?menu=general&set=este_mes')).toBe(
			'/general/liv?menu=general&set=este_mes',
		);
	});

	test('normalizes auth API bases without losing a real /auth prefix', () => {
		const { normalizeAuthApiBaseUrl, resolveAuthApiBaseUrl } = getContracts();

		expect(normalizeAuthApiBaseUrl('https://auth.test')).toBe(
			'https://auth.test/api',
		);
		expect(normalizeAuthApiBaseUrl('https://auth.test/api/')).toBe(
			'https://auth.test/api',
		);
		expect(normalizeAuthApiBaseUrl('https://auth.test/auth')).toBe(
			'https://auth.test/auth/api',
		);
		expect(normalizeAuthApiBaseUrl('https://auth.test/auth/api/')).toBe(
			'https://auth.test/auth/api',
		);
		expect(normalizeAuthApiBaseUrl('not a url')).toBeNull();

		const originalBackendAuth = process.env.BACKEND_AUTH_ENDPOINT;
		const originalPublicAuth = process.env.NEXT_PUBLIC_AUTH_URL;
		delete process.env.BACKEND_AUTH_ENDPOINT;
		process.env.NEXT_PUBLIC_AUTH_URL = 'https://auth.test/auth';
		try {
			expect(resolveAuthApiBaseUrl()).toBe('https://auth.test/auth/api');
		} finally {
			if (originalBackendAuth === undefined) {
				delete process.env.BACKEND_AUTH_ENDPOINT;
			} else {
				process.env.BACKEND_AUTH_ENDPOINT = originalBackendAuth;
			}
			if (originalPublicAuth === undefined) {
				delete process.env.NEXT_PUBLIC_AUTH_URL;
			} else {
				process.env.NEXT_PUBLIC_AUTH_URL = originalPublicAuth;
			}
		}
	});

	test('keeps only safe internal return paths', () => {
		const { sanitizeSessionReturnTo } = getContracts();

		for (const value of [
			'/general',
			'/general/liv?menu=general&set=este_mes',
			'/operational/getangaravelo',
			'/reservations/getanpqoeste',
			'/restaurant/lushipiranga',
			'/settings',
		]) {
			expect(sanitizeSessionReturnTo(value)).toBe(value);
		}
	});

	test('falls back from unsafe or malformed return paths', () => {
		const { sanitizeSessionReturnTo } = getContracts();

		for (const value of [
			'https://evil.test',
			'//evil.test',
			'/general\\evil',
			'\\\\evil.test',
			'/api/session/refresh',
			'/login',
			'/%2f%2fevil.test',
			'not a path',
			null,
		]) {
			expect(sanitizeSessionReturnTo(value)).toBe('/');
		}
	});

	test('chooses the current default route for every role and unit', () => {
		const { getDefaultSessionHref } = getContracts();
		const units = [
			'LUSH_IPIRANGA',
			'LUSH_LAPA',
			'ANDAR_DE_CIMA',
			'TOUT',
			'LIV',
			'ALTANA',
			'GETAN_GARAVELO',
			'GETAN_PQ_OESTE',
		] as const;
		const slugs: Record<(typeof units)[number], string> = {
			LUSH_IPIRANGA: 'lushipiranga',
			LUSH_LAPA: 'lushlapa',
			ANDAR_DE_CIMA: 'andardecima',
			TOUT: 'tout',
			LIV: 'liv',
			ALTANA: 'altana',
			GETAN_GARAVELO: 'getangaravelo',
			GETAN_PQ_OESTE: 'getanpqoeste',
		};
		const rolePaths = {
			GERENTE_GERAL: 'general',
			GERENTE_FINANCEIRO: 'general',
			GERENTE_OPERACIONAL: 'operational',
			GERENTE_RESERVAS: 'reservations',
			GERENTE_RESTAURANTE: 'restaurant',
		} as const;

		expect(
			getDefaultSessionHref({ role: 'ADMIN', unit: 'LHG' }, 'ultimos_30_dias'),
		).toBe('/general?menu=general&set=ultimo_mes_fechado');

		for (const [role, path] of Object.entries(rolePaths)) {
			for (const unit of units) {
				const expected =
					unit === 'LIV' && role !== 'GERENTE_GERAL'
						? '/login'
						: `/${path}/${slugs[unit]}?menu=${path}&set=este_mes`;
				expect(
					getDefaultSessionHref({ role, unit } satisfies SessionUser, 'este_mes'),
				).toBe(expected);
			}
		}
	});
});
