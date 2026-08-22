'use client';

import { intentPrefetchRegistry } from '@/lib/intent-prefetch-registry';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef } from 'react';

const INTENT_DELAY_MS = 120;

type RouterPrefetchOptions = NonNullable<
	Parameters<ReturnType<typeof useRouter>['prefetch']>[1]
>;

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
		if (timer) clearTimeout(timer);
		timers.current.delete(href);
	}, []);

	const prefetchNow = useCallback(
		(href: string, enabled = true) => {
			cancel(href);
			if (!enabled) return;

			const reserved = intentPrefetchRegistry.reserve(href);
			if (!reserved) return;
			try {
				router.prefetch(href, {
					kind: 'full' as RouterPrefetchOptions['kind'],
					onInvalidate: () => intentPrefetchRegistry.release(href),
				});
			} catch {
				intentPrefetchRegistry.release(href);
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
				prefetchNow(href, true);
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
