/** @format */

'use server';

import { deleteUser } from '@/http/user/deleteuser';
import { revalidateTag } from 'next/cache';

export async function deleteUserAction(id: string) {
	try {
		await deleteUser(id);
		revalidateTag('users');
	} catch (error) {
		console.log(error);
	}
}
