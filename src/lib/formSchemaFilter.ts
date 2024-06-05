/** @format */

import { z } from 'zod';

export const formSchemaFilter = z.object({
	startDate: z.date({ description: 'Data inicial' }),
	endDate: z.date({ description: 'Data final' }),
	unity: z.string({ description: 'Unidade Motel' }).array(),
	room: z.string({ description: 'Categoria de Suíte' }).array(),
});
