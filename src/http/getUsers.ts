/** @format */

interface User {
	email: string;
	name: string;
	cpf: string;
	password: string;
	role: string;
	companyId: number;
	companyName?: string;
}

const endpoint = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT;

export async function getAllUsers(): Promise<User[]> {
	const resp = await fetch(endpoint!, {
		next: {
			tags: ['users'],
		},
	});

	const users = resp.json();
	return users;
}
