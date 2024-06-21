/** @format */

import { faker } from '@faker-js/faker';

function createFakeData(size: number) {
	return Array.from({ length: size }, () => ({
		revenue: faker.finance.amount({ symbol: 'R$' }),
		locations: faker.number.int(35),
		tmo: {
			hour: faker.date.past().getHours(),
			minute: faker.date.past().getMinutes(),
			second: faker.date.past().getSeconds(),
		},
	}));
}

export const TotalData = createFakeData(200);
