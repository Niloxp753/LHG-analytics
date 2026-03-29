import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(__dirname, '..');

function readRelativeFile(relativePath: string) {
	return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

test.describe('Altana HTTP contract', () => {
	test('routes core unit fetches through a dedicated Altana backend client', async () => {
		expect(readRelativeFile('src/http/api-client.ts')).toContain(
			'BACKEND_ENDPOINT_ALTANA',
		);
		expect(readRelativeFile('src/http/api-client.ts')).toContain(
			'export const api_altana = ky.create({',
		);

		expect(readRelativeFile('src/http/company/getCompanyCustom.ts')).toContain(
			'altana',
		);
		expect(readRelativeFile('src/http/company/getCompanyCustom.ts')).toContain(
			'api_altana',
		);

		expect(
			readRelativeFile('src/http/restaurant/get-restaurant-custom.ts'),
		).toContain('altana');
		expect(
			readRelativeFile('src/http/restaurant/get-restaurant-custom.ts'),
		).toContain('api_altana');

		expect(
			readRelativeFile('src/http/reservations/get-bookings-custom.ts'),
		).toContain('altana');
		expect(
			readRelativeFile('src/http/reservations/get-bookings-custom.ts'),
		).toContain('api_altana');

		expect(
			readRelativeFile('src/http/operation/get-governance-custom.ts'),
		).toContain('altana');
		expect(
			readRelativeFile('src/http/operation/get-governance-custom.ts'),
		).toContain('api_altana');
	});
});
