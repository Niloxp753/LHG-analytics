/** @format */

'use server';

import { getAllUsers } from '@/http/user/getUsers';
import type { User } from '@/types/user';
import { authorizeAdminAction, upstreamActionFailure } from './admin-action-boundary';
import { type UserActionResult, userActionSuccess } from './user-action-result';

export async function getAllUsersAction(): Promise<UserActionResult<User[]>> {
	const authorizationFailure = await authorizeAdminAction();
	if (authorizationFailure) return authorizationFailure;
	let users: User[];

	try {
		users = await getAllUsers();
	} catch (error) {
		return upstreamActionFailure(error);
	}

	return userActionSuccess(users);
}
