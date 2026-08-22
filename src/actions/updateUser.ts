/** @format */

'use server';

import { updateUser } from '@/http/user/updateUser';
import { ADMIN_ROLE, ADMIN_UNIT } from '@/lib/access-control';
import { normalizeCpf } from '@/lib/cpf';
import { requireAccessToken } from '@/lib/require-auth';
import type { UpdateUserInput } from '@/types/user';
import { revalidatePath, updateTag } from 'next/cache';

export async function updateUserAction(props: UpdateUserInput) {
	await requireAccessToken();
	try {
		if (!props.id) {
			throw new Error('O ID do usuário é obrigatório para a atualização');
		}

		const unit = props.role === ADMIN_ROLE ? ADMIN_UNIT : props.unit;
		const normalizedCpf = normalizeCpf(props.cpf);
		const cpf = normalizedCpf ? normalizedCpf : undefined;

		await updateUser({ ...props, unit, cpf });
		updateTag('users');
		revalidatePath('/settings');
	} catch (error) {
		console.log(error);
	}
}
