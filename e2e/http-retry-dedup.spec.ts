import { expect, test } from '@playwright/test';

const BACKEND_BASE_URL = 'http://backend.local';

function clearModule(modulePath: string) {
	delete require.cache[require.resolve(modulePath)];
}

function mockServerOnlyModule() {
	const serverOnlyPath = require.resolve('server-only');
	const previous = require.cache[serverOnlyPath];

	require.cache[serverOnlyPath] = {
		id: serverOnlyPath,
		filename: serverOnlyPath,
		loaded: true,
		exports: {},
		children: [],
		paths: [],
		parent: null,
		isPreloading: false,
		path: serverOnlyPath,
		require,
	} as unknown as NodeModule;

	return () => {
		if (previous) {
			require.cache[serverOnlyPath] = previous;
			return;
		}

		delete require.cache[serverOnlyPath];
	};
}

test.describe('HTTP retry dedup', () => {
	test('does not add implicit ky retries on retryable KPI responses', async () => {
		const originalFetch = global.fetch;
		const originalEnv = {
			BACKEND_AUTH_ENDPOINT: process.env.BACKEND_AUTH_ENDPOINT,
			BACKEND_ENDPOINT_IPIRANGA: process.env.BACKEND_ENDPOINT_IPIRANGA,
			BACKEND_ENDPOINT_LAPA: process.env.BACKEND_ENDPOINT_LAPA,
			BACKEND_ENDPOINT_ANDAR_DE_CIMA:
				process.env.BACKEND_ENDPOINT_ANDAR_DE_CIMA,
			BACKEND_ENDPOINT_TOUT: process.env.BACKEND_ENDPOINT_TOUT,
			BACKEND_ENDPOINT_LIV: process.env.BACKEND_ENDPOINT_LIV,
		};
		const fetchCalls: string[] = [];

		process.env.BACKEND_AUTH_ENDPOINT = BACKEND_BASE_URL;
		process.env.BACKEND_ENDPOINT_IPIRANGA = BACKEND_BASE_URL;
		process.env.BACKEND_ENDPOINT_LAPA = BACKEND_BASE_URL;
		process.env.BACKEND_ENDPOINT_ANDAR_DE_CIMA = BACKEND_BASE_URL;
		process.env.BACKEND_ENDPOINT_TOUT = BACKEND_BASE_URL;
		process.env.BACKEND_ENDPOINT_LIV = BACKEND_BASE_URL;

		const restoreServerOnly = mockServerOnlyModule();

		global.fetch = (async (input: RequestInfo | URL) => {
			const url =
				typeof input === 'string'
					? input
					: input instanceof Request
						? input.url
						: input.toString();
			fetchCalls.push(url);

			throw new TypeError('network failure');
		}) as typeof global.fetch;

		try {
			clearModule('../src/http/api-client');

			// eslint-disable-next-line @typescript-eslint/no-require-imports
			const { api } = require('../src/http/api-client') as typeof import('../src/http/api-client');

			await expect(
				api.get('Company/kpis/date-range', {
					searchParams: {
						startDate: '01/03/2026',
						endDate: '07/03/2026',
					},
					throwHttpErrors: false,
				}),
			).rejects.toThrow('network failure');

			expect(fetchCalls).toHaveLength(1);
			expect(fetchCalls).toEqual([
				`${BACKEND_BASE_URL}/Company/kpis/date-range?startDate=01%2F03%2F2026&endDate=07%2F03%2F2026`,
			]);
		} finally {
			global.fetch = originalFetch;

			process.env.BACKEND_AUTH_ENDPOINT = originalEnv.BACKEND_AUTH_ENDPOINT;
			process.env.BACKEND_ENDPOINT_IPIRANGA =
				originalEnv.BACKEND_ENDPOINT_IPIRANGA;
			process.env.BACKEND_ENDPOINT_LAPA = originalEnv.BACKEND_ENDPOINT_LAPA;
			process.env.BACKEND_ENDPOINT_ANDAR_DE_CIMA =
				originalEnv.BACKEND_ENDPOINT_ANDAR_DE_CIMA;
			process.env.BACKEND_ENDPOINT_TOUT = originalEnv.BACKEND_ENDPOINT_TOUT;
			process.env.BACKEND_ENDPOINT_LIV = originalEnv.BACKEND_ENDPOINT_LIV;

			clearModule('../src/http/api-client');
			restoreServerOnly();
		}
	});
});
