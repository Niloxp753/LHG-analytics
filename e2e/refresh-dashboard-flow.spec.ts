import { expect, test } from '@playwright/test';
import { createServer, type IncomingMessage, type ServerResponse } from 'http';

const AUTH_PORT = 35555;
const ANALYTICS_PORT = 35556;

const DASHBOARD_PAYLOAD = {
	BigNumbers: [
		{
			currentDate: {
				totalAllValue: 123456.78,
				totalAllRentalsApartments: 420,
				totalAllTicketAverage: 294.18,
				totalAllTrevpar: 377.11,
				totalAllGiro: 3.7,
				totalAverageOccupationTime: '01:23',
			},
			previousDate: {
				totalAllValuePreviousData: 100000,
				totalAllRentalsApartmentsPreviousData: 400,
				totalAllTicketAveragePreviousData: 250,
				totalAllTrevparPreviousData: 300,
				totalAllGiroPreviousData: 3.1,
				totalAverageOccupationTimePreviousData: '01:10',
			},
		},
	],
};

function json(res: ServerResponse, status: number, body: unknown) {
	res.statusCode = status;
	res.setHeader('content-type', 'application/json');
	res.end(JSON.stringify(body));
}

function getCookie(req: IncomingMessage) {
	return req.headers.cookie ?? '';
}

test.describe('refresh -> dashboard flow', () => {
	let authServer: ReturnType<typeof createServer> | null = null;
	let analyticsServer: ReturnType<typeof createServer> | null = null;

	test.beforeAll(async () => {
		authServer = createServer((req: IncomingMessage, res: ServerResponse) => {
			const cookie = getCookie(req);

			if (req.url === '/api/me' && req.method === 'GET') {
				if (cookie.includes('access_token=fresh-token')) {
					json(res, 200, {
						email: 'admin@local.test',
						role: 'ADMIN',
						unit: 'LHG',
						name: 'Admin Local',
					});
					return;
				}

				json(res, 401, { message: 'Expired access token' });
				return;
			}

			if (req.url === '/api/refresh' && req.method === 'POST') {
				if (!cookie.includes('refresh_token=stale-refresh')) {
					json(res, 401, { message: 'Refresh token inválido' });
					return;
				}

				res.statusCode = 200;
				res.setHeader('content-type', 'application/json');
				res.setHeader('set-cookie', [
					'access_token=fresh-token; Path=/; HttpOnly',
					'refresh_token=fresh-refresh; Path=/; HttpOnly',
				]);
				res.end(
					JSON.stringify({
						email: 'admin@local.test',
						role: 'ADMIN',
						unit: 'LHG',
						name: 'Admin Local',
					}),
				);
				return;
			}

			if (
				req.url === '/api/users/email/admin%40local.test' &&
				req.method === 'GET'
			) {
				if (!cookie.includes('access_token=fresh-token')) {
					json(res, 401, { message: 'Token antigo rejeitado' });
					return;
				}

				json(res, 200, {
					email: 'admin@local.test',
					role: 'ADMIN',
					unit: 'LHG',
					name: 'Admin Local',
					cpf: '359.267.460-94',
				});
				return;
			}

			json(res, 404, { ok: false });
		});

		analyticsServer = createServer(
			(req: IncomingMessage, res: ServerResponse) => {
				const cookie = getCookie(req);

				if (
					req.url?.startsWith('/Company/kpis/date-range') &&
					req.method === 'GET'
				) {
					if (!cookie.includes('access_token=fresh-token')) {
						json(res, 504, { message: 'Gateway Timeout' });
						return;
					}

					json(res, 200, DASHBOARD_PAYLOAD);
					return;
				}

				json(res, 404, { ok: false });
			},
		);

		await Promise.all([
			new Promise<void>((resolve) => {
				authServer?.listen(AUTH_PORT, '127.0.0.1', () => resolve());
			}),
			new Promise<void>((resolve) => {
				analyticsServer?.listen(ANALYTICS_PORT, '127.0.0.1', () => resolve());
			}),
		]);
	});

	test.afterAll(async () => {
		await Promise.all([
			new Promise<void>((resolve, reject) => {
				if (!authServer) {
					resolve();
					return;
				}
				authServer.close((error) => {
					if (error) {
						reject(error);
						return;
					}
					resolve();
				});
			}),
			new Promise<void>((resolve, reject) => {
				if (!analyticsServer) {
					resolve();
					return;
				}
				analyticsServer.close((error) => {
					if (error) {
						reject(error);
						return;
					}
					resolve();
				});
			}),
		]);
	});

	test.beforeEach(async ({ page }, testInfo) => {
		const baseURL = testInfo.project.use.baseURL;
		if (!baseURL) {
			throw new Error('Missing baseURL in Playwright config');
		}

		const cookieUrl = `${new URL(baseURL).origin}/`;
		await page.context().addCookies([
			{
				name: 'access_token',
				value: 'stale-token',
				url: cookieUrl,
			},
			{
				name: 'refresh_token',
				value: 'stale-refresh',
				url: cookieUrl,
			},
		]);
	});

	test('refreshes auth and renders the dashboard in the same navigation', async ({
		page,
	}) => {
		await page.goto('/general?menu=general&set=ultimos_7_dias');

		await expect(
			page.getByRole('heading', { name: /visão geral/i }),
		).toBeVisible();
		await expect(page.getByText(/ano anterior/i).first()).toBeVisible();
		await expect(
			page.getByText(/não foi possível carregar os dados/i),
		).toHaveCount(0);

		const cookies = await page.context().cookies();
		const accessToken = cookies.find((cookie) => cookie.name === 'access_token');
		const refreshToken = cookies.find(
			(cookie) => cookie.name === 'refresh_token',
		);

		expect(accessToken?.value).toBe('fresh-token');
		expect(refreshToken?.value).toBe('fresh-refresh');
	});
});
