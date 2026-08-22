/** @format */

import { buildAuthCookieHeader } from '@/lib/auth-headers';
import { cacheLife, cacheTag } from 'next/cache';
import { auth_api } from '../api-client';
import type { User } from '@/types/user';
import { FetchFailedError } from '../conditional-cache';
import { logFetchFailed, logRequestTimeout } from '../logging';

async function getAllUserByEmailCached(
	email: string,
	cookieHeader: string | null,
): Promise<User> {
	'use cache: private';

	cacheLife('dashboard_fast');
	cacheTag('users');

	const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;
	const resp = await auth_api.get(`users/email/${encodeURIComponent(email)}`, {
		headers: authHeaders,
		throwHttpErrors: false,
	});

	if (!resp.ok) {
		throw new FetchFailedError('getAllUserByEmail', resp.status, resp.statusText);
	}

	return (await resp.json()) as User;
}

export async function getAllUserByEmail(email: string): Promise<User | null> {
	const cookieHeader = await buildAuthCookieHeader();
	try {
		return await getAllUserByEmailCached(email, cookieHeader);
	} catch (error) {
		if (error instanceof FetchFailedError) {
			logFetchFailed(error);
			return null;
		}
		if (error instanceof Error && error.name === 'AbortError') {
			logRequestTimeout('getAllUserByEmail');
			return null;
		}
		console.error('getAllUserByEmail: erro inesperado', error);
		return null;
	}
}
