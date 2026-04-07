import { expect, test } from '@playwright/test';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const SOURCE_ROOTS = [
	path.join(process.cwd(), 'src', 'app'),
	path.join(process.cwd(), 'src', 'components'),
	path.join(process.cwd(), 'src', 'lib'),
] as const;

const FILE_EXTENSIONS = new Set(['.ts', '.tsx']);
const MOJIBAKE_PATTERN = /Ãƒ|Ã‚|Ã|Â|�/;

function* walk(dir: string): Generator<string> {
	const entries = readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			yield* walk(fullPath);
			continue;
		}
		if (FILE_EXTENSIONS.has(path.extname(entry.name))) {
			yield fullPath;
		}
	}
}

test('application copy does not contain mojibake sequences', async () => {
	const offenders: string[] = [];

	for (const root of SOURCE_ROOTS) {
		for (const filePath of walk(root)) {
			const source = readFileSync(filePath, 'utf8');
			if (MOJIBAKE_PATTERN.test(source)) {
				offenders.push(path.relative(process.cwd(), filePath));
			}
		}
	}

	expect(offenders).toEqual([]);
});
