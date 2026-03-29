import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.PW_PORT ? Number(process.env.PW_PORT) : 3116;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
	testDir: './e2e',
	reporter: 'list',
	use: {
		baseURL,
		trace: 'on-first-retry',
	},
	webServer: {
		command: `npx next dev --webpack -p ${PORT}`,
		url: baseURL,
		reuseExistingServer: false,
		timeout: 120 * 1000,
		env: {
			PLAYWRIGHT_MOCKS: 'false',
			DISABLE_AUTH_COOKIES: 'false',
			NEXT_PUBLIC_AUTH_URL: 'http://127.0.0.1:35555',
			BACKEND_AUTH_ENDPOINT: 'http://127.0.0.1:35556',
			BACKEND_ENDPOINT_IPIRANGA: 'http://127.0.0.1:35556',
			BACKEND_ENDPOINT_LAPA: 'http://127.0.0.1:35556',
			BACKEND_ENDPOINT_ANDAR_DE_CIMA: 'http://127.0.0.1:35556',
			BACKEND_ENDPOINT_TOUT: 'http://127.0.0.1:35556',
			BACKEND_ENDPOINT_ALTANA: 'http://127.0.0.1:35556',
			BACKEND_ENDPOINT_LIV: 'http://127.0.0.1:35556',
		},
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
});
