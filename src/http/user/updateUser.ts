/** @format */

import { api } from '../api-client';

export interface IUserUp {
	id?: string;
	email?: string;
	name?: string;
	cpf?: string;
	password?: string;
	role?: 'ADMIN' | 'MANAGER';
	companyId?: number;
	companyName?: string;
}

export async function updateUser({
	email,
	id,
	name,
	cpf,
	password,
	role,
	companyId = 1,
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
				companyId,
			},
		});
		
	} catch (error) {
		console.error(error);
		return error;
	}
}
