/** @format */

'use server';

import { deleteUser } from '@/http/user/deleteuser';
import { revalidateTag } from 'next/cache';
import { requireAccessToken } from '@/lib/require-auth';

export async function deleteUserAction(id: string) {
	await requireAccessToken();

	try {
		await deleteUser(id);
		revalidateTag(`users/${id}`);
	} catch (error) {
		console.log(error);
	}
}
