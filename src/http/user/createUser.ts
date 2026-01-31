/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { auth_api } from '../api-client';
import type { CreateUserInput } from '@/types/user';

export async function createUser({
	email,
	name,
	cpf,
	password,
	role,
	unit,
}: CreateUserInput) {
	try {
		const cookieHeader = await buildAuthCookieHeader();
		const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;
		await auth_api.post('users', {
			headers: authHeaders,
			next: { tags: ['users'] },
			json: {
				email,
				name,
				cpf,
				password,
				role,
				unit,
			},
		});
	} catch (error) {
		console.error(error);
		return error;
	}
}
