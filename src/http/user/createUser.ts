/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { auth_api } from '../api-client';
import type { CreateUserInput } from '@/types/user';
import { UserUpstreamError } from './user-upstream-error';

export async function createUser({
	email,
	name,
	cpf,
	password,
	role,
	unit,
}: CreateUserInput) {
	const cookieHeader = await buildAuthCookieHeader();
	const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;
	try {
		await auth_api.post('users', {
			headers: authHeaders,
			next: { tags: ['users'] },
			json: { email, name, cpf, password, role, unit },
		});
	} catch (error) {
		throw new UserUpstreamError(error);
	}
}
