/** @format */

'use server';

import { createUser, IUser } from '@/http/user/createUser';
import { getServerSession } from 'next-auth';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createUserAction(props: IUser) {
	const session = await getServerSession();
	if (!session) {
		redirect('/login');
	}
	try {
		const resp = await createUser(props);
		revalidateTag('users');
		return resp;
	} catch (error) {
		console.log(error);
	}
}
