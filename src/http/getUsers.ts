/** @format */

interface User {
	id: string;
	email: string;
	name: string;
	cpf: string;
	password: string;
	role: string;
	companyId: number;
	companyName?: string;
}

const endpoint = process.env.BACKEND_ENDPOINT;

export async function getAllUsers(): Promise<User[]> {
	const resp = await fetch(`${endpoint!}/users/all`, {
		next: {
			tags: ['users'],
		},
	});

	return resp.json();
}
