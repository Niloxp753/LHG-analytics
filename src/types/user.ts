/** @format */

import type { AccessUnit, Role } from '@/lib/access-control';

export type User = {
	id: number | string;
	email: string;
	password: string;
	name: string;
	cpf: string;
	role: Role | string;
	unit?: AccessUnit | string | null;
	createdAt?: string;
	updatedAt?: string;
};

export type CreateUserInput = {
	email: string;
	name: string;
	cpf: string;
	password: string;
	role?: Role;
	unit: AccessUnit;
};

export type UpdateUserInput = {
	id?: number | string;
	email?: string;
	name?: string;
	cpf?: string;
	role?: Role;
	unit: AccessUnit | string | null;
};
