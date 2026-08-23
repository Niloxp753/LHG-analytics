/** @format */

'use server';

import { deleteUser } from '@/http/user/deleteuser';
import { revalidatePath, updateTag } from 'next/cache';
import { authorizeAdminAction, upstreamActionFailure } from './admin-action-boundary';
import { type UserActionResult, userActionSuccess } from './user-action-result';

export async function deleteUserAction(id: string): Promise<UserActionResult<null>> {
	const authorizationFailure = await authorizeAdminAction();
	if (authorizationFailure) return authorizationFailure;

	try {
		await deleteUser(id);
	} catch (error) {
		return upstreamActionFailure(error);
	}

	updateTag('users');
	revalidatePath('/settings');
	return userActionSuccess(null);
}
