/** @format */

import { z } from 'zod';

export const formSchemaFilter = z.object({
	startDate: z.date({
		description: 'Data inicial',
		required_error: 'Informe uma data inicial',
	}),
	endDate: z.date({
		description: 'Data final',
		required_error: 'Informe uma data final',
	}),
});
