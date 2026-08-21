'use client';

import { useSyncExternalStore } from 'react';

export type DashboardViewport = 'pending' | 'mobile' | 'desktop';

const QUERY = '(min-width: 1024px)';

function getMediaQueryList() {
	return typeof window === 'undefined' || typeof window.matchMedia !== 'function'
		? null
		: window.matchMedia(QUERY);
}

function subscribe(onChange: () => void) {
	const query = getMediaQueryList();
	if (!query) return () => undefined;
	query.addEventListener('change', onChange);
	return () => query.removeEventListener('change', onChange);
}

function getSnapshot(): DashboardViewport {
	const query = getMediaQueryList();
	if (!query) return 'pending';
	return query.matches ? 'desktop' : 'mobile';
}

export function useDashboardViewport(): DashboardViewport {
	return useSyncExternalStore(subscribe, getSnapshot, () => 'pending');
}
