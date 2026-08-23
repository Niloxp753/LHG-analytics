import { expect, test, type Page } from '@playwright/test';
import { readdirSync, readFileSync } from 'node:fs';
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { join } from 'node:path';
import ts from 'typescript';

const APP_PORT = process.env.PW_PORT ? Number(process.env.PW_PORT) : 3181;
const APP_ORIGIN = `http://localhost:${APP_PORT}`;
const AUTH_PORT = process.env.PW_AUTH_PORT
	? Number(process.env.PW_AUTH_PORT)
	: 35661;
const AUTH_BASE_PATH = (process.env.PW_AUTH_BASE_PATH ?? '').replace(/\/+$/, '');
const AUTH_API_PATH = AUTH_BASE_PATH.endsWith('/api')
	? AUTH_BASE_PATH
	: `${AUTH_BASE_PATH}/api`;
const AUTH_ME_PATH = `${AUTH_API_PATH}/me`;
const AUTH_LOGIN_PATH = `${AUTH_API_PATH}/login`;
const AUTH_REFRESH_PATH = `${AUTH_API_PATH}/refresh`;
const PROBE_ROOT = '/general/lushlapa/session-bootstrap-test';
const PROBE_ONE = `${PROBE_ROOT}/one?menu=general&set=ultimos_7_dias`;
const PROBE_TWO = `${PROBE_ROOT}/two?menu=general&set=ultimos_7_dias`;
const FORCE_PAGE_ERROR_COOKIE = 'lhg_force_session_page_error';

type ProfileVersion = 'A' | 'B';
type AuthScenario = 'profile' | 'slow-profile' | 'unavailable';

type RecordedAuthRequest = {
	method: string;
	path: string;
	cookie: string;
	servedProfile?: ProfileVersion;
};

const profiles = {
	A: {
		email: 'admin-a@session.test',
		name: 'Perfil A',
		cpf: '359.267.460-94',
		role: 'ADMIN',
		unit: 'LHG',
	},
	B: {
		email: 'manager-b@session.test',
		name: 'Perfil B',
		cpf: '111.222.333-44',
		role: 'GERENTE_FINANCEIRO',
		unit: 'LUSH_LAPA',
	},
} as const;

let authScenario: AuthScenario = 'profile';
let profileVersion: ProfileVersion = 'A';
let authRequests: RecordedAuthRequest[] = [];

function json(response: ServerResponse, status: number, body: unknown) {
	response.statusCode = status;
	response.setHeader('content-type', 'application/json');
	response.end(JSON.stringify(body));
}

function allowBrowserCredentials(response: ServerResponse) {
	response.setHeader('access-control-allow-origin', APP_ORIGIN);
	response.setHeader('access-control-allow-credentials', 'true');
	response.setHeader('access-control-allow-headers', 'content-type');
	response.setHeader('access-control-allow-methods', 'GET, POST, OPTIONS');
}

function recordAuthRequest(request: IncomingMessage) {
	authRequests.push({
		method: request.method ?? '',
		path: request.url ?? '',
		cookie: request.headers.cookie ?? '',
	});
}

function handleAuthRequest(
	request: IncomingMessage,
	response: ServerResponse,
) {
	allowBrowserCredentials(response);

	if (request.method === 'OPTIONS') {
		response.statusCode = 204;
		response.end();
		return;
	}

	if (request.url === AUTH_LOGIN_PATH && request.method === 'POST') {
		recordAuthRequest(request);
		response.setHeader('set-cookie', [
			'access_token=profile-token; Path=/; HttpOnly; SameSite=Lax',
			'refresh_token=profile-refresh; Path=/; HttpOnly; SameSite=Lax',
		]);
		json(response, 200, { ok: true });
		return;
	}

	if (request.url === AUTH_REFRESH_PATH && request.method === 'POST') {
		recordAuthRequest(request);
		json(response, 500, { message: 'unexpected refresh' });
		return;
	}

	if (request.url === AUTH_ME_PATH && request.method === 'GET') {
		recordAuthRequest(request);
		if (authScenario === 'unavailable') {
			json(response, 503, { message: 'temporarily unavailable' });
			return;
		}

		const cookie = request.headers.cookie ?? '';
		if (!cookie.includes('access_token=profile-token')) {
			json(response, 401, { message: 'invalid session' });
			return;
		}

		const servedProfile = profileVersion;
		authRequests.at(-1)!.servedProfile = servedProfile;
		if (authScenario === 'slow-profile') {
			setTimeout(() => {
				if (!response.destroyed) {
					json(response, 200, { user: profiles[servedProfile] });
				}
			}, 1_000);
			return;
		}

		json(response, 200, { user: profiles[servedProfile] });
		return;
	}

	json(response, 404, { message: 'not found' });
}

async function setSessionCookies(
	page: Page,
	baseURL: string,
	values: { access?: string; refresh?: string; forcePageError?: boolean },
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
		values.forcePageError
			? { name: FORCE_PAGE_ERROR_COOKIE, value: '1', url }
			: null,
	].filter((cookie): cookie is NonNullable<typeof cookie> => Boolean(cookie));

	if (cookies.length) {
		await page.context().addCookies(cookies);
	}
}

function collectBrowserAuthBootstrapRequests(page: Page) {
	const requests: string[] = [];
	page.on('request', (request) => {
		const url = new URL(request.url());
		if (
			url.pathname === '/api/me' ||
			url.pathname === '/api/refresh' ||
			url.pathname.startsWith('/api/users/email/')
		) {
			requests.push(request.url());
		}
	});
	return requests;
}

function collectDashboardPages(directory: string): string[] {
	return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const entryPath = join(directory, entry.name);
		if (entry.isDirectory()) {
			return collectDashboardPages(entryPath);
		}
		return entry.name === 'page.tsx' ? [entryPath] : [];
	});
}

function unwrapParentheses(expression: ts.Expression): ts.Expression {
	let current = expression;
	while (ts.isParenthesizedExpression(current)) {
		current = current.expression;
	}
	return current;
}

function hasOuterPageSessionBoundary(file: string): boolean {
	const sourceText = readFileSync(file, 'utf8');
	const sourceFile = ts.createSourceFile(
		file,
		sourceText,
		ts.ScriptTarget.Latest,
		true,
		ts.ScriptKind.TSX,
	);
	const pageFunction = sourceFile.statements.find(
		(statement): statement is ts.FunctionDeclaration =>
			ts.isFunctionDeclaration(statement) &&
			Boolean(
				statement.modifiers?.some(
					(modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword,
				),
			),
	);
	if (!pageFunction?.body) {
		return false;
	}

	const returns = pageFunction.body.statements.filter(ts.isReturnStatement);
	if (returns.length !== 1 || !returns[0].expression) {
		return false;
	}

	const returnedExpression = unwrapParentheses(returns[0].expression);
	return (
		ts.isJsxElement(returnedExpression) &&
		returnedExpression.openingElement.tagName.getText(sourceFile) ===
			'DashboardPageSessionBoundary' &&
		returnedExpression.closingElement.tagName.getText(sourceFile) ===
			'DashboardPageSessionBoundary'
	);
}

test('all 37 real dashboard pages render through the page session boundary', () => {
	const dashboardRoot = join(process.cwd(), 'src/app/(dashboard)');
	const realPages = collectDashboardPages(dashboardRoot).filter(
		(file) => !file.includes('/session-bootstrap-test/'),
	);
	const unguarded = realPages
		.filter((file) => !hasOuterPageSessionBoundary(file))
		.map((file) => file.replace(`${process.cwd()}/`, ''));

	expect(realPages).toHaveLength(37);
	expect(unguarded).toEqual([]);
});

test.describe('request-scoped dashboard session bootstrap', () => {
	let authServer: ReturnType<typeof createServer> | null = null;

	test.beforeAll(async () => {
		authServer = createServer(handleAuthRequest);
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
		authScenario = 'profile';
		profileVersion = 'A';
		authRequests = [];
	});

	test('a deep Link navigation validates once and commits profile B without painting profile A', async ({
		page,
	}, testInfo) => {
		const baseURL = testInfo.project.use.baseURL as string;
		await setSessionCookies(page, baseURL, {
			access: 'profile-token',
			refresh: 'profile-refresh',
		});
		const browserAuthRequests = collectBrowserAuthBootstrapRequests(page);

		await page.goto(PROBE_ONE);
		await expect(page.getByTestId('session-profile-status')).toHaveText('authed');
		await expect(page.getByTestId('session-profile-name')).toHaveText('Perfil A');
		await expect(page.getByTestId('session-profile-role')).toHaveText('ADMIN');
		await expect(page.getByTestId('session-profile-unit')).toHaveText('LHG');
		expect(authRequests.filter((entry) => entry.path === AUTH_ME_PATH)).toHaveLength(
			1,
		);
		await page.evaluate(() => {
			const testWindow = window as typeof window & {
				__profileCommitObserver?: MutationObserver;
				__profileCommitSamples?: string[];
			};
			testWindow.__profileCommitSamples = [];
			testWindow.__profileCommitObserver = new MutationObserver(() => {
				const serverProfile = document.querySelector(
					'[data-testid="server-profile-name"]',
				)?.textContent;
				if (serverProfile === 'Perfil B') {
					testWindow.__profileCommitSamples?.push(
						document.querySelector('[data-testid="session-profile-name"]')
							?.textContent ?? 'missing',
					);
				}
			});
			testWindow.__profileCommitObserver.observe(document.body, {
				characterData: true,
				childList: true,
				subtree: true,
			});
		});

		profileVersion = 'B';
		await page.getByRole('link', { name: 'Ir para o segundo perfil' }).click();
		await expect(page).toHaveURL(PROBE_TWO);
		expect(
			authRequests
				.filter((entry) => entry.path === AUTH_ME_PATH)
				.map((entry) => entry.servedProfile),
		).toEqual(['A', 'B']);
		const committedPage = page.getByRole('main');
		await expect(committedPage.getByTestId('server-profile-name')).toHaveText(
			'Perfil B',
		);
		await expect(committedPage.getByTestId('session-profile-name')).toHaveText(
			'Perfil B',
		);
		await expect(committedPage.getByTestId('session-profile-role')).toHaveText(
			'GERENTE_FINANCEIRO',
		);
		await expect(committedPage.getByTestId('session-profile-unit')).toHaveText(
			'LUSH_LAPA',
		);
		await expect(
			page.locator('[aria-disabled="true"]').filter({ hasText: 'Painel Admin' }),
		).toBeVisible();
		expect(authRequests.filter((entry) => entry.path === AUTH_ME_PATH)).toHaveLength(
			2,
		);
		const commitSamples = await page.evaluate(() => {
			const testWindow = window as typeof window & {
				__profileCommitObserver?: MutationObserver;
				__profileCommitSamples?: string[];
			};
			testWindow.__profileCommitObserver?.disconnect();
			return testWindow.__profileCommitSamples ?? [];
		});
		expect(commitSamples).toContain('Perfil B');
		expect(commitSamples).not.toContain('Perfil A');
		expect(browserAuthRequests).toEqual([]);
	});

	test('hover-only partial prefetch does not call /api/me [dependency: 2026-08-22 dashboard partial-prefetch plan]', async ({
		page,
	}, testInfo) => {
		test.fixme(
			true,
			'Depends on the approved dashboard partial-prefetch plan; this Task does not implement that future policy.',
		);
		const baseURL = testInfo.project.use.baseURL as string;
		await setSessionCookies(page, baseURL, {
			access: 'profile-token',
			refresh: 'profile-refresh',
		});

		await page.goto(PROBE_ONE);
		await expect(page.getByTestId('session-profile-status')).toHaveText('authed');
		expect(authRequests.filter((entry) => entry.path === AUTH_ME_PATH)).toHaveLength(
			1,
		);

		await page.getByRole('link', { name: 'Ir para o segundo perfil' }).hover();
		await page.waitForTimeout(750);

		expect(authRequests.filter((entry) => entry.path === AUTH_ME_PATH)).toHaveLength(
			1,
		);
	});

	test('a slow session guard keeps the previous page and never shows the fullscreen loading logo', async ({
		page,
	}, testInfo) => {
		const baseURL = testInfo.project.use.baseURL as string;
		await setSessionCookies(page, baseURL, {
			access: 'profile-token',
			refresh: 'profile-refresh',
		});
		await page.goto(PROBE_ONE);
		await expect(page.getByTestId('session-profile-name')).toHaveText('Perfil A');
		await page.evaluate(() => {
			const testWindow = window as typeof window & {
				__slowGuardInterval?: number;
				__slowGuardState?: {
					sawFullscreenLoading: boolean;
					sawVisibleProfileA: boolean;
					started: boolean;
				};
			};
			const state = {
				sawFullscreenLoading: false,
				sawVisibleProfileA: false,
				started: false,
			};
			testWindow.__slowGuardState = state;
			document
				.querySelector<HTMLAnchorElement>('a[href*="session-bootstrap-test/two"]')
				?.addEventListener(
					'click',
					() => {
						state.started = true;
					},
					{ capture: true, once: true },
				);
			testWindow.__slowGuardInterval = window.setInterval(() => {
				if (!state.started) {
					return;
				}
				state.sawFullscreenLoading ||= Boolean(
					document.querySelector('div[class*="bg-zinc-950/80"]'),
				);
				state.sawVisibleProfileA ||= Array.from(
					document.querySelectorAll<HTMLElement>(
						'[data-testid="session-profile-name"]',
					),
				).some(
					(element) =>
						element.textContent === 'Perfil A' &&
						element.getClientRects().length > 0,
				);
			}, 16);
		});

		profileVersion = 'B';
		authScenario = 'slow-profile';
		await page
			.getByRole('link', { name: 'Ir para o segundo perfil' })
			.click();
		await expect(page).toHaveURL(PROBE_TWO);
		await expect(
			page.getByRole('main').getByTestId('session-profile-name'),
		).toHaveText('Perfil B');
		const slowGuardState = await page.evaluate(() => {
			const testWindow = window as typeof window & {
				__slowGuardInterval?: number;
				__slowGuardState?: {
					sawFullscreenLoading: boolean;
					sawVisibleProfileA: boolean;
					started: boolean;
				};
			};
			if (testWindow.__slowGuardInterval) {
				window.clearInterval(testWindow.__slowGuardInterval);
			}
			return testWindow.__slowGuardState;
		});
		expect(slowGuardState).toMatchObject({
			sawFullscreenLoading: false,
			sawVisibleProfileA: true,
			started: true,
		});
		expect(
			authRequests
				.filter((entry) => entry.path === AUTH_ME_PATH)
				.map((entry) => entry.servedProfile),
		).toEqual(['A', 'B']);
	});

	test('a slow initial /general guard streams the shell without the fullscreen loading route', async ({
		page,
	}, testInfo) => {
		const baseURL = testInfo.project.use.baseURL as string;
		authScenario = 'slow-profile';
		await setSessionCookies(page, baseURL, {
			access: 'profile-token',
			refresh: 'profile-refresh',
		});

		await page.goto('/general?menu=general&set=ultimos_7_dias', {
			waitUntil: 'commit',
		});
		await page.waitForTimeout(200);

		await expect(
			page.locator('div[class*="bg-zinc-950/80"]').filter({
				has: page.locator('img[alt="Logo LHG Analytics"]'),
			}),
		).toHaveCount(0);
		await expect(page.getByAltText('Logo LHG Analytics')).toBeVisible();
		await expect(
			page.getByRole('heading', { name: /visão geral/i }),
		).toBeVisible();
		expect(authRequests.filter((entry) => entry.path === AUTH_ME_PATH)).toHaveLength(
			1,
		);
	});

	test('query-only navigation performs one new validation and synchronizes profile B', async ({
		page,
	}, testInfo) => {
		const baseURL = testInfo.project.use.baseURL as string;
		await setSessionCookies(page, baseURL, {
			access: 'profile-token',
			refresh: 'profile-refresh',
		});

		await page.goto(PROBE_ONE);
		await expect(page.getByTestId('session-profile-name')).toHaveText('Perfil A');
		profileVersion = 'B';
		await page.getByRole('link', { name: 'Revalidar somente query' }).click();
		await expect(page).toHaveURL(
			`${PROBE_ROOT}/one?menu=general&set=ultimos_7_dias&navigation=two`,
		);
		await expect(page.getByTestId('session-profile-name').last()).toHaveText(
			'Perfil B',
		);
		expect(
			authRequests
				.filter((entry) => entry.path === AUTH_ME_PATH)
				.map((entry) => entry.servedProfile),
		).toEqual(['A', 'B']);
	});

	test('root awaits searchParams and routes the verified session with the requested range', async ({
		page,
	}, testInfo) => {
		const baseURL = testInfo.project.use.baseURL as string;
		await setSessionCookies(page, baseURL, {
			access: 'profile-token',
			refresh: 'profile-refresh',
		});

		await page.goto('/?set=este_mes');
		await expect(page).toHaveURL('/general?menu=general&set=este_mes');
		expect(authRequests.filter((entry) => entry.path === AUTH_ME_PATH)).toHaveLength(
			2,
		);
	});

	test('login redirects an active session but does not refresh a refresh-only session', async ({
		page,
	}, testInfo) => {
		const baseURL = testInfo.project.use.baseURL as string;
		await setSessionCookies(page, baseURL, {
			access: 'profile-token',
			refresh: 'profile-refresh',
		});
		await page.goto('/login?set=este_mes');
		await expect(page).toHaveURL('/general?menu=general&set=este_mes');
		expect(authRequests.filter((entry) => entry.path === AUTH_ME_PATH)).toHaveLength(
			2,
		);

		authRequests = [];
		await setSessionCookies(page, baseURL, {
			refresh: 'profile-refresh',
		});
		await page.goto('/login');
		await expect(page).toHaveURL('/login');
		expect(authRequests).toEqual([]);
	});

	test('successful credentials navigate through root without client auth bootstrap', async ({
		page,
	}, testInfo) => {
		const baseURL = testInfo.project.use.baseURL as string;
		await setSessionCookies(page, baseURL, {});
		const browserAuthRequests = collectBrowserAuthBootstrapRequests(page);

		await page.goto('/login?set=este_mes');
		await page.getByLabel('E-mail').fill('admin@session.test');
		await page.getByLabel('Senha').fill('valid-password');
		await page.getByRole('button', { name: 'Entrar' }).click();

		await expect(page).toHaveURL('/general?menu=general&set=este_mes');
		await expect(page.getByText('Painel Admin')).toBeVisible();
		expect(authRequests.map(({ method, path }) => ({ method, path }))).toEqual([
			{ method: 'POST', path: AUTH_LOGIN_PATH },
			{ method: 'GET', path: AUTH_ME_PATH },
			{ method: 'GET', path: AUTH_ME_PATH },
		]);
		expect(browserAuthRequests).toEqual([]);
	});

	test('session unavailable fallback preserves cookies and retries the real gate', async ({
		page,
	}, testInfo) => {
		const baseURL = testInfo.project.use.baseURL as string;
		authScenario = 'unavailable';
		await setSessionCookies(page, baseURL, {
			access: 'profile-token',
			refresh: 'profile-refresh',
		});

		await page.goto('/general?menu=general&set=ultimos_7_dias');
		await expect(
			page.getByText(/sessão temporariamente indisponível/i),
		).toBeVisible();
		expect(authRequests.filter((entry) => entry.path === AUTH_ME_PATH)).toHaveLength(
			1,
		);
		let cookies = await page.context().cookies();
		expect(cookies.find((cookie) => cookie.name === 'access_token')?.value).toBe(
			'profile-token',
		);
		expect(cookies.find((cookie) => cookie.name === 'refresh_token')?.value).toBe(
			'profile-refresh',
		);

		authScenario = 'profile';
		await page.getByRole('button', { name: /tentar novamente/i }).click();
		await expect(page.getByText('Painel Admin')).toBeVisible();
		expect(authRequests.filter((entry) => entry.path === AUTH_ME_PATH)).toHaveLength(
			2,
		);
		cookies = await page.context().cookies();
		expect(cookies.find((cookie) => cookie.name === 'access_token')?.value).toBe(
			'profile-token',
		);
	});

	test('dashboard error boundary retries errors below the page session boundary', async ({
		page,
	}, testInfo) => {
		const baseURL = testInfo.project.use.baseURL as string;
		await setSessionCookies(page, baseURL, {
			access: 'profile-token',
			refresh: 'profile-refresh',
			forcePageError: true,
		});

		await page.goto(PROBE_ONE);
		await expect(
			page.getByText(/sessão temporariamente indisponível/i),
		).toBeVisible();
		expect(authRequests.filter((entry) => entry.path === AUTH_ME_PATH)).toHaveLength(
			1,
		);

		await page.context().clearCookies({ name: FORCE_PAGE_ERROR_COOKIE });
		await page.getByRole('button', { name: /tentar novamente/i }).click();
		await expect(page.getByTestId('session-profile-status')).toHaveText('authed');
		expect(authRequests.filter((entry) => entry.path === AUTH_ME_PATH)).toHaveLength(
			2,
		);
	});
});
