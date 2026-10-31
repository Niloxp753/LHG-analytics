/** @format */

import { z } from 'zod';

export const formSchemaFilter = z.object({
	startDate: z
		.date({ error: 'Informe uma data inicial' })
		.describe('Data inicial'),
	endDate: z
		.date({ error: 'Informe uma data final' })
		.describe('Data final'),
});
