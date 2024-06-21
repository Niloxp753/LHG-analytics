/** @format */

import { faker } from '@faker-js/faker';

export interface User {
	id: string;
	name: string;
	email: string;
	password: string;
	unidade: string;
	status: string;
	CPF: string;
}

function createFakeData(size: number) {
	return Array.from({ length: size }, () => ({
		id: faker.string.uuid(),
		name: faker.person.fullName(),
		email: faker.internet.email(),
		password: faker.internet.password(),
		unidade: faker.helpers.arrayElement([
			'Lush Ipiranga',
			'Lush Guarujá',
			'Andar de Cima',
			'Tout Campinas',
		]),
		status: faker.helpers.arrayElement(['Gestor', 'Admin']),
		CPF: faker.string.numeric({ length: 11 }),
		avatar: faker.image.avatar(),
	}));
}

export const DataUser = createFakeData(8);
