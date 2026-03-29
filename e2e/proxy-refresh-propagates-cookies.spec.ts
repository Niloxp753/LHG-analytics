import { expect, test } from '@playwright/test';
import { NextRequest } from 'next/server';

type FetchCall = {
	url: string;
	method: string;
	cookie: string | null;
};

test.describe('proxy refresh cookie propagation', () => {
	test('overrides the same-request cookie header with refreshed auth cookies', async () => {
		process.env.NEXT_PUBLIC_AUTH_URL = 'http://auth.local';

		const fetchCalls: FetchCall[] = [];
		const originalFetch = global.fetch;

		global.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
			const url = typeof input === 'string' ? input : input.toString();
			const method = init?.method ?? 'GET';
			const cookie = new Headers(init?.headers).get('cookie');

			fetchCalls.push({ url, method, cookie });

			if (url === 'http://auth.local/api/me') {
				return new Response(JSON.stringify({ ok: false }), {
					status: 401,
					headers: { 'content-type': 'application/json' },
				});
			}

			if (url === 'http://auth.local/api/refresh') {
				return new Response(
					JSON.stringify({
						email: 'admin@local.test',
						role: 'ADMIN',
						unit: 'LHG',
					}),
					{
						status: 200,
						headers: [
							['content-type', 'application/json'],
							['set-cookie', 'access_token=fresh-token; Path=/; HttpOnly'],
							['set-cookie', 'refresh_token=fresh-refresh; Path=/; HttpOnly'],
						],
					},
				);
			}

			return new Response(JSON.stringify({ ok: false }), {
				status: 404,
				headers: { 'content-type': 'application/json' },
			});
		}) as typeof global.fetch;

		try {
			// Playwright transpiles TS modules for require(), which keeps this test
			// independent from the app web server.
			// eslint-disable-next-line @typescript-eslint/no-require-imports
			const { proxy } = require('../src/proxy') as typeof import('../src/proxy');

			const response = await proxy(
				new NextRequest(
					'http://app.local/general/lushipiranga?menu=general&set=ultimos_7_dias',
					{
						headers: {
							cookie: 'access_token=stale-token; refresh_token=stale-refresh',
						},
					},
				),
			);

			expect(fetchCalls).toEqual([
				{
					url: 'http://auth.local/api/me',
					method: 'GET',
					cookie: 'access_token=stale-token; refresh_token=stale-refresh',
				},
				{
					url: 'http://auth.local/api/refresh',
					method: 'POST',
					cookie: 'access_token=stale-token; refresh_token=stale-refresh',
				},
			]);

			expect(response.headers.get('x-middleware-override-headers')).toContain(
				'cookie',
			);
			expect(response.headers.get('x-middleware-request-cookie')).toBe(
				'access_token=fresh-token; refresh_token=fresh-refresh',
			);
		} finally {
			global.fetch = originalFetch;
		}
	});
});
