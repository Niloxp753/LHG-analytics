/** @format */

import { cookies } from 'next/headers';

interface User {
	id: string;
	email?: string;
	name?: string;
	cpf?: string;
	password?: string;
	role?: string;
	companyId?: number;
	companyName?: string;
}

const endpoint = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT;

export async function getAllUserByEmail(email: string): Promise<User> {
	const cookieStore = await cookies();
	const token = cookieStore.get('next-auth.session-token');

	const resp = await fetch(`${endpoint}/email/${email}`, {
		method: 'GET',
		next: {
			tags: ['users'],
			revalidate: 30,
		},
		headers: {
			Authorization: `Bearer ${token?.value}`, // Coloca o token no cabeçalho
		},
	});

	const user = resp.json();

	return user;
}
