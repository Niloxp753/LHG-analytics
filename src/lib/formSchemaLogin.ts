/** @format */

import { z } from 'zod';

export const formSchemaLogin = z.object({
	email: z.coerce.string().pipe(z.email({ error: 'E-mail obrigatório' })),
	password: z
		.coerce.string()
		.min(8, { message: 'A senha deve ter no mínimo 8 dígitos' }),
});
