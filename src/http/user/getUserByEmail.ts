/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { auth_api } from '../api-client';
import type { User } from '@/types/user';
import { FetchFailedError, withConditionalCache } from '../conditional-cache';

export async function getAllUserByEmail(email: string): Promise<User | null> {
	const cookieHeader = await buildAuthCookieHeader();
	const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;
	try {
		return await withConditionalCache(
			{
				keyParts: ['users', 'email', email],
				tags: ['users'],
				revalidate: 30,
			},
			async () => {
				const resp = await auth_api.get(
					`users/email/${encodeURIComponent(email)}`,
					{
						headers: authHeaders,
						throwHttpErrors: false,
						cache: 'no-store',
					},
				);

				if (!resp.ok) {
					throw new FetchFailedError(
						'getAllUserByEmail',
						resp.status,
						resp.statusText,
					);
				}

				return (await resp.json()) as User;
			},
		);
	} catch (error) {
		if (error instanceof FetchFailedError) {
			console.error(
				`${error.message}: erro ao buscar dados`,
				error.status,
				error.statusText,
			);
			return null;
		}
		if (error instanceof Error && error.name === 'AbortError') {
			console.error('getAllUserByEmail: request timeout');
			return null;
		}
		console.error('getAllUserByEmail: erro inesperado', error);
		return null;
	}
}
