/** @format */

import { z } from 'zod';
import { cpf } from 'zod-br-tax-id';

export const formSchemaUser = z.object({
	name: z.string({
		description: 'Nome de usuário',
		coerce: true,
		message: 'Nome obrigatório',
	}),
	email: z.string({ coerce: true }).email({
		message: 'E-mail obrigatório',
	}),
	cpf: cpf({ message: 'CPF inválido' }),
	password: z
		.string({ coerce: true })
		.min(8, { message: 'A senha deve ter no mínimo 8 dígitos' }),
	role: z.enum(['ADMIN', 'MANAGER']),
	unidade: z.string({
		coerce: true,
		description: 'Lush Ipiranga, Lush Guarujá, Andar de Cima ou Tout Campinas',
	}),
});
