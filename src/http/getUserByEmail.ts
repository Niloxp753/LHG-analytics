/** @format */

interface User {
	email?: string;
	name?: string;
	cpf?: string;
	password?: string;
	role?: string;
	companyId?: number;
	companyName?: string;
}

const endpoint = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT;

export async function getAllUserByEmail(email: string) {
	const resp = await fetch(`${endpoint}/email/${email}`, {
		next: {
			tags: ['users'],
		},
	});

	const user = resp.json();
	console.log(user);
	return user;
}
