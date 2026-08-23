import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.PW_PORT ? Number(process.env.PW_PORT) : 3123;
const baseURL = `http://localhost:${PORT}`;
const AUTH_PORT = process.env.PW_AUTH_PORT
	? Number(process.env.PW_AUTH_PORT)
	: 35603;
const AUTH_BASE_PATH = process.env.PW_AUTH_BASE_PATH ?? '';
const authBaseURL = `http://127.0.0.1:${AUTH_PORT}${AUTH_BASE_PATH}`;

export default defineConfig({
	testDir: './e2e',
	reporter: 'list',
	workers: 1,
	use: {
		baseURL,
		trace: 'on-first-retry',
	},
	webServer: {
		command: `npm run build && npm run start -- -p ${PORT}`,
		url: baseURL,
		reuseExistingServer: false,
		timeout: 180 * 1000,
			env: {
			PLAYWRIGHT_MOCKS: 'true',
			DISABLE_AUTH_COOKIES: 'false',
			NEXT_PUBLIC_AUTH_URL: authBaseURL,
			BACKEND_AUTH_ENDPOINT: authBaseURL,
			BACKEND_CONSOLIDATED_ENDPOINT: `${baseURL}/api/mock-backend`,
			BACKEND_ENDPOINT_IPIRANGA: `${baseURL}/api/mock-backend`,
			BACKEND_ENDPOINT_LAPA: `${baseURL}/api/mock-backend`,
			BACKEND_ENDPOINT_ANDAR_DE_CIMA: `${baseURL}/api/mock-backend`,
			BACKEND_ENDPOINT_TOUT: `${baseURL}/api/mock-backend`,
			BACKEND_ENDPOINT_ALTANA: `${baseURL}/api/mock-backend`,
			BACKEND_ENDPOINT_LIV: `${baseURL}/api/mock-backend`,
			BACKEND_ENDPOINT_GETAN_GARAVELO: `${baseURL}/api/mock-backend`,
			BACKEND_ENDPOINT_GETAN_PQ_OESTE: `${baseURL}/api/mock-backend`,
		},
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
});
