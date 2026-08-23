export function normalizeAuthApiBaseUrl(
	rawBaseUrl: string | null | undefined,
): string | null {
	const value = rawBaseUrl?.trim();
	if (!value) {
		return null;
	}

	try {
		const url = new URL(value);
		if (url.protocol !== 'http:' && url.protocol !== 'https:') {
			return null;
		}

		const pathname = url.pathname.replace(/\/+$/, '');
		url.pathname = pathname.endsWith('/api') ? pathname : `${pathname}/api`;
		url.search = '';
		url.hash = '';
		return url.toString().replace(/\/$/, '');
	} catch {
		return null;
	}
}

export function resolveAuthApiBaseUrl(): string | null {
	return normalizeAuthApiBaseUrl(
		process.env.BACKEND_AUTH_ENDPOINT?.trim() ||
			process.env.NEXT_PUBLIC_AUTH_URL?.trim(),
	);
}

export function resolveAuthApiUrl(endpoint: 'logout' | 'me' | 'refresh') {
	const baseUrl = resolveAuthApiBaseUrl();
	return baseUrl ? `${baseUrl}/${endpoint}` : null;
}
