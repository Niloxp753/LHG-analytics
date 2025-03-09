/** @format */

'use server';

import { deleteUser } from '@/http/user/deleteuser';
import { getServerSession } from 'next-auth';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteUserAction(id: string) {
	const session = await getServerSession();
	if (!session) {
		redirect('/login');
	}

	try {
		await deleteUser(id);
		revalidateTag(`users/${id}`);
	} catch (error) {
		console.log(error);
	}
}
