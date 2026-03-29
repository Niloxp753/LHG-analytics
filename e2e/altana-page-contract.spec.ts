import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(__dirname, '..');

function readRelativeFile(relativePath: string) {
	return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

test.describe('Altana page contract', () => {
	test('dashboard landing pages expose Altana links and unit pages exist for all modules', async () => {
		expect(
			readRelativeFile('src/app/(dashboard)/general/page.tsx'),
		).toContain('/general/altana?menu=${menu}&set=${preSet}');
		expect(
			readRelativeFile('src/app/(dashboard)/restaurant/page.tsx'),
		).toContain('/restaurant/altana?menu=${menu}&set=${preSet}');
		expect(
			readRelativeFile('src/app/(dashboard)/reservations/page.tsx'),
		).toContain('/reservations/altana?menu=${menu}&set=${preSet}');
		expect(
			readRelativeFile('src/app/(dashboard)/operational/page.tsx'),
		).toContain('/operational/altana?menu=${menu}&set=${preSet}');

		expect(
			fs.existsSync(
				path.join(
					repoRoot,
					'src/app/(dashboard)/general/(unidades)/altana/page.tsx',
				),
			),
		).toBe(true);
		expect(
			fs.existsSync(
				path.join(
					repoRoot,
					'src/app/(dashboard)/restaurant/(unidades)/altana/page.tsx',
				),
			),
		).toBe(true);
		expect(
			fs.existsSync(
				path.join(
					repoRoot,
					'src/app/(dashboard)/reservations/(unidades)/altana/page.tsx',
				),
			),
		).toBe(true);
		expect(
			fs.existsSync(
				path.join(
					repoRoot,
					'src/app/(dashboard)/operational/(unidades)/altana/page.tsx',
				),
			),
		).toBe(true);
	});
});
