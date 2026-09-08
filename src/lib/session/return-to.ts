const LOCAL_ORIGIN = 'http://lhg.internal';
const ALLOWED_ROOTS = [
	'/general',
	'/operational',
	'/reservations',
	'/restaurant',
	'/settings',
];

export function sanitizeSessionReturnTo(value: string | null): string {
	if (!value || value.includes('\\') || /%5c/i.test(value)) {
		return '/';
	}

	try {
		const parsed = new URL(value, LOCAL_ORIGIN);
		if (parsed.origin !== LOCAL_ORIGIN || !value.startsWith('/')) {
			return '/';
		}
		if (
			!ALLOWED_ROOTS.some(
				(root) => parsed.pathname === root || parsed.pathname.startsWith(`${root}/`),
			)
		) {
			return '/';
		}

		return `${parsed.pathname}${parsed.search}`;
	} catch {
		return '/';
	}
}
