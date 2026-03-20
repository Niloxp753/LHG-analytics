import { expect, test } from '@playwright/test';

test('logout route expires auth cookies and leaves user unauthenticated on protected route', async ({
	request,
}) => {
	const response = await request.post('/api/logout', {
		headers: {
			Cookie: 'access_token=fake_access; refresh_token=fake_refresh',
		},
	});

	expect(response.status()).toBe(200);

	const setCookie = response.headers()['set-cookie'] ?? '';
	expect(setCookie).toContain('access_token=');
	expect(setCookie).toContain('refresh_token=');
	expect(setCookie.toLowerCase()).toContain('max-age=0');

	const protectedResp = await request.get('/general?menu=general&set=ultimos_7_dias', {
		maxRedirects: 0,
	});
	expect(protectedResp.status()).toBeGreaterThanOrEqual(300);
	expect(protectedResp.status()).toBeLessThan(400);
	expect(protectedResp.headers()['location']).toContain('/login');
});
