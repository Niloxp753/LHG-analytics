import { defineConfig, devices } from '@playwright/test';

const PORT = 3122;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
	testDir: './e2e',
	testMatch: /dashboard-server-cache\.spec\.ts/,
	reporter: 'list',
	use: {
		baseURL,
		trace: 'on-first-retry',
		timezoneId: 'America/Sao_Paulo',
	},
	webServer: {
		command: `npm run dev -- -p ${PORT}`,
		url: baseURL,
		reuseExistingServer: false,
		timeout: 120 * 1000,
		env: {
			PLAYWRIGHT_MOCKS: 'true',
			DISABLE_AUTH_COOKIES: 'false',
			// The dev server's local request path can exceed 50 ms before the
			// mock response is delivered. Keep the fixture deterministic while
			// still exercising a short timeout relative to production's 30 s.
			KPI_REQUEST_TIMEOUT_MS: '2000',
			NEXT_PUBLIC_AUTH_URL: baseURL,
			BACKEND_AUTH_ENDPOINT: `${baseURL}/api/mock-backend`,
			BACKEND_CONSOLIDATED_ENDPOINT: `${baseURL}/api/mock-backend`,
			BACKEND_ENDPOINT_IPIRANGA: `${baseURL}/ipiranga/api`,
			BACKEND_ENDPOINT_LAPA: `${baseURL}/lapa/api`,
			BACKEND_ENDPOINT_ANDAR_DE_CIMA: `${baseURL}/andar_de_cima/api`,
			BACKEND_ENDPOINT_TOUT: `${baseURL}/tout/api`,
			BACKEND_ENDPOINT_ALTANA: `${baseURL}/altana/api`,
			BACKEND_ENDPOINT_LIV: `${baseURL}/liv/liv/api`,
			BACKEND_ENDPOINT_GETAN_GARAVELO: `${baseURL}/getan_garavelo/api`,
			BACKEND_ENDPOINT_GETAN_PQ_OESTE: `${baseURL}/getan_pq_oeste/api`,
		},
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
			workers: 1,
		},
	],
});
