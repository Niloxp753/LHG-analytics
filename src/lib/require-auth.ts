/** @format */

import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const authUrl = process.env.NEXT_PUBLIC_AUTH_URL;

export async function requireAccessToken() {
	const cookieStore = cookies();
	const token = cookieStore.get('access_token')?.value;
	if (!token) {
		redirect('/login');
	}

	const refreshToken = cookieStore.get('refresh_token')?.value;
	const cookieHeader = [
		`access_token=${token}`,
		refreshToken ? `refresh_token=${refreshToken}` : null,
	]
		.filter(Boolean)
		.join('; ');

	try {
		const resp = await fetch(`${authUrl}/api/me`, {
			method: 'GET',
			headers: {
				accept: 'application/json',
				cookie: cookieHeader,
			},
			cache: 'no-store',
		});

		if (!resp.ok) {
			redirect('/login');
		}
	} catch {
		redirect('/login');
	}

	return token;
}
