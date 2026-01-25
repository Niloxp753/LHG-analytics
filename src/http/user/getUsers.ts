/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { auth_api } from '../api-client';
import { User } from '@/types/user';

export async function getAllUsers(): Promise<User[]> {
	const cookieHeader = buildAuthCookieHeader();
	const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;
	const resp = await auth_api.get('users', {
		headers: authHeaders,
		next: { tags: ['users'], revalidate: 30 },
		timeout: 60000,
		retry: 3,
	});

	return resp.json();
}
