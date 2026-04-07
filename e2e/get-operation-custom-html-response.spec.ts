import { expect, test } from '@playwright/test';

test.describe('readJsonResponse', () => {
	test('throws a handled fetch failure for html responses', async () => {
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		const { readJsonResponse } = require(
			'../src/http/read-json-response'
		) as typeof import('../src/http/read-json-response');

		const response = new Response(
			'<!DOCTYPE html><html><body>login</body></html>',
			{
				status: 200,
				headers: {
					'content-type': 'text/html; charset=utf-8',
				},
			},
		);

		await expect(
			readJsonResponse(response, 'getOperationCustom (altana)'),
		).rejects.toMatchObject({
			name: 'FetchFailedError',
			status: 200,
			statusText: expect.stringContaining('Unexpected content-type'),
		});
	});

	test('logs unexpected html responses as warnings in development', async () => {
		const env = process.env as Record<string, string | undefined>;
		const originalNodeEnv = env.NODE_ENV;
		const originalConsoleWarn = console.warn;
		const originalConsoleError = console.error;
		const warnCalls: unknown[][] = [];
		const errorCalls: unknown[][] = [];

		env.NODE_ENV = 'development';
		console.warn = (...args: unknown[]) => {
			warnCalls.push(args);
		};
		console.error = (...args: unknown[]) => {
			errorCalls.push(args);
		};

		try {
			const loggingPath = require.resolve('../src/http/logging');
			delete require.cache[loggingPath];

			// eslint-disable-next-line @typescript-eslint/no-require-imports
			const { logFetchFailed } = require('../src/http/logging') as typeof import('../src/http/logging');

			logFetchFailed({
				message: 'getOperationCustom (altana)',
				status: 200,
				statusText: 'Unexpected content-type: text/html; charset=utf-8',
			});

			expect(warnCalls).toContainEqual([
				'getOperationCustom (altana): erro ao buscar dados',
				200,
				'Unexpected content-type: text/html; charset=utf-8',
			]);
			expect(errorCalls).toEqual([]);
		} finally {
			if (originalNodeEnv === undefined) {
				delete env.NODE_ENV;
			} else {
				env.NODE_ENV = originalNodeEnv;
			}

			console.warn = originalConsoleWarn;
			console.error = originalConsoleError;
		}
	});
});
