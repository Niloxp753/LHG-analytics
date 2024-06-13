/** @format */

import { z } from 'zod';

export const formSchemaFilter = z.object({
	startDate: z.date({ description: 'Data inicial' }),
	endDate: z.date({ description: 'Data final' }),
	location: z.array(z.string({ description: 'Tipo de Locação' })),
	category: z.array(z.string({ description: 'Categoria da Suíte' })),
});
