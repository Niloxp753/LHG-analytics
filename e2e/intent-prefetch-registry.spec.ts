import { expect, test } from '@playwright/test';
import { createIntentPrefetchRegistry } from '../src/lib/intent-prefetch-registry';

test('normalizes, deduplicates, and releases hrefs', () => {
	const registry = createIntentPrefetchRegistry();

	expect(registry.reserve('/general?menu=general&set=este_mes#chart')).toBe(true);
	expect(registry.reserve('/general?menu=general&set=este_mes')).toBe(false);
	expect(registry.has('/general?menu=general&set=este_mes')).toBe(true);

	registry.release('/general?menu=general&set=este_mes');
	expect(registry.reserve('/general?menu=general&set=este_mes')).toBe(true);
});

test('rejects empty, hash-only, and non-http destinations', () => {
	const registry = createIntentPrefetchRegistry();

	expect(registry.reserve('')).toBe(false);
	expect(registry.reserve('#')).toBe(false);
	expect(registry.reserve('#chart')).toBe(false);
	expect(registry.reserve('mailto:test@example.com')).toBe(false);
	expect(registry.reserve('https://example.com/general')).toBe(false);
});
