/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { cacheLife, cacheTag } from 'next/cache';
import { auth_api } from '../api-client';
import { User } from '@/types/user';
import { FetchFailedError } from '../conditional-cache';
import { UserUpstreamError } from './user-upstream-error';

async function getAllUsersCached(cookieHeader: string | null): Promise<User[]> {
	'use cache: private';

	cacheLife('dashboard_fast');
	cacheTag('users');

	const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;
	const resp = await auth_api.get('users', {
		headers: authHeaders,
		timeout: 60000,
		retry: 3,
		throwHttpErrors: false,
	});

	if (!resp.ok) {
		throw new FetchFailedError('getAllUsers', resp.status, resp.statusText);
	}

	return (await resp.json()) as User[];
}

export async function getAllUsers(): Promise<User[]> {
	const cookieHeader = await buildAuthCookieHeader();
	try {
		return await getAllUsersCached(cookieHeader);
	} catch (error) {
		throw new UserUpstreamError(error);
	}
}
