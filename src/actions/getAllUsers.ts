/** @format */

'use server';

import { getAllUsers } from '@/http/getUsers';

export async function getAllUsersAction() {
	const resp = getAllUsers();
	return resp;
}
