/** @format */

'use server';

import { IUserUp, updateUser } from '@/_http/user/updateUser';
import { revalidateTag } from 'next/cache';

export async function updateUserAction(props: IUserUp) {
	if (props.password === '') {
		await updateUser({
			email: props.email,
			id: props.id,
			name: props.name,
			companyId: props.companyId,
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
