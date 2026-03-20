/** @format */

import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';

const DASHBOARD_CACHE_PROFILES: Record<
	'dashboard' | 'dashboard_fast',
	{ stale: number; revalidate: number; expire: number }
> = {
	dashboard: { stale: 30, revalidate: 30, expire: 300 },
	dashboard_fast: { stale: 10, revalidate: 10, expire: 60 },
};

export function applyPrivateDashboardCache(
	tags: string[],
	profile: 'dashboard' | 'dashboard_fast' = 'dashboard',
): void {
	cacheLife(DASHBOARD_CACHE_PROFILES[profile]);
	for (const tag of tags) {
		cacheTag(tag);
	}
}
