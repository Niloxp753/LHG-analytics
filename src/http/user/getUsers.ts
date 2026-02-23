/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { auth_api } from '../api-client';
import { User } from '@/types/user';
import { FetchFailedError, withConditionalCache } from '../conditional-cache';
import { logFetchFailed, logRequestTimeout } from '../logging';

export async function getAllUsers(): Promise<User[] | null> {
	const cookieHeader = await buildAuthCookieHeader();
	const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;
	try {
		return await withConditionalCache(
			{
				keyParts: ['users', 'all'],
				tags: ['users'],
				revalidate: 30,
			},
			async () => {
				const resp = await auth_api.get('users', {
					headers: authHeaders,
					timeout: 60000,
					retry: 3,
					throwHttpErrors: false,
					cache: 'no-store',
				});

				if (!resp.ok) {
					throw new FetchFailedError(
						'getAllUsers',
						resp.status,
						resp.statusText,
					);
				}

				return resp.json();
			},
		);
	} catch (error) {
		if (error instanceof FetchFailedError) {
			logFetchFailed(error);
			return null;
		}
		if (error instanceof Error && error.name === 'AbortError') {
			logRequestTimeout('getAllUsers');
			return null;
		}
		console.error('getAllUsers: erro inesperado', error);
		return null;
	}
}
