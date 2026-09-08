/** @format */

'use server';

import { updateUser } from '@/http/user/updateUser';
import { ADMIN_ROLE, ADMIN_UNIT } from '@/lib/access-control';
import { normalizeCpf } from '@/lib/cpf';
import type { UpdateUserInput } from '@/types/user';
import { revalidatePath, updateTag } from 'next/cache';
import { authorizeAdminAction, upstreamActionFailure } from './admin-action-boundary';
import { type UserActionResult, userActionSuccess } from './user-action-result';

export async function updateUserAction(
	props: UpdateUserInput,
): Promise<UserActionResult<null>> {
	const authorizationFailure = await authorizeAdminAction();
	if (authorizationFailure) return authorizationFailure;
	if (!props.id) {
		throw new Error('O ID do usuário é obrigatório para a atualização');
	}

	const unit = props.role === ADMIN_ROLE ? ADMIN_UNIT : props.unit;
	const normalizedCpf = normalizeCpf(props.cpf);
	const cpf = normalizedCpf ? normalizedCpf : undefined;

	try {
		await updateUser({ ...props, unit, cpf });
	} catch (error) {
		return upstreamActionFailure(error);
	}

	updateTag('users');
	revalidatePath('/settings');
	return userActionSuccess(null);
}
