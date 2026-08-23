import { expect, test, type Page } from '@playwright/test';
import { readFileSync } from 'fs';
import { createServer, type IncomingMessage, type ServerResponse } from 'http';

const AUTH_PORT = Number(process.env.PW_AUTH_PORT ?? 35603);
const AUTH_BASE_PATH = (process.env.PW_AUTH_BASE_PATH ?? '').replace(/\/+$/, '');
const AUTH_API_PATH = AUTH_BASE_PATH.endsWith('/api')
	? AUTH_BASE_PATH
	: `${AUTH_BASE_PATH}/api`;
const AUTH_ME_PATH = `${AUTH_API_PATH}/me`;
const AUTH_REFRESH_PATH = `${AUTH_API_PATH}/refresh`;
const USER_PATH = `${AUTH_BASE_PATH}/users`;
const PROBE_PATH = '/api/admin-action-authorization-test';
const USER_FIXTURE = {
	id: 42,
	email: 'managed@action.test',
	password: '',
	name: 'Managed User',
	cpf: '35926746094',
	role: 'GERENTE_GERAL',
	unit: 'LUSH_LAPA',
};

type UpstreamRequest = { method: string; path: string; cookie: string; body: unknown };

function json(response: ServerResponse, status: number, body: unknown) {
	response.statusCode = status;
	response.setHeader('content-type', 'application/json');
	response.end(JSON.stringify(body));
}

async function readJsonBody(request: IncomingMessage): Promise<unknown> {
	const chunks: Buffer[] = [];
	for await (const chunk of request) {
		chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
	}
	const body = Buffer.concat(chunks).toString('utf8');
	return body ? JSON.parse(body) : null;
}

async function setAuthCookies(
	page: Page,
	baseURL: string,
	values: { access?: string; refresh?: string },
) {
	await page.context().clearCookies();
	const url = `${new URL(baseURL).origin}/`;
	const cookies = [
		values.access ? { name: 'access_token', value: values.access, url } : null,
		values.refresh ? { name: 'refresh_token', value: values.refresh, url } : null,
	].filter((cookie): cookie is NonNullable<typeof cookie> => Boolean(cookie));
	if (cookies.length) await page.context().addCookies(cookies);
}

async function invokeProbe(
	page: Page,
	probe: 'create' | 'delete' | 'list' | 'update' | 'update-invalid',
	expectedValue: unknown,
) {
	await page.getByTestId(`${probe}-action`).click();
	const expectedLabel =
		expectedValue && typeof expectedValue === 'object' && 'ok' in expectedValue &&
		expectedValue.ok === false && 'code' in expectedValue
			? String(expectedValue.code)
			: 'SUCCESS';
	await expect(page.getByTestId('action-result')).toHaveText(
		`${probe}:${expectedLabel}`,
		{ timeout: 8_000 },
	);
	await expect.poll(async () => {
		const text = await page.getByTestId('action-value').innerText();
		return text ? JSON.parse(text) : null;
	}).toEqual(expectedValue);
}

test.describe('ADMIN Server Action authorization', () => {
	let authServer: ReturnType<typeof createServer> | null = null;
	let authRequests: UpstreamRequest[] = [];
	let userRequests: UpstreamRequest[] = [];
	let adminRole = 'ADMIN';
	let userResponseStatus: Record<string, number> = {};

	test.beforeAll(async () => {
		authServer = createServer(async (request, response) => {
			const path = new URL(request.url ?? '/', 'http://auth.test').pathname;
			const cookie = request.headers.cookie ?? '';
			if (path === AUTH_ME_PATH && request.method === 'GET') {
				authRequests.push({ method: 'GET', path, cookie, body: null });
				if (cookie.includes('access_token=timeout')) {
					await new Promise((resolve) => setTimeout(resolve, 5_500));
					if (!response.destroyed) json(response, 200, adminUser());
					return;
				}
				if (cookie.includes('access_token=admin')) {
					return json(response, 200, {
						...adminUser(),
						role: adminRole,
						unit: adminRole === 'ADMIN' ? 'LHG' : 'LUSH_LAPA',
					});
				}
				if (cookie.includes('access_token=manager')) {
					return json(response, 200, { ...adminUser(), role: 'GERENTE_FINANCEIRO', unit: 'LUSH_LAPA' });
				}
				if (cookie.includes('access_token=expired')) return json(response, 401, {});
				if (cookie.includes('access_token=upstream-forbidden')) return json(response, 403, {});
				if (cookie.includes('access_token=unavailable')) return json(response, 500, {});
				return json(response, 401, {});
			}
			if (path === AUTH_REFRESH_PATH && request.method === 'POST') {
				authRequests.push({ method: 'POST', path, cookie, body: null });
				response.statusCode = 204;
				response.end();
				return;
			}
			if ((path === USER_PATH || path.startsWith(`${USER_PATH}/`)) &&
				['GET', 'POST', 'PATCH', 'DELETE'].includes(request.method ?? '')) {
				userRequests.push({ method: request.method ?? '', path, cookie, body: await readJsonBody(request) });
				const responseStatus = userResponseStatus[request.method ?? ''] ?? 200;
				if (responseStatus !== 200) return json(response, responseStatus, {});
				if (request.method === 'GET') return json(response, 200, [USER_FIXTURE]);
				response.statusCode = 204;
				response.end();
				return;
			}
			json(response, 404, {});
		});
		await new Promise<void>((resolve) => authServer?.listen(AUTH_PORT, '127.0.0.1', resolve));
	});

	test.afterAll(async () => {
		await new Promise<void>((resolve, reject) => {
			if (!authServer) return resolve();
			authServer.close((error) => error ? reject(error) : resolve());
		});
	});

	test.beforeEach(async ({ page }) => {
		authRequests = [];
		userRequests = [];
		adminRole = 'ADMIN';
		userResponseStatus = {};
		await page.goto(PROBE_PATH);
	});

	test('returns FORBIDDEN values from all production actions for a manager', async ({ page }, testInfo) => {
		await setAuthCookies(page, testInfo.project.use.baseURL as string, { access: 'manager', refresh: 'manager-refresh' });
		for (const probe of ['create', 'delete', 'list', 'update'] as const) {
			await invokeProbe(page, probe, { ok: false, code: 'FORBIDDEN' });
		}
		expect(authRequests.map(({ path }) => path)).toEqual([AUTH_ME_PATH, AUTH_ME_PATH, AUTH_ME_PATH, AUTH_ME_PATH]);
		expect(userRequests).toEqual([]);
	});

	test('returns discriminated success values from all production actions', async ({ page }, testInfo) => {
		await setAuthCookies(page, testInfo.project.use.baseURL as string, { access: 'admin', refresh: 'admin-refresh' });
		await invokeProbe(page, 'create', { ok: true, data: null });
		await invokeProbe(page, 'delete', { ok: true, data: null });
		await invokeProbe(page, 'list', { ok: true, data: [USER_FIXTURE] });
		await invokeProbe(page, 'update', { ok: true, data: null });
		expect(authRequests).toHaveLength(4);
		expect(userRequests.map(({ method, path }) => ({ method, path }))).toEqual([
			{ method: 'POST', path: USER_PATH },
			{ method: 'DELETE', path: `${USER_PATH}/42` },
			{ method: 'GET', path: USER_PATH },
			{ method: 'PATCH', path: `${USER_PATH}/42` },
		]);
	});

	test('shares one session read between the real settings boundary and users action', async ({ page }, testInfo) => {
		await setAuthCookies(page, testInfo.project.use.baseURL as string, { access: 'admin', refresh: 'admin-refresh' });
		await page.goto('/settings');
		await expect(page.getByText('Managed User')).toBeVisible();
		expect(authRequests.map(({ path }) => path)).toEqual([AUTH_ME_PATH]);
		expect(userRequests.map(({ method, path }) => ({ method, path }))).toEqual([{ method: 'GET', path: USER_PATH }]);
	});

	test('deduplicates auth checks within a render, not across requests', async ({ page }, testInfo) => {
		await setAuthCookies(page, testInfo.project.use.baseURL as string, { access: 'admin', refresh: 'admin-refresh' });
		await page.goto(`${PROBE_PATH}/render/one`);
		await expect(page.getByTestId('render-authorization-result')).toHaveText('admin@action.test:admin@action.test');
		expect(authRequests).toHaveLength(1);
		await page.goto(`${PROBE_PATH}/render/two`);
		expect(authRequests).toHaveLength(2);
	});

	test('returns UNAUTHORIZED without refresh or cookie mutation', async ({ page }, testInfo) => {
		const baseURL = testInfo.project.use.baseURL as string;
		await setAuthCookies(page, baseURL, {});
		await invokeProbe(page, 'create', { ok: false, code: 'UNAUTHORIZED' });
		await setAuthCookies(page, baseURL, { refresh: 'refresh-only' });
		await invokeProbe(page, 'create', { ok: false, code: 'UNAUTHORIZED' });
		await setAuthCookies(page, baseURL, { access: 'expired', refresh: 'refreshable' });
		await invokeProbe(page, 'delete', { ok: false, code: 'UNAUTHORIZED' });
		expect(authRequests.map(({ path }) => path)).toEqual([AUTH_ME_PATH]);
		expect(userRequests).toEqual([]);
		const cookies = await page.context().cookies();
		expect(cookies.find(({ name }) => name === 'access_token')?.value).toBe('expired');
		expect(cookies.find(({ name }) => name === 'refresh_token')?.value).toBe('refreshable');
	});

	test('maps auth 403 and 5xx to explicit values', async ({ page }, testInfo) => {
		const baseURL = testInfo.project.use.baseURL as string;
		await setAuthCookies(page, baseURL, { access: 'upstream-forbidden' });
		await invokeProbe(page, 'list', { ok: false, code: 'FORBIDDEN' });
		authRequests = [];
		await setAuthCookies(page, baseURL, { access: 'unavailable' });
		await invokeProbe(page, 'update', { ok: false, code: 'SESSION_UNAVAILABLE' });
		expect(authRequests.map(({ path }) => path)).toEqual([AUTH_ME_PATH]);
		expect(userRequests).toEqual([]);
	});

	test('maps auth timeout through a real action with no refresh or user request', async ({ page }, testInfo) => {
		test.setTimeout(20_000);
		await setAuthCookies(page, testInfo.project.use.baseURL as string, { access: 'timeout', refresh: 'keep-on-timeout' });
		await invokeProbe(page, 'create', { ok: false, code: 'SESSION_UNAVAILABLE' });
		expect(authRequests.map(({ path }) => path)).toEqual([AUTH_ME_PATH]);
		expect(userRequests).toEqual([]);
		const cookies = await page.context().cookies();
		expect(cookies.find(({ name }) => name === 'access_token')?.value).toBe('timeout');
		expect(cookies.find(({ name }) => name === 'refresh_token')?.value).toBe('keep-on-timeout');
	});

	for (const status of [401, 403, 500]) {
		test(`returns UPSTREAM_ERROR from all user operations on ${status}`, async ({ page }, testInfo) => {
			userResponseStatus = {
				POST: status,
				DELETE: status,
				GET: status,
				PATCH: status,
			};
			await setAuthCookies(page, testInfo.project.use.baseURL as string, { access: 'admin', refresh: 'admin-refresh' });
			for (const probe of ['create', 'delete', 'list', 'update'] as const) {
				await invokeProbe(page, probe, { ok: false, code: 'UPSTREAM_ERROR' });
			}
			expect(authRequests).toHaveLength(4);
			expect(new Set(userRequests.map(({ method }) => method))).toEqual(new Set(['POST', 'DELETE', 'GET', 'PATCH']));
		});
	}

	test('renders settings upstream failure instead of a successful empty table', async ({ page }, testInfo) => {
		userResponseStatus.GET = 500;
		await setAuthCookies(page, testInfo.project.use.baseURL as string, { access: 'admin', refresh: 'admin-refresh' });
		await page.goto('/settings');
		await expect(page.getByText('Serviço de usuários indisponível')).toBeVisible();
		await expect(page.getByRole('button', { name: 'Adicionar' })).toHaveCount(0);
	});

	test('keeps the warm settings data after denial and upstream failure, then refetches after success', async ({ page }, testInfo) => {
		await setAuthCookies(page, testInfo.project.use.baseURL as string, {
			access: 'admin',
			refresh: 'admin-refresh',
		});

		await page.goto('/settings');
		await expect(page.getByText('Managed User')).toBeVisible();
		expect(userRequests.filter(({ method }) => method === 'GET')).toHaveLength(1);
		await page.getByRole('button', { name: 'Adicionar' }).click();
		await page.getByLabel('Nome').fill('Cache Test User');
		await page.getByLabel('E-mail').fill('cache-test@action.test');
		await page.getByLabel('CPF').fill('35926746094');
		await page.getByLabel('Senha').fill('test-password');
		await page.getByRole('combobox').nth(1).click();
		await page.getByRole('option', { name: 'Lush Lapa' }).click();

		adminRole = 'GERENTE_FINANCEIRO';
		await page.getByRole('button', { name: 'Cadastrar' }).click();
		await expect(page.getByText('Acesso negado')).toBeVisible();
		expect(userRequests.filter(({ method }) => method === 'GET')).toHaveLength(1);

		adminRole = 'ADMIN';
		userResponseStatus.POST = 500;
		await page.getByRole('button', { name: 'Cadastrar' }).click();
		await expect(page.getByText('Serviço de usuários indisponível')).toBeVisible();
		expect(userRequests.filter(({ method }) => method === 'GET')).toHaveLength(1);

		userResponseStatus.POST = 200;
		await page.getByRole('button', { name: 'Cadastrar' }).click();
		await expect(page.getByText('Usuário Cadastrado - 204')).toBeVisible();
		await expect.poll(
			() => userRequests.filter(({ method }) => method === 'GET').length,
		).toBe(2);
	});

	test('rethrows local validation errors instead of reporting an upstream retry', async ({ page }, testInfo) => {
		await setAuthCookies(page, testInfo.project.use.baseURL as string, {
			access: 'admin',
			refresh: 'admin-refresh',
		});

		await page.getByTestId('update-invalid-action').click();
		await expect(page.getByTestId('action-result')).toHaveText(
			'update-invalid:THREW',
		);
		await expect(page.getByTestId('action-value')).toHaveText('threw');
		expect(userRequests).toEqual([]);
	});

	test('keeps test-only wrapper actions out of the manifest', () => {
		const manifest = readFileSync('.next/server/server-reference-manifest.json', 'utf8');
		for (const name of ['runCreateUserProbe', 'runDeleteUserProbe', 'runGetAllUsersProbe', 'runUpdateUserProbe']) {
			expect(manifest).not.toContain(name);
		}
	});

	test('keeps client success feedback after the explicit failure branch', () => {
		for (const componentPath of [
			'src/app/(dashboard)/settings/_components/ModalCreateUser.tsx',
			'src/app/(dashboard)/settings/_components/formUpdate.tsx',
			'src/app/(dashboard)/settings/_components/ColumnActions.tsx',
		]) {
			const source = readFileSync(componentPath, 'utf8');
			expect(source.indexOf('if (!result.ok)')).toBeGreaterThan(-1);
			expect(source.indexOf('toast.success')).toBeGreaterThan(
				source.indexOf('if (!result.ok)'),
			);
		}
	});
});

function adminUser() {
	return {
		email: 'admin@action.test',
		name: 'Action Admin',
		cpf: '359.267.460-94',
		role: 'ADMIN',
		unit: 'LHG',
	};
}
