/** @format */

import { api } from '../api-client';

interface User {
	id?: string;
	email: string;
	name: string;
	cpf: string;
	password: string;
	role: string;
	companyId: number;
	companyName?: string;
}

export async function getAllUsers(): Promise<any[]> {
	const resp = await api.get(`users/all`, { next: { tags: ['users'] } });

	return resp.json();
}
