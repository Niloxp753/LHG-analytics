'use client';

import { isInternalNavigationHref } from '@/lib/navigation-target';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef } from 'react';

const INTENT_DELAY_MS = 120;

export type IntentPrefetchController = {
	cancel(href: string): void;
	prefetchNow(href: string, enabled?: boolean): void;
	schedule(href: string, enabled?: boolean): void;
};

export function useIntentPrefetch(): IntentPrefetchController {
	const router = useRouter();
	const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

	const cancel = useCallback((href: string) => {
		const timer = timers.current.get(href);
		if (timer !== undefined) clearTimeout(timer);
		timers.current.delete(href);
	}, []);

	const prefetchNow = useCallback(
		(href: string, enabled = true) => {
			cancel(href);
			if (!enabled || !isInternalNavigationHref(href)) return;

			try {
				router.prefetch(href);
			} catch {
				// Prefetch is an optimization; an unsupported target must not break input.
			}
		},
		[cancel, router],
	);

	const schedule = useCallback(
		(href: string, enabled = true) => {
			cancel(href);
			if (!enabled) return;
			const timer = setTimeout(() => {
				timers.current.delete(href);
				prefetchNow(href, enabled);
			}, INTENT_DELAY_MS);
			timers.current.set(href, timer);
		},
		[cancel, prefetchNow],
	);

	useEffect(() => {
		const activeTimers = timers.current;
		return () => {
			for (const timer of activeTimers.values()) clearTimeout(timer);
			activeTimers.clear();
		};
	}, []);

	return useMemo(
		() => ({ cancel, prefetchNow, schedule }),
		[cancel, prefetchNow, schedule],
	);
}
