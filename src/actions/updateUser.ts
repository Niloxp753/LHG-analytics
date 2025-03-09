/** @format */

'use server';

import { IUserUp, updateUser } from '@/http/user/updateUser';
import { getServerSession } from 'next-auth';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateUserAction(props: IUserUp) {
	const session = await getServerSession();
	if (!session) {
		redirect('/login');
	}
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
