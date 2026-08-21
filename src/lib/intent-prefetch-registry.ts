export type IntentPrefetchRegistry = {
	has(href: string): boolean;
	release(href: string): void;
	reserve(href: string): boolean;
};

export function normalizeIntentPrefetchHref(href: string): string | null {
	if (!href || href.startsWith('#')) return null;

	try {
		const url = new URL(href, 'http://intent-prefetch.local');
		if (url.origin !== 'http://intent-prefetch.local') return null;
		return `${url.pathname}${url.search}`;
	} catch {
		return null;
	}
}

export function createIntentPrefetchRegistry(): IntentPrefetchRegistry {
	const entries = new Set<string>();

	return {
		has(href) {
			const key = normalizeIntentPrefetchHref(href);
			return key ? entries.has(key) : false;
		},
		release(href) {
			const key = normalizeIntentPrefetchHref(href);
			if (key) entries.delete(key);
		},
		reserve(href) {
			const key = normalizeIntentPrefetchHref(href);
			if (!key || entries.has(key)) return false;
			entries.add(key);
			return true;
		},
	};
}

export const intentPrefetchRegistry = createIntentPrefetchRegistry();
