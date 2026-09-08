/** @format */

'use server';

import { createUser } from '@/http/user/createUser';
import type { CreateUserInput } from '@/types/user';
import { revalidatePath, updateTag } from 'next/cache';
import { normalizeCpf } from '@/lib/cpf';
import { authorizeAdminAction, upstreamActionFailure } from './admin-action-boundary';
import { type UserActionResult, userActionSuccess } from './user-action-result';

export async function createUserAction(
	props: CreateUserInput,
): Promise<UserActionResult<null>> {
	const authorizationFailure = await authorizeAdminAction();
	if (authorizationFailure) return authorizationFailure;
	const input = { ...props, cpf: normalizeCpf(props.cpf) };

	try {
		await createUser(input);
	} catch (error) {
		return upstreamActionFailure(error);
	}

	updateTag('users');
	revalidatePath('/settings');
	return userActionSuccess(null);
}
