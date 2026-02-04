/** @format */

import 'server-only';
import { unstable_cache } from 'next/cache';

export type ConditionalCacheConfig = {
	keyParts: Array<string | number | boolean | null | undefined>;
	tags: string[];
	revalidate: number;
};

export class FetchFailedError extends Error {
	status?: number;
	statusText?: string;

	constructor(message: string, status?: number, statusText?: string) {
		super(message);
		this.name = 'FetchFailedError';
		this.status = status;
		this.statusText = statusText;
	}
}

export async function withConditionalCache<T>(
	config: ConditionalCacheConfig,
	fetcher: () => Promise<T>,
): Promise<T> {
	if (process.env.DISABLE_CACHE === 'true') {
		return fetcher();
	}
	if (config.revalidate === 0) {
		return fetcher();
	}

	const keyParts = config.keyParts.map((part) =>
		part === null || part === undefined ? '' : String(part),
	);
	const cachedFetcher = unstable_cache(fetcher, keyParts, {
		tags: config.tags,
		revalidate: config.revalidate,
	});

	return cachedFetcher();
}
