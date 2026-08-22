import { expect, test } from '@playwright/test';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const PROJECT_ROOT = process.cwd();
const IGNORED_DIRECTORIES = new Set([
	'.git',
	'.next',
	'.turbo',
	'.vercel',
	'coverage',
	'node_modules',
	'playwright-report',
	'test-results',
]);
const FILE_EXTENSIONS = new Set([
	'.cjs',
	'.css',
	'.html',
	'.js',
	'.json',
	'.jsx',
	'.md',
	'.mjs',
	'.ts',
	'.tsx',
	'.txt',
	'.yaml',
	'.yml',
]);

const MOJIBAKE_MARKERS = [
	[0x00c3, 0x0192],
	[0x00c3, 0x201a],
	[0x00c3, 0x00a0],
	[0x00c3, 0x00a1],
	[0x00c3, 0x00a2],
	[0x00c3, 0x00a3],
	[0x00c3, 0x00a7],
	[0x00c3, 0x00a9],
	[0x00c3, 0x00aa],
	[0x00c3, 0x00ad],
	[0x00c3, 0x00b3],
	[0x00c3, 0x00b4],
	[0x00c3, 0x00b5],
	[0x00c3, 0x00ba],
	[0x00c2, 0x00a0],
	[0xfffd],
].map((codePoints) => String.fromCodePoint(...codePoints));
const PORTUGUESE_UNICODE_ESCAPE = new RegExp(
	`${String.fromCodePoint(0x005c)}u00(?:c[0-9a-f]|d[0-9a-f]|e[0-9a-f]|f[0-9a-f])`,
	'i',
);
const UTF8_DECODER = new TextDecoder('utf-8', { fatal: true });

function* walk(dir: string): Generator<string> {
	const entries = readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			if (IGNORED_DIRECTORIES.has(entry.name)) {
				continue;
			}
			yield* walk(fullPath);
			continue;
		}
		if (FILE_EXTENSIONS.has(path.extname(entry.name))) {
			yield fullPath;
		}
	}
}

test('os arquivos de texto usam UTF-8 válido', async () => {
	const offenders: string[] = [];

	for (const filePath of walk(PROJECT_ROOT)) {
		try {
			UTF8_DECODER.decode(readFileSync(filePath));
		} catch {
			offenders.push(path.relative(PROJECT_ROOT, filePath));
		}
	}

	expect(offenders).toEqual([]);
});

test('os textos em português usam acentos literais sem mojibake', async () => {
	const offenders: string[] = [];

	for (const filePath of walk(PROJECT_ROOT)) {
		const source = readFileSync(filePath, 'utf8');
		const issues = [
			MOJIBAKE_MARKERS.some((marker) => source.includes(marker)) && 'mojibake',
			PORTUGUESE_UNICODE_ESCAPE.test(source) && 'escape Unicode imprimível',
		].filter(Boolean);

		if (issues.length > 0) {
			offenders.push(
			`${path.relative(PROJECT_ROOT, filePath)}: ${issues.join(', ')}`,
			);
		}
	}

	expect(offenders).toEqual([]);
});
