/** @format */

import { cookies } from 'next/headers';
import { api } from '../api-client';

export interface User {
	id?: string;
	email: string;
	name: string;
	cpf: string;
	password: string;
	role: string;
	companyId: number;
	companyName?: string;
}

export async function getAllUsers(): Promise<User[]> {
	const cookieStore = await cookies();
	const token = cookieStore.get('next-auth.session-token');
	const resp = await api.get(`users/all`, {
		next: { tags: ['users'], revalidate: 120 },
		timeout: 60000,
		retry: 3,
		headers: {
			Authorization: `Bearer ${token?.value}`, // Coloca o token no cabeçalho
		},
	});

	return resp.json();
}
