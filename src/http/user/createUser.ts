/** @format */

import { api } from '../api-client';

export interface IUser {
	id?: string;
	email: string;
	name: string;
	cpf: string;
	password: string;
	role?: 'ADMIN' | 'MANAGER';
	companyId: number;
	companyName?: string;
}

export async function createUser({
	email,
	name,
	cpf,
	password,
	role,
	companyId = 1,
}: IUser) {
	try {
		await api.post(`users`, {
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
	} catch (error) {
		console.error(error);
		return error;
	}
}
