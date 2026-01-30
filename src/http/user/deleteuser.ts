/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { auth_api } from '../api-client';

export async function deleteUser(id: string) {
	try {
		const cookieHeader = await buildAuthCookieHeader();
		const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;
		await auth_api.delete(`users/${id}`, {
			headers: authHeaders,
			next: { tags: [`users/${id}`] },
		});
	} catch (error) {
		console.error(error);
		return error;
	}
}
