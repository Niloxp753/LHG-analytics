/** @format */

import { api } from '../api-client';
import { AccessUnit, Role } from '@/lib/access-control';

export interface IUser {
	id?: string;
	email: string;
	name: string;
	cpf: string;
	password: string;
	role?: Role;
	company: AccessUnit;
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
