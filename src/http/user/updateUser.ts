/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { auth_api } from '../api-client';
import type { UpdateUserInput } from '@/types/user';

export async function updateUser({
	email,
	id,
	name,
	cpf,
	role,
	unit,
}: UpdateUserInput) {
	try {
		const cookieHeader = await buildAuthCookieHeader();
		const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;
		await auth_api.patch(`users/${id}`, {
			headers: authHeaders,
			next: { tags: ['users', `users/${id}`] },
			json: {
				email,
				name,
				cpf,
				role,
				unit,
			},
		});
	} catch (error) {
		console.error(error);
		return error;
	}
}
