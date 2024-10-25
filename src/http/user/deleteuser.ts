/** @format */

import { api } from '../api-client';

export async function deleteUser(id: string) {
	try {
		await api.delete(`users/${id}`, {
			next: { tags: [`users/${id}`] },
		});
	} catch (error) {
		console.error(error);
		return error;
	}
}
