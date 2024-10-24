/** @format */

'use server';

import { getAllUsers } from '@/http/user/getUsers';

export async function getAllUsersAction() {
	const resp = await getAllUsers();
	return resp;
}
