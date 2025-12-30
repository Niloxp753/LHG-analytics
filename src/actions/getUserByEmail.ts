/** @format */

'use server';

import { getAllUserByEmail } from '@/http/user/getUserByEmail';
import { requireAccessToken } from '@/lib/require-auth';

export async function getAllUserByEmailAction(email: string) {
	await requireAccessToken();
	const resp = await getAllUserByEmail(email);

	return resp;
}
