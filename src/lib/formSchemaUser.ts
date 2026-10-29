/** @format */

import { z } from 'zod';
import { ROLE_VALUES, UNIT_VALUES_WITH_ADMIN } from '@/lib/access-control';
import { isValidCpf, normalizeCpf } from '@/lib/cpf';

export const formSchemaUser = z.object({
	name: z.coerce
		.string({ error: 'Nome obrigatório' })
		.describe('Nome de usuário'),
	email: z.coerce.string().pipe(z.email({ error: 'E-mail obrigatório' })),
	cpf: z.preprocess(
		(value) =>
			normalizeCpf(
				typeof value === 'string' ? value : value == null ? '' : String(value),
			),
		z.string().refine(isValidCpf, { message: 'CPF inválido' }),
	),
	password: z
		.coerce.string()
		.min(8, { message: 'A senha deve ter no mínimo 8 dígitos' }),
	role: z.enum(ROLE_VALUES),
	unidade: z
		.coerce.string({ error: 'informe a unidade do usuário' })
		.describe('LUSH_IPIRANGA, LUSH_LAPA, ANDAR_DE_CIMA, TOUT ou LHG')
		.refine(
			(value) => (UNIT_VALUES_WITH_ADMIN as readonly string[]).includes(value),
			{
				message: 'informe a unidade do usuário',
			},
		),
});
