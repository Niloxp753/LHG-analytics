/** @format */

import 'server-only';

import { cookies } from 'next/headers';

export async function buildAuthCookieHeader() {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get('access_token')?.value;
	if (!accessToken) {
		return null;
	}

	const refreshToken = cookieStore.get('refresh_token')?.value;
	const parts = [
		`access_token=${accessToken}`,
		refreshToken ? `refresh_token=${refreshToken}` : null,
	].filter(Boolean);

	return parts.length ? parts.join('; ') : null;
}
