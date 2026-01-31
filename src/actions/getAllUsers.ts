/** @format */

'use server';

import { getAllUsers } from '@/http/user/getUsers';
import { requireAccessToken } from '@/lib/require-auth';

export async function getAllUsersAction() {
	await requireAccessToken();
	const resp = await getAllUsers();
	return resp;
}
