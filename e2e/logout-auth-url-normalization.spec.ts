import { expect, test } from '@playwright/test';
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';

const AUTH_MOCK_PORT = process.env.PW_AUTH_PORT
	? Number(process.env.PW_AUTH_PORT)
	: 35555;

async function startAuthMockServer() {
	const server = createServer((req: IncomingMessage, res: ServerResponse) => {
		const isLogout =
			req.method === 'POST' && req.url !== undefined && req.url === '/api/logout';

		if (!isLogout) {
			res.statusCode = 404;
			res.setHeader('content-type', 'application/json');
			res.end(JSON.stringify({ message: 'Not found' }));
			return;
		}

		res.statusCode = 200;
		res.setHeader('content-type', 'application/json');
		res.end(JSON.stringify({ message: 'ok' }));
	});

	await new Promise<void>((resolve) => {
		server.listen(AUTH_MOCK_PORT, '127.0.0.1', () => resolve());
	});

	return server;
}

test('logout normalizes NEXT_PUBLIC_AUTH_URL when it already ends with /api', async ({
	request,
}) => {
	const authMockServer = await startAuthMockServer();
	try {
		const response = await request.post('/api/logout', {
			headers: {
				Cookie: 'access_token=a; refresh_token=b',
			},
		});

		expect(response.status()).toBe(200);
		const body = (await response.json()) as { ok: boolean; upstreamStatus?: number };
		expect(body.ok).toBe(true);
		expect(body.upstreamStatus).toBe(200);
	} finally {
		await new Promise<void>((resolve, reject) => {
			authMockServer.close((error) => {
				if (error) {
					reject(error);
					return;
				}
				resolve();
			});
		});
	}
});
