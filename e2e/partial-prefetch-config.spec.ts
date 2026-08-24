import { expect, test } from '@playwright/test';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const projectRoot = path.resolve(__dirname, '..');

test('enables partial prefetching at the top level with Cache Components', async () => {
	const configPath = path.join(projectRoot, 'next.config.mjs');
	const configUrl = pathToFileURL(configPath);
	const { default: nextConfig } = (await import(configUrl.href)) as {
		default: {
			cacheComponents?: boolean;
			partialPrefetching?: boolean | string;
			experimental?: { partialPrefetching?: boolean | string };
		};
	};

	expect(nextConfig.cacheComponents).toBe(true);
	expect(nextConfig.partialPrefetching).toBe(true);
	expect(nextConfig.experimental?.partialPrefetching).toBeUndefined();
});
