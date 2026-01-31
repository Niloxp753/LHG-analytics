/** @format */

'use server';

import { deleteUser } from '@/http/user/deleteuser';
import { requireAccessToken } from '@/lib/require-auth';
import { revalidatePath } from 'next/cache';

export async function deleteUserAction(id: string) {
	await requireAccessToken();

	try {
		await deleteUser(id);
		revalidatePath('/settings');
	} catch (error) {
		console.log(error);
	}
}
