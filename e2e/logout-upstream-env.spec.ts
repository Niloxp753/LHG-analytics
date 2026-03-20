import { expect, test } from '@playwright/test';

test('logout uses configured auth service when BACKEND_AUTH_ENDPOINT is not set', async ({
	request,
}) => {
	const response = await request.post('/api/logout', {
		headers: {
			Cookie: 'access_token=a; refresh_token=b',
		},
	});
	expect(response.status()).toBe(200);

	const body = (await response.json()) as { ok: boolean; upstreamStatus?: number };

	// With NEXT_PUBLIC_AUTH_URL intentionally unreachable in this test config,
	// upstream logout should fail. If it succeeds, route is calling the wrong service.
	expect(body.ok).toBe(false);
	expect(body.upstreamStatus).toBeUndefined();
});
