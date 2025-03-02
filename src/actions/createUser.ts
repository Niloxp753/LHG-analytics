/** @format */

'use server';

import { createUser, IUser } from '@/http/user/createUser';
import { revalidateTag } from 'next/cache';

export async function createUserAction(props: IUser) {
	try {
		const resp = await createUser(props);
		revalidateTag('users');
		return resp;
	} catch (error) {
		console.log(error);
	}
}
