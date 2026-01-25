/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { auth_api } from '../api-client';

class HTTPError extends Error {}

export async function getCompanyUnified(
	startDate: string,
	endDate: string,
): Promise<any> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 60000);
	const cookieHeader = buildAuthCookieHeader();
	const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;

	try {
		const resp = await auth_api.get('Company/kpis/date-range', {
			searchParams: { startDate, endDate },
			next: { tags: ['company'], revalidate: 30 },
			headers: authHeaders,
			signal: controller.signal,
		});

		if (!resp.ok) {
			throw new HTTPError(`Fetch error: ${resp.statusText}`);
		}

		return resp.json();
	} catch (error) {
		if (error instanceof Error) {
			if (error.name === 'AbortError') {
				throw new HTTPError('Request timed out');
			}
			throw new HTTPError(error.message);
		}
		throw new HTTPError('Unknown error occurred');
	} finally {
		clearTimeout(timeout);
	}
}
