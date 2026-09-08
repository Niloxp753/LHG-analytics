import { expect, test } from '@playwright/test';

test('finds named DeferredChartMount blocks with either quote style', async () => {
	const { deferredBlock } = await import('./helpers/deferred-block');
	const source = `
		<DeferredChartMount name='single-quoted'>single</DeferredChartMount>
		<DeferredChartMount name="double-quoted">double</DeferredChartMount>
	`;

	expect(deferredBlock(source, 'single-quoted')).toContain('single');
	expect(deferredBlock(source, 'double-quoted')).toContain('double');
});

test('rejects a missing DeferredChartMount name instead of returning an empty block', async () => {
	const { deferredBlock } = await import('./helpers/deferred-block');

	expect(() => deferredBlock('<main />', 'missing')).toThrow(
		'DeferredChartMount "missing" was not found',
	);
});
