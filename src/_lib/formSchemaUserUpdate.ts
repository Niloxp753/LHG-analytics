/** @format */

import { z } from 'zod';
import { cpf } from 'zod-br-tax-id';

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
	cpf: cpf({ message: 'CPF inválido' }).optional(),
	password: z.string().optional(),
	role: z.enum(['ADMIN', 'MANAGER']).optional(),
	unidade: z
		.string({
			description:
				'Lush Ipiranga, Lush Lapa, Andar de Cima ou Tout Campinas',
			message: 'informe a unidade do usuário',
		})
		.optional(),
});
