/** @format */

'use server';

import { createUser, IUser } from '@/http/user/createUser';
import { revalidateTag } from 'next/cache';
import { requireAccessToken } from '@/lib/require-auth';

export async function createUserAction(props: IUser) {
	await requireAccessToken();
	try {
		const resp = await createUser(props);
		revalidateTag('users');
		return resp;
	} catch (error) {
		console.log(error);
	}
}
