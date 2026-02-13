/** @format */

import { z } from 'zod';
import { cpf } from 'zod-br-tax-id';
import { ROLE_VALUES, UNIT_VALUES_WITH_ADMIN } from '@/lib/access-control';
import { normalizeCpf } from '@/lib/cpf';

export const formSchemaUser = z.object({
	name: z.string({
		description: 'Nome de usuário',
		coerce: true,
		message: 'Nome obrigatório',
	}),
	email: z.string({ coerce: true }).email({
		message: 'E-mail obrigatório',
	}),
	cpf: z.preprocess(
		(value) =>
			normalizeCpf(
				typeof value === 'string' ? value : value == null ? '' : String(value),
			),
		cpf({ message: 'CPF inválido' }),
	),
	password: z
		.string({ coerce: true })
		.min(8, { message: 'A senha deve ter no mínimo 8 dígitos' }),
	role: z.enum(ROLE_VALUES),
	unidade: z
		.string({
			coerce: true,
			description: 'LUSH_IPIRANGA, LUSH_LAPA, ANDAR_DE_CIMA, TOUT ou LHG',
			message: 'informe a unidade do usuário',
		})
		.refine(
			(value) => (UNIT_VALUES_WITH_ADMIN as readonly string[]).includes(value),
			{
				message: 'informe a unidade do usuário',
			},
		),
});
