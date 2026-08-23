/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { auth_api } from '../api-client';
import { UserUpstreamError } from './user-upstream-error';

export async function deleteUser(id: string) {
	const cookieHeader = await buildAuthCookieHeader();
	const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;
	try {
		await auth_api.delete(`users/${id}`, {
			headers: authHeaders,
			next: { tags: [`users/${id}`] },
		});
	} catch (error) {
		throw new UserUpstreamError(error);
	}
}
