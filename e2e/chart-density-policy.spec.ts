import { expect, test } from '@playwright/test';
import {
	resolveChartDensity,
	resolveXAxisLabelPolicy,
} from '../src/app/(dashboard)/_components/charts/chart-density';

const series = (...lengths: number[]) =>
	lengths.map((length, index) => ({
		name: `Série ${index + 1}`,
		data: Array.from({ length }, (_, value) => value),
	}));

test('uses detailed mode through both approved boundaries', () => {
	expect(resolveChartDensity(series(31))).toMatchObject({
		mode: 'detailed',
		animationsEnabled: true,
		allowDataLabels: true,
		curve: 'smooth',
		markerSize: 3,
		markerHoverSize: 5,
	});
	expect(
		resolveChartDensity(series(25, 25, 25, 25, 25, 25, 25, 25, 25, 25)),
	).toMatchObject({ mode: 'detailed' });
});

test('uses dense mode above either boundary', () => {
	expect(resolveChartDensity(series(32))).toMatchObject({
		mode: 'dense',
		animationsEnabled: false,
		allowDataLabels: false,
		curve: 'straight',
		markerSize: 0,
		markerHoverSize: 4,
	});
	expect(
		resolveChartDensity(series(25, 25, 25, 25, 25, 25, 25, 25, 25, 26)),
	).toMatchObject({ mode: 'dense' });
});

test('falls back to detailed for missing or malformed metadata', () => {
	expect(resolveChartDensity(undefined).mode).toBe('detailed');
	expect(resolveChartDensity(null).mode).toBe('detailed');
	expect(resolveChartDensity({ data: [1, 2] }).mode).toBe('detailed');
	expect(resolveChartDensity([{ name: 'broken' }]).mode).toBe('detailed');
	expect(resolveChartDensity([{ data: 'not-an-array' }]).mode).toBe('detailed');
});

test('does not mutate or reduce the series', () => {
	const input = series(32, 4);
	const snapshot = structuredClone(input);
	resolveChartDensity(input);
	expect(input).toEqual(snapshot);
	expect(input[0].data).toHaveLength(32);
});

test('keeps every x-axis label when they fit the approved desktop limit', () => {
	const categories = Array.from({ length: 10 }, (_, index) =>
		String(index + 1).padStart(2, '0'),
	);
	const policy = resolveXAxisLabelPolicy(categories, 12);

	expect(policy.rotate).toBe(0);
	expect(policy.tickAmount).toBeUndefined();
});

test('limits crowded x-axis ticks without replacing category labels', () => {
	const categories = Array.from(
		{ length: 21 },
		(_, index) => `${String(index + 1).padStart(2, '0')}/08/2026`,
	);
	const policy = resolveXAxisLabelPolicy(categories, 8);

	expect(policy.tickAmount).toBe(7);
	expect(policy.rotate).toBe(-45);
	expect(categories).toHaveLength(21);
});
