/** @format */

'use server';

import { createUser } from '@/http/user/createUser';
import type { CreateUserInput } from '@/types/user';
import { revalidatePath } from 'next/cache';
import { requireAccessToken } from '@/lib/require-auth';
import { normalizeCpf } from '@/lib/cpf';

export async function createUserAction(props: CreateUserInput) {
	await requireAccessToken();
	try {
		const resp = await createUser({ ...props, cpf: normalizeCpf(props.cpf) });
		revalidatePath('/settings');
		return resp;
	} catch (error) {
		console.log(error);
	}
}
