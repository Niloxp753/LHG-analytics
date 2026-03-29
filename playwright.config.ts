import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.PW_PORT ? Number(process.env.PW_PORT) : 3100;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
	testDir: './e2e',
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
			DISABLE_AUTH_COOKIES: 'true',
			NEXT_PUBLIC_AUTH_URL: baseURL,
			BACKEND_AUTH_ENDPOINT: `${baseURL}/api/mock-backend`,
			BACKEND_ENDPOINT_IPIRANGA: `${baseURL}/ipiranga/api`,
			BACKEND_ENDPOINT_LAPA: `${baseURL}/lapa/api`,
			BACKEND_ENDPOINT_ANDAR_DE_CIMA: `${baseURL}/andar_de_cima/api`,
			BACKEND_ENDPOINT_TOUT: `${baseURL}/tout/api`,
			BACKEND_ENDPOINT_ALTANA: `${baseURL}/altana/api`,
			BACKEND_ENDPOINT_LIV: `${baseURL}/liv/liv/api`,
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
