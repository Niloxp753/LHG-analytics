/** @format */

import { z } from 'zod';
import { cpf } from 'zod-br-tax-id';
import { ROLE_VALUES, UNIT_VALUES_WITH_ADMIN } from '@/lib/access-control';
import { normalizeCpf } from '@/lib/cpf';

export const formSchemaUserUpdate = z.object({
	name: z
		.string({
			description: 'Nome de usuário',
			message: 'Nome obrigatório',
		})
		.optional(),
	email: z
		.string()
		.email({
			message: 'E-mail obrigatório',
		})
		.optional(),
	cpf: z.preprocess(
		(value) => {
			const normalized = normalizeCpf(
				typeof value === 'string' ? value : value == null ? '' : String(value),
			);

			return normalized ? normalized : undefined;
		},
		cpf({ message: 'CPF inválido' }).optional(),
	),
	password: z.preprocess(
		(value) => (value === '' ? undefined : value),
		z
			.string()
			.min(8, { message: 'A senha deve ter no mínimo 8 dígitos' })
			.optional(),
	),
	role: z.enum(ROLE_VALUES).optional(),
	unidade: z
		.string({
			description: 'LUSH_IPIRANGA, LUSH_LAPA, ANDAR_DE_CIMA, TOUT ou LHG',
			message: 'informe a unidade do usuário',
		})
		.optional()
		.refine(
			(value) =>
				value == null ||
				(UNIT_VALUES_WITH_ADMIN as readonly string[]).includes(value),
			{
				message: 'informe a unidade do usuário',
			},
		),
});
