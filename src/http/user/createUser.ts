/** @format */

import { api } from '../api-client';
import { cookies } from 'next/headers';

export interface IUser {
	id?: string;
	email: string;
	name: string;
	cpf: string;
	password: string;
	role?: 'ADMIN' | 'MANAGER';
	company: string;
	companyName?: string;
}

export async function createUser({
	email,
	name,
	cpf,
	password,
	role,
	company,
}: IUser) {
	const cookieStore = await cookies();
	const token = cookieStore.get('next-auth.session-token');
	try {
		await api.post(`users`, {
			next: { tags: ['users'] },
			headers: {
				Authorization: `Bearer ${token?.value}`, // Coloca o token no cabeçalho
			},
			json: {
				email,
				name,
				cpf,
				password,
				role,
				company,
			},
		});
	} catch (error) {
		console.error(error);
		return error;
	}
}
