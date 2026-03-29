const INTERNAL_ORIGIN = 'http://lhg.local';

function normalizePathname(pathname: string) {
	if (!pathname || pathname === '/') {
		return '/';
	}

	return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

function buildSortedSearch(entries: Iterable<[string, string]>) {
	const params = new URLSearchParams();
	const sortedEntries = [...entries].sort(([leftKey, leftValue], [rightKey, rightValue]) => {
		if (leftKey === rightKey) {
			return leftValue.localeCompare(rightValue);
		}
		return leftKey.localeCompare(rightKey);
	});

	for (const [key, value] of sortedEntries) {
		params.append(key, value);
	}

	const query = params.toString();
	return query ? `?${query}` : '';
}

export function buildNavigationTarget(
	pathname: string,
	searchEntries: Iterable<[string, string]>,
) {
	return `${normalizePathname(pathname)}${buildSortedSearch(searchEntries)}`;
}

export function resolveNavigationTarget(pathname: string, href: string) {
	const baseUrl = new URL(normalizePathname(pathname), INTERNAL_ORIGIN);
	const url = new URL(href, baseUrl);

	return `${normalizePathname(url.pathname)}${buildSortedSearch(url.searchParams.entries())}`;
}

export function shouldNavigateToHref(
	pathname: string,
	searchEntries: Iterable<[string, string]>,
	href: string,
) {
	return (
		buildNavigationTarget(pathname, searchEntries) !==
		resolveNavigationTarget(pathname, href)
	);
}
