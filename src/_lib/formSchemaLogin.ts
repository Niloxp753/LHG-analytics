/** @format */

import { z } from 'zod';

export const formSchemaLogin = z.object({
	email: z.string({ coerce: true }).email({
		message: 'E-mail obrigatório',
	}),
	password: z
		.string({ coerce: true })
		.min(8, { message: 'A senha deve ter no mínimo 8 dígitos' }),
});
