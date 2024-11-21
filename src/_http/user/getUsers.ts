/** @format */

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
	const resp = await api.get(`users/all`, {
		next: { tags: ['users'] },
		timeout: 60000,
		retry: 3,
	});

	return resp.json();
}
