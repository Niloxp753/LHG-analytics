import { expect, test } from '@playwright/test';
import { createServer, type IncomingMessage, type ServerResponse } from 'http';

const AUTH_PORT = 35555;
const AUTH_BASE_URL = `http://127.0.0.1:${AUTH_PORT}`;

function json(res: ServerResponse, status: number, body: unknown) {
	res.statusCode = status;
	res.setHeader('content-type', 'application/json');
	res.end(JSON.stringify(body));
}

test.describe('proxy auth behavior on /login', () => {
	let meCalls = 0;
	let refreshCalls = 0;
	let server: ReturnType<typeof createServer> | null = null;

	test.beforeAll(async () => {
		server = createServer((req: IncomingMessage, res: ServerResponse) => {
			if (req.url === '/api/me' && req.method === 'GET') {
				meCalls += 1;
				json(res, 401, { ok: false });
				return;
			}

			if (req.url === '/api/refresh' && req.method === 'POST') {
				refreshCalls += 1;
				json(res, 200, {
					email: 'refresh@local.test',
					role: 'ADMIN',
					unit: 'LHG',
				});
				return;
			}

			if (req.url === '/metrics' && req.method === 'GET') {
				json(res, 200, { meCalls, refreshCalls });
				return;
			}

			json(res, 404, { ok: false });
		});

		await new Promise<void>((resolve) => {
			server?.listen(AUTH_PORT, '127.0.0.1', () => resolve());
		});
	});

	test.afterAll(async () => {
		await new Promise<void>((resolve, reject) => {
			if (!server) {
				resolve();
				return;
			}
			server.close((error) => {
				if (error) {
					reject(error);
					return;
				}
				resolve();
			});
		});
	});

	test.beforeEach(async ({ page }, testInfo) => {
		meCalls = 0;
		refreshCalls = 0;

		const baseURL = testInfo.project.use.baseURL;
		if (!baseURL) {
			throw new Error('Missing baseURL in Playwright config');
		}

		const cookieUrl = `${new URL(baseURL).origin}/`;
		await page.context().addCookies([
			{
				name: 'refresh_token',
				value: 'refresh-only',
				url: cookieUrl,
			},
		]);
	});

	test('stays on /login and does not refresh token when only refresh_token cookie exists', async ({
		page,
	}) => {
		await page.goto('/login');

		await expect(page).toHaveURL(/\/login$/);

		const metricsResponse = await fetch(`${AUTH_BASE_URL}/metrics`);
		const metrics = (await metricsResponse.json()) as {
			meCalls: number;
			refreshCalls: number;
		};

		expect(metrics.meCalls).toBe(0);
		expect(metrics.refreshCalls).toBe(0);
	});
});
