import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.PW_PORT ? Number(process.env.PW_PORT) : 3100;
const baseURL = `http://localhost:${PORT}`;
const serverCommand =
	process.env.PW_SERVER === 'start'
		? `npm run start -- -p ${PORT}`
		: `npm run dev -- -p ${PORT}`;

export default defineConfig({
	testDir: './e2e',
	reporter: 'list',
	use: {
		baseURL,
		trace: 'on-first-retry',
		timezoneId: 'America/Sao_Paulo',
	},
	webServer: {
		command: serverCommand,
		url: baseURL,
		reuseExistingServer: false,
		timeout: 120 * 1000,
		env: {
			PLAYWRIGHT_MOCKS: 'true',
			DISABLE_AUTH_COOKIES: 'true',
			NEXT_PUBLIC_AUTH_URL: baseURL,
			BACKEND_AUTH_ENDPOINT: baseURL,
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
			testIgnore: /calendar-mobile\.spec\.ts/,
		},
		{
			name: 'webkit-iphone',
			use: { ...devices['iPhone 13'] },
			testMatch: /calendar-mobile\.spec\.ts/,
		},
	],
});
