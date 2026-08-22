import { expect, test } from '@playwright/test';
import {
	getDashboardCacheProfile,
	resolveCustomDashboardCacheMode,
	resolvePresetDashboardCacheMode,
} from '../src/lib/dashboard-cache-policy';

const baseDate = new Date('2026-08-21T03:30:00.000Z');

test('classifies normalized and legacy presets', () => {
	expect(resolvePresetDashboardCacheMode('ultimo_mes_fechado')).toBe(
		'historical',
	);
	expect(resolvePresetDashboardCacheMode('ultimos_30_dias')).toBe('historical');
	expect(resolvePresetDashboardCacheMode('ultimos_7_dias')).toBe('live');
	expect(resolvePresetDashboardCacheMode('este_mes')).toBe('live');
	expect(resolvePresetDashboardCacheMode('acumulado_do_ano')).toBe('live');
	expect(resolvePresetDashboardCacheMode(undefined)).toBe('live');
	expect(resolvePresetDashboardCacheMode('unknown')).toBe('live');
});

test('maps modes to the two named profiles', () => {
	expect(getDashboardCacheProfile('live')).toBe('dashboard');
	expect(getDashboardCacheProfile('historical')).toBe('dashboard_historical');
});

test('treats yesterday as live and earlier dates as historical', () => {
	expect(
		resolveCustomDashboardCacheMode('20/08/2026', { baseDate }),
	).toBe('live');
	expect(
		resolveCustomDashboardCacheMode('19/08/2026', { baseDate }),
	).toBe('historical');
	expect(
		resolveCustomDashboardCacheMode('2026-08-19', { baseDate }),
	).toBe('historical');
});

test('uses the São Paulo calendar across UTC rollover', () => {
	const beforeSaoPauloMidnight = new Date('2026-08-21T02:30:00.000Z');
	expect(
		resolveCustomDashboardCacheMode('19/08/2026', {
			baseDate: beforeSaoPauloMidnight,
		}),
	).toBe('live');
	expect(
		resolveCustomDashboardCacheMode('18/08/2026', {
			baseDate: beforeSaoPauloMidnight,
		}),
	).toBe('historical');
});

test('keeps missing and invalid custom dates live', () => {
	expect(resolveCustomDashboardCacheMode(undefined, { baseDate })).toBe('live');
	expect(
		resolveCustomDashboardCacheMode('31/02/2026', { baseDate }),
	).toBe('live');
	expect(resolveCustomDashboardCacheMode('not-a-date', { baseDate })).toBe(
		'live',
	);
});
