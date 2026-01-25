/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { auth_api } from '../api-client';
import type { User } from '@/types/user';

export async function getAllUserByEmail(email: string): Promise<User> {
	const cookieHeader = buildAuthCookieHeader();
	const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;
	const resp = await auth_api.get(`users/email/${encodeURIComponent(email)}`, {
		headers: authHeaders,
		next: { tags: ['users'], revalidate: 30 },
	});

	const user = (await resp.json()) as User;

	return user;
}
