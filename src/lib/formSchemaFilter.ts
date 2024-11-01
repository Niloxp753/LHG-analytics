/** @format */

import { z } from 'zod';

export const formSchemaFilter = z.object({
	startDate: z.date({ description: 'Data inicial' }),
	endDate: z.date({ description: 'Data final' }),
});
