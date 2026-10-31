import { expect, test } from '@playwright/test';
import { getHelpdeskToken, resolveHelpdeskTokenUrl } from '../src/app/(dashboard)/_components/helpdesk-token';

test('rejects a missing auth URL', () => {
	for (const value of [undefined, '', '  ']) {
		expect(() => resolveHelpdeskTokenUrl(value)).toThrow(/NEXT_PUBLIC_AUTH_URL/);
	}
});

test('builds the token URL without duplicate slashes', () => {
	expect(resolveHelpdeskTokenUrl('https://analytics-dev.lhgmoteis.com.br/auth/'))
		.toBe('https://analytics-dev.lhgmoteis.com.br/auth/api/helpdesk/token');
});

test('requests the token using session cookies', async () => {
	let request: { input: string; init?: RequestInit } | undefined;
	const fetcher: typeof fetch = async (input, init) => {
		request = { input: String(input), init };
		return Response.json({ token: 'signed-token' });
	};
	await expect(getHelpdeskToken('https://analytics-dev.lhgmoteis.com.br/auth', fetcher)).resolves.toBe('signed-token');
	expect(request).toEqual({
		input: 'https://analytics-dev.lhgmoteis.com.br/auth/api/helpdesk/token',
		init: { method: 'GET', credentials: 'include', cache: 'no-store' },
	});
});

for (const status of [401, 503]) {
	test(`rejects token response ${status}`, async () => {
		const fetcher: typeof fetch = async () => new Response(null, { status });
		await expect(getHelpdeskToken('https://auth.test', fetcher)).rejects.toThrow(String(status));
	});
}

for (const payload of [null, {}, { token: 42 }, { token: '' }, { token: '   ' }]) {
	test(`rejects malformed token payload ${JSON.stringify(payload)}`, async () => {
		const fetcher: typeof fetch = async () => Response.json(payload);
		await expect(getHelpdeskToken('https://auth.test', fetcher)).rejects.toThrow(/token/i);
	});
}
