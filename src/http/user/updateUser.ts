/** @format */

import { api } from '../api-client';

export interface IUserUp {
	id?: string;
	email?: string;
	name?: string;
	cpf?: string;
	password?: string;
	role?: 'ADMIN' | 'MANAGER';
	company: string;
	companyName?: string;
}

export async function updateUser({
	email,
	id,
	name,
	cpf,
	password,
	role,
	company,
}: IUserUp) {
	try {
		await api.put(`users/${id}`, {
			next: { tags: [`users/${id}`] },
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
