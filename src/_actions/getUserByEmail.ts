/** @format */

'use server';

import { getAllUserByEmail } from '@/_http/user/getUserByEmail';

export async function getAllUserByEmailAction(email: string) {
	const resp = await getAllUserByEmail(email);

	return resp;
}
