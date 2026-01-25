/** @format */

'use server';

import { updateUser } from '@/http/user/updateUser';
import type { UpdateUserInput } from '@/types/user';
import { revalidatePath, revalidateTag } from 'next/cache';
import { requireAccessToken } from '@/lib/require-auth';
import { ADMIN_ROLE, ADMIN_UNIT } from '@/lib/access-control';

export async function updateUserAction(props: UpdateUserInput) {
	await requireAccessToken();
	try {
		if (!props.id) {
			throw new Error('User id is required for update');
		}

		const unit = props.role === ADMIN_ROLE ? ADMIN_UNIT : props.unit;

		await updateUser({ ...props, unit });
		revalidateTag('users');
		revalidateTag(`users/${props.id}`);
		revalidatePath('/settings');
	} catch (error) {
		console.log(error);
	}
}
