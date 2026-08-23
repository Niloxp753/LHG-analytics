/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { auth_api } from '../api-client';
import type { UpdateUserInput } from '@/types/user';
import { UserUpstreamError } from './user-upstream-error';

export async function updateUser({
	email,
	id,
	name,
	cpf,
	password,
	role,
	unit,
}: UpdateUserInput) {
	const cookieHeader = await buildAuthCookieHeader();
	const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;
	try {
		await auth_api.patch(`users/${id}`, {
			headers: authHeaders,
			next: { tags: ['users', `users/${id}`] },
			json: { email, name, cpf, password, role, unit },
		});
	} catch (error) {
		throw new UserUpstreamError(error);
	}
}
