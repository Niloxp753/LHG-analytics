/** @format */

'use server';

import { getAllUsers } from '@/http/user/getUsers';

export async function getAllUsersAction() {
	const resp = getAllUsers();
	return resp;
}
