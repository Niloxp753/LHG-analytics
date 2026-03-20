import { expect, test } from '@playwright/test';

test('logout emits domain cookie expirations for shared parent domain cookies', async ({
	request,
}) => {
	const response = await request.post('/api/logout', {
		headers: {
			Host: 'analytics-dev.lhgmoteis.com.br',
			Cookie: 'access_token=a; refresh_token=b',
		},
	});

	expect(response.status()).toBe(200);

	const setCookieHeaders = response
		.headersArray()
		.filter((header) => header.name.toLowerCase() === 'set-cookie')
		.map((header) => header.value);

	expect(
		setCookieHeaders.some((value) =>
			/access_token=.*max-age=0.*domain=lhgmoteis\.com\.br/i.test(value),
		),
	).toBeTruthy();
	expect(
		setCookieHeaders.some((value) =>
			/refresh_token=.*max-age=0.*domain=lhgmoteis\.com\.br/i.test(value),
		),
	).toBeTruthy();
});

