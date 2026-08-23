import { expect, test, type Page } from '@playwright/test';
import { createServer, type IncomingMessage, type ServerResponse } from 'http';

const AUTH_PORT = process.env.PW_AUTH_PORT
	? Number(process.env.PW_AUTH_PORT)
	: 35603;
const AUTH_BASE_PATH = (process.env.PW_AUTH_BASE_PATH ?? '').replace(/\/+$/, '');
const AUTH_API_PATH = AUTH_BASE_PATH.endsWith('/api')
	? AUTH_BASE_PATH
	: `${AUTH_BASE_PATH}/api`;
const AUTH_ME_PATH = `${AUTH_API_PATH}/me`;
const PROBE_PATH = '/settings/session-dal-test';
const DIRECT_PROBE_PATH = '/api/session-dal-test';
const PROBE_MODE_COOKIE = 'lhg_session_probe_mode';

type AuthRequest = {
	accept: string | undefined;
	cookie: string;
};

function json(response: ServerResponse, status: number, body: unknown) {
	response.statusCode = status;
	response.setHeader('content-type', 'application/json');
	response.end(JSON.stringify(body));
}

async function setProbeCookies(
	page: Page,
	baseURL: string,
	values: {
		access?: string;
		refresh?: string;
		mode?: 'require' | 'authorize' | 'unavailable-error';
	},
) {
	await page.context().clearCookies();
	const url = `${new URL(baseURL).origin}/`;
	const cookies = [
		values.access
			? { name: 'access_token', value: values.access, url }
			: null,
		values.refresh
			? { name: 'refresh_token', value: values.refresh, url }
			: null,
		values.mode
			? { name: PROBE_MODE_COOKIE, value: values.mode, url }
			: null,
	].filter((cookie): cookie is NonNullable<typeof cookie> => Boolean(cookie));

	if (cookies.length) {
		await page.context().addCookies(cookies);
	}
}

test.describe('request-scoped session DAL', () => {
	let authServer: ReturnType<typeof createServer> | null = null;
	let meRequests: AuthRequest[] = [];

	test.beforeAll(async () => {
		authServer = createServer(
			(request: IncomingMessage, response: ServerResponse) => {
				if (request.url !== AUTH_ME_PATH || request.method !== 'GET') {
					json(response, 404, { message: 'not found' });
					return;
				}

				const cookie = request.headers.cookie ?? '';
				meRequests.push({ accept: request.headers.accept, cookie });

				if (cookie.includes('access_token=success-admin')) {
					json(response, 200, {
						user: {
							id: 91,
							email: 'admin@session.test',
							name: 'Session Admin',
							cpf: '359.267.460-94',
							role: 'ADMIN',
							unit: 'LHG',
							password: 'must-not-cross-the-dal',
							accessToken: 'must-not-cross-the-dal',
							refreshToken: 'must-not-cross-the-dal',
							secret: 'must-not-cross-the-dal',
							nested: { token: 'must-not-cross-the-dal' },
							createdAt: '2026-08-22T00:00:00.000Z',
							updatedAt: '2026-08-22T00:00:00.000Z',
						},
					});
					return;
				}

				if (cookie.includes('access_token=success-manager')) {
					json(response, 200, {
						email: 'manager@session.test',
						name: 'Session Manager',
						role: 'GERENTE_FINANCEIRO',
						unit: 'LUSH_LAPA',
					});
					return;
				}

				if (cookie.includes('access_token=unauthorized')) {
					json(response, 401, { message: 'expired' });
					return;
				}

				if (cookie.includes('access_token=forbidden')) {
					json(response, 403, { message: 'forbidden' });
					return;
				}

				if (cookie.includes('access_token=unavailable')) {
					json(response, 500, { message: 'auth unavailable' });
					return;
				}

				if (cookie.includes('access_token=network-error')) {
					response.destroy();
					return;
				}

				if (cookie.includes('access_token=timeout')) {
					setTimeout(() => {
						if (!response.destroyed) {
							json(response, 200, { email: 'too-late@session.test' });
						}
					}, 5_500);
					return;
				}

				json(response, 401, { message: 'unknown session' });
			},
		);

		await new Promise<void>((resolve) => {
			authServer?.listen(AUTH_PORT, '127.0.0.1', resolve);
		});
	});

	test.afterAll(async () => {
		await new Promise<void>((resolve, reject) => {
			if (!authServer) {
				resolve();
				return;
			}
			authServer.close((error) => (error ? reject(error) : resolve()));
		});
	});

	test.beforeEach(() => {
		meRequests = [];
	});

	test('deduplicates two consumers in one render and sanitizes the profile', async ({
		page,
	}, testInfo) => {
		const baseURL = testInfo.project.use.baseURL;
		expect(baseURL).toBeTruthy();
		await setProbeCookies(page, baseURL as string, {
			access: 'success-admin',
			refresh: 'refresh-admin',
		});

		await page.goto(`${PROBE_PATH}?request=one`);

		await expect(page.getByTestId('first-status')).toHaveText('authenticated');
		await expect(page.getByTestId('second-status')).toHaveText('authenticated');
		await expect(page.getByTestId('email')).toHaveText('admin@session.test');
		await expect(page.getByTestId('optional-email')).toHaveText(
			'admin@session.test',
		);
		await expect(page.getByTestId('sanitized')).toHaveText('true');
		await expect(page.getByTestId('user-keys')).toHaveText(
			'cpf,email,name,role,unit',
		);
		expect(meRequests).toEqual([
			{
				accept: 'application/json',
				cookie: 'access_token=success-admin; refresh_token=refresh-admin',
			},
		]);
	});

	test('does not reuse the profile across two real navigations', async ({
		page,
	}, testInfo) => {
		const baseURL = testInfo.project.use.baseURL as string;
		await setProbeCookies(page, baseURL, {
			access: 'success-admin',
			refresh: 'refresh-admin',
		});

		await page.goto(`${PROBE_PATH}?navigation=one`);
		await page.goto(`${PROBE_PATH}?navigation=two`);

		await expect(page.getByTestId('email')).toHaveText('admin@session.test');
		expect(meRequests).toHaveLength(2);
	});

	test('classifies 401 by refresh-cookie availability', async ({ page }, testInfo) => {
		const baseURL = testInfo.project.use.baseURL as string;
		await setProbeCookies(page, baseURL, { access: 'unauthorized' });

		await page.goto(PROBE_PATH);

		await expect(page.getByTestId('first-status')).toHaveText('unauthenticated');
		await expect(page.getByTestId('can-refresh')).toHaveText('false');
		await expect(page.getByTestId('optional-email')).toHaveText('none');
		expect(meRequests).toHaveLength(1);

		meRequests = [];
		await setProbeCookies(page, baseURL, {
			access: 'unauthorized',
			refresh: 'refresh-present',
		});
		await page.goto(`${PROBE_PATH}?refresh=present`);
		await expect(page.getByTestId('first-status')).toHaveText('unauthenticated');
		await expect(page.getByTestId('can-refresh')).toHaveText('true');
		expect(meRequests).toHaveLength(1);
	});

	test('skips /api/me when access is missing but refresh is present', async ({
		page,
	}, testInfo) => {
		const baseURL = testInfo.project.use.baseURL as string;
		await setProbeCookies(page, baseURL, { refresh: 'refresh-only' });

		await page.goto(PROBE_PATH);

		await expect(page.getByTestId('first-status')).toHaveText('unauthenticated');
		await expect(page.getByTestId('can-refresh')).toHaveText('true');
		expect(meRequests).toHaveLength(0);
	});

	test('missing auth cookies never reach the auth service', async ({
		page,
	}, testInfo) => {
		const baseURL = testInfo.project.use.baseURL as string;
		await setProbeCookies(page, baseURL, {});

		await page.goto(PROBE_PATH);

		expect(new URL(page.url()).pathname).toBe('/login');
		expect(meRequests).toHaveLength(0);
	});

	test('readSession returns non-refreshable unauthenticated without cookies', async ({
		page,
	}, testInfo) => {
		const baseURL = testInfo.project.use.baseURL as string;
		await setProbeCookies(page, baseURL, {});

		await page.goto(DIRECT_PROBE_PATH);

		await expect(page.getByTestId('first-status')).toHaveText('unauthenticated');
		await expect(page.getByTestId('second-status')).toHaveText('unauthenticated');
		await expect(page.getByTestId('can-refresh')).toHaveText('false');
		expect(meRequests).toHaveLength(0);
	});

	test('fails closed on 403 without offering refresh', async ({ page }, testInfo) => {
		const baseURL = testInfo.project.use.baseURL as string;
		await setProbeCookies(page, baseURL, {
			access: 'forbidden',
			refresh: 'refresh-present',
		});

		await page.goto(PROBE_PATH);

		await expect(page.getByTestId('first-status')).toHaveText('unauthenticated');
		await expect(page.getByTestId('can-refresh')).toHaveText('false');
		expect(meRequests).toHaveLength(1);
	});

	test('keeps cookies and returns unavailable on auth 500', async ({
		page,
	}, testInfo) => {
		const baseURL = testInfo.project.use.baseURL as string;
		await setProbeCookies(page, baseURL, {
			access: 'unavailable',
			refresh: 'keep-on-outage',
		});

		await page.goto(PROBE_PATH);

		await expect(page.getByTestId('first-status')).toHaveText('unavailable');
		const cookies = await page.context().cookies();
		expect(cookies.find((cookie) => cookie.name === 'access_token')?.value).toBe(
			'unavailable',
		);
		expect(cookies.find((cookie) => cookie.name === 'refresh_token')?.value).toBe(
			'keep-on-outage',
		);
		expect(meRequests).toHaveLength(1);
	});

	test('keeps cookies and returns unavailable on a network failure', async ({
		page,
	}, testInfo) => {
		const baseURL = testInfo.project.use.baseURL as string;
		await setProbeCookies(page, baseURL, {
			access: 'network-error',
			refresh: 'keep-on-network-error',
		});

		await page.goto(PROBE_PATH);

		await expect(page.getByTestId('first-status')).toHaveText('unavailable');
		const cookies = await page.context().cookies();
		expect(cookies.find((cookie) => cookie.name === 'access_token')?.value).toBe(
			'network-error',
		);
		expect(cookies.find((cookie) => cookie.name === 'refresh_token')?.value).toBe(
			'keep-on-network-error',
		);
		expect(meRequests).toHaveLength(1);
	});

	test('aborts /api/me after five seconds and preserves the session cookies', async ({
		page,
	}, testInfo) => {
		test.setTimeout(20_000);
		const baseURL = testInfo.project.use.baseURL as string;
		await setProbeCookies(page, baseURL, {
			access: 'timeout',
			refresh: 'keep-on-timeout',
		});
		const startedAt = Date.now();

		await page.goto(PROBE_PATH);

		await expect(page.getByTestId('first-status')).toHaveText('unavailable');
		const elapsed = Date.now() - startedAt;
		expect(elapsed).toBeGreaterThanOrEqual(4_500);
		expect(elapsed).toBeLessThan(8_000);
		const cookies = await page.context().cookies();
		expect(cookies.find((cookie) => cookie.name === 'access_token')?.value).toBe(
			'timeout',
		);
		expect(cookies.find((cookie) => cookie.name === 'refresh_token')?.value).toBe(
			'keep-on-timeout',
		);
		expect(meRequests).toHaveLength(1);
	});

	test('routes refreshable and non-refreshable unauthenticated sessions separately', async ({
		page,
	}, testInfo) => {
		const baseURL = testInfo.project.use.baseURL as string;
		const navigationUrls: URL[] = [];
		page.on('request', (request) => {
			if (request.isNavigationRequest()) {
				navigationUrls.push(new URL(request.url()));
			}
		});
		await setProbeCookies(page, baseURL, {
			refresh: 'refresh-only',
			mode: 'require',
		});
		await page.goto(`${PROBE_PATH}?kind=refreshable`);
		await page.waitForURL(
			(url) =>
				url.pathname === '/login' &&
				url.searchParams.get('reason') === 'session_refresh_failed',
		);
		const refreshNavigation = navigationUrls.find(
			(url) => url.pathname === '/api/session/refresh',
		);
		expect(refreshNavigation).toBeDefined();
		expect(refreshNavigation?.searchParams.get('returnTo')).toBe(
			`${PROBE_PATH}?kind=refreshable`,
		);
		let currentUrl = new URL(page.url());
		expect(currentUrl.pathname).toBe('/login');
		expect(currentUrl.searchParams.get('reason')).toBe(
			'session_refresh_failed',
		);
		expect(meRequests).toHaveLength(0);

		meRequests = [];
		await setProbeCookies(page, baseURL, {
			access: 'unauthorized',
			mode: 'require',
		});
		await page.goto(`${PROBE_PATH}?kind=login`);
		await page.waitForURL((url) => url.pathname === '/login');
		currentUrl = new URL(page.url());
		expect(currentUrl.pathname).toBe('/login');
		expect(currentUrl.searchParams.get('returnTo')).toBe(
			`${PROBE_PATH}?kind=login`,
		);
		// The probe and the redirected login page are separate real navigations.
		expect(meRequests).toHaveLength(2);
	});

	test('turns infrastructure failure into SessionUnavailableError', async ({
		page,
	}, testInfo) => {
		const baseURL = testInfo.project.use.baseURL as string;
		await setProbeCookies(page, baseURL, {
			access: 'unavailable',
			refresh: 'keep-on-outage',
			mode: 'unavailable-error',
		});

		await page.goto(PROBE_PATH);

		await expect(page.getByTestId('guard')).toHaveText('SessionUnavailableError');
		expect(meRequests).toHaveLength(1);
	});

	test('authorizes ADMIN and redirects a forbidden manager to the current default', async ({
		page,
	}, testInfo) => {
		const baseURL = testInfo.project.use.baseURL as string;
		await setProbeCookies(page, baseURL, {
			access: 'success-admin',
			mode: 'authorize',
		});
		await page.goto(PROBE_PATH);
		await expect(page.getByTestId('guard')).toHaveText(
			'authorized:admin@session.test',
		);
		expect(meRequests).toHaveLength(1);

		meRequests = [];
		await setProbeCookies(page, baseURL, {
			access: 'success-manager',
			mode: 'authorize',
		});
		await page.goto(PROBE_PATH);
		await page.waitForURL((url) => url.pathname === '/general/lushlapa');
		const location = new URL(page.url());
		expect(`${location.pathname}${location.search}`).toBe(
			'/general/lushlapa?menu=general&set=ultimos_7_dias',
		);
		// The probe and the authorized default page each validate once.
		expect(meRequests).toHaveLength(2);
	});

	test('fails closed when the trusted request-path header is absent or malformed', async ({
		page,
	}, testInfo) => {
		const baseURL = testInfo.project.use.baseURL as string;
		await page.route('**/general/lushlapa?*', async (route) => {
			await route.fulfill({ status: 200, body: 'safe-default' });
		});
		await setProbeCookies(page, baseURL, {
			access: 'success-manager',
			mode: 'authorize',
		});

		await page.goto(`${DIRECT_PROBE_PATH}?header=missing`);
		await expect
			.poll(() => new URL(page.url()).pathname, { timeout: 3_000 })
			.toBe('/general/lushlapa');

		meRequests = [];
		await setProbeCookies(page, baseURL, {
			access: 'success-manager',
			mode: 'authorize',
		});
		await page.setExtraHTTPHeaders({
			'x-lhg-request-path': 'https://evil.test/settings',
		});
		await page.goto(`${DIRECT_PROBE_PATH}?header=malformed`);
		await expect
			.poll(() => new URL(page.url()).pathname, { timeout: 3_000 })
			.toBe('/general/lushlapa');
		expect(meRequests).toHaveLength(1);
	});
});
