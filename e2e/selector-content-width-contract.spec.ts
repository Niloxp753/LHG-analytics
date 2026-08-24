import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const COMPONENTS_DIR = path.join(
	process.cwd(),
	'src',
	'app',
	'(dashboard)',
	'_components',
);

test('keeps the selected period label intrinsic instead of truncating it', () => {
	const periodSelector = readFileSync(
		path.join(COMPONENTS_DIR, 'PeriodSelector.tsx'),
		'utf8',
	);
	const headerClient = readFileSync(
		path.join(COMPONENTS_DIR, 'HeaderClient.tsx'),
		'utf8',
	);

	expect(periodSelector).toContain("'w-full lg:w-fit'");
	expect(periodSelector).toContain('lg:w-fit lg:min-w-40');
	expect(periodSelector).toContain('whitespace-nowrap');
	expect(periodSelector).not.toContain(
		"<span className='truncate'>{selectedLabel}</span>",
	);
	expect(headerClient).toContain("className='shrink-0 lg:w-fit'");
	expect(headerClient).not.toContain('lg:w-40 xl:w-44');
});
