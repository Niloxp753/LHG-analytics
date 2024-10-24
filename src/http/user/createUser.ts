/** @format */

import { api } from '../api-client';

export interface IUser {
	id?: string;
	email: string;
	name: string;
	cpf: string;
	password: string;
	role: string;
	companyId?: number;
	companyName?: string;
}

export async function createUser({
	email,
	name,
	cpf,
	password,
	role,
	companyId = 1,
}: IUser): Promise<IUser> {
	const resp = await api.post(`users`, {
		next: { tags: ['users'] },
		json: {
			email,
			name,
			cpf,
			password,
			role,
			companyId,
		},
	});

	return resp.json();
}
