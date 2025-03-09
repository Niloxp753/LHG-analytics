/** @format */

import { api } from '../api-client';

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
	try {
		await api.post(`users`, {
			next: { tags: ['users'] },
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
