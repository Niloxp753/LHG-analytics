/** @format */

'use server';

import { IUserUp, updateUser } from '@/http/user/updateUser';
import { revalidateTag } from 'next/cache';
import { requireAccessToken } from '@/lib/require-auth';

export async function updateUserAction(props: IUserUp) {
	await requireAccessToken();
	if (props.password === '') {
		await updateUser({
			email: props.email,
			id: props.id,
			name: props.name,
			company: props.company,
			role: props.role,
			cpf: props.cpf,
		});
		revalidateTag('users');
	} else {
		try {
			await updateUser(props);
			revalidateTag('users');
		} catch (error) {
			console.log(error);
		}
	}
}
