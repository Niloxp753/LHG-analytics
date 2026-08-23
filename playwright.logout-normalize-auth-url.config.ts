import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.PW_PORT ? Number(process.env.PW_PORT) : 3115;
const baseURL = `http://localhost:${PORT}`;
const AUTH_PORT = process.env.PW_AUTH_PORT
	? Number(process.env.PW_AUTH_PORT)
	: 35555;
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
	},
	webServer: {
		command: serverCommand,
		url: baseURL,
		reuseExistingServer: false,
		timeout: 120 * 1000,
		env: {
			NEXT_PUBLIC_AUTH_URL: `http://127.0.0.1:${AUTH_PORT}/api`,
			DISABLE_AUTH_COOKIES: 'false',
			BACKEND_ENDPOINT_IPIRANGA: `${baseURL}/ipiranga/api`,
			BACKEND_ENDPOINT_LAPA: `${baseURL}/lapa/api`,
			BACKEND_ENDPOINT_ANDAR_DE_CIMA: `${baseURL}/andar_de_cima/api`,
			BACKEND_ENDPOINT_TOUT: `${baseURL}/tout/api`,
			BACKEND_ENDPOINT_LIV: `${baseURL}/liv/liv/api`,
		},
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
});
