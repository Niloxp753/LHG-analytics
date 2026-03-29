import { expect, test } from '@playwright/test';
import { createServer, type IncomingMessage, type ServerResponse } from 'http';

const BACKEND_PORT = 35557;
const BACKEND_DELAY_MS = 2500;

function json(res: ServerResponse, status: number, body: unknown) {
	res.statusCode = status;
	res.setHeader('content-type', 'application/json');
	res.end(JSON.stringify(body));
}

test.describe('dashboard KPI streaming', () => {
	let server: ReturnType<typeof createServer> | null = null;

	test.beforeAll(async () => {
		server = createServer((req: IncomingMessage, res: ServerResponse) => {
			const url = new URL(req.url ?? '/', `http://${req.headers.host}`);

			if (url.pathname === '/Company/kpis/date-range' && req.method === 'GET') {
				const isCustomRange =
					url.searchParams.get('startDate') === '01/03/2026' &&
					url.searchParams.get('endDate') === '07/03/2026';

				setTimeout(() => {
					json(res, 200, {
						BigNumbers: [
							{
								currentDate: {
									totalAllValue: isCustomRange ? 223456.78 : 123456.78,
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
					});
				}, BACKEND_DELAY_MS);
				return;
			}

			json(res, 404, { ok: false });
		});

		await new Promise<void>((resolve) => {
			server?.listen(BACKEND_PORT, '127.0.0.1', () => resolve());
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
		const baseURL = testInfo.project.use.baseURL;
		if (!baseURL) {
			throw new Error('Missing baseURL in Playwright config');
		}

		const cookieUrl = `${new URL(baseURL).origin}/`;
		await page.context().addCookies([
			{
				name: 'access_token',
				value: 'playwright',
				url: cookieUrl,
			},
			{
				name: 'refresh_token',
				value: 'playwright_refresh',
				url: cookieUrl,
			},
		]);
	});

	test('renders the dashboard shell before KPI data resolves', async ({ page }) => {
		await page.goto('/general?menu=general&set=ultimos_7_dias');
		await expect(page.getByText(/123\.456,78/)).toBeVisible();

		const startedAt = Date.now();
		const navigation = page.goto(
			'/general?menu=general&set=ultimos_7_dias&startDate=01/03/2026&endDate=07/03/2026',
			{
				waitUntil: 'commit',
			},
		);

		await expect(page.getByRole('heading', { level: 2 }).first()).toBeVisible({
			timeout: BACKEND_DELAY_MS + 2000,
		});
		const shellElapsedMs = Date.now() - startedAt;
		expect(shellElapsedMs).toBeLessThan(BACKEND_DELAY_MS);

		await navigation;
		await expect(page.getByText(/223\.456,78/)).toBeVisible();
		const totalElapsedMs = Date.now() - startedAt;
		expect(totalElapsedMs).toBeGreaterThanOrEqual(BACKEND_DELAY_MS);
	});
});
