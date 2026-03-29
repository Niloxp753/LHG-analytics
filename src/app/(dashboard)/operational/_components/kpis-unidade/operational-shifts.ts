/** @format */

const KNOWN_SHIFT_ORDER = ['manha', 'tarde', 'noite', 'terceirizado'] as const;

type KnownShiftKey = (typeof KNOWN_SHIFT_ORDER)[number];

function normalizeText(value: string): string {
	return value
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.trim()
		.toLowerCase();
}

export function normalizeOperationalShiftKey(
	value: unknown,
): KnownShiftKey | string | null {
	if (typeof value !== 'string') {
		return null;
	}

	const normalized = normalizeText(value);

	if (normalized === 'manha' || normalized === 'morning') {
		return 'manha';
	}

	if (normalized === 'tarde' || normalized === 'afternoon') {
		return 'tarde';
	}

	if (normalized === 'noite' || normalized === 'night') {
		return 'noite';
	}

	if (
		normalized === 'terceirizado' ||
		normalized === 'terceirizada' ||
		normalized === 'outsourced' ||
		normalized === 'thirdparty' ||
		normalized === 'third-party'
	) {
		return 'terceirizado';
	}

	return normalized;
}

function getShiftSortIndex(value: string): number {
	const normalized = normalizeOperationalShiftKey(value);
	if (!normalized) {
		return Number.MAX_SAFE_INTEGER;
	}

	const knownIndex = KNOWN_SHIFT_ORDER.indexOf(normalized as KnownShiftKey);
	return knownIndex === -1 ? Number.MAX_SAFE_INTEGER : knownIndex;
}

export function orderOperationalShiftKeys(keys: Iterable<string>): string[] {
	const uniqueKeys = Array.from(
		new Map(
			Array.from(keys)
				.filter((key): key is string => typeof key === 'string' && key.length > 0)
				.map((key) => [normalizeText(key), key]),
		).values(),
	);

	return uniqueKeys.sort((left, right) => {
		const leftIndex = getShiftSortIndex(left);
		const rightIndex = getShiftSortIndex(right);

		if (leftIndex !== rightIndex) {
			return leftIndex - rightIndex;
		}

		return left.localeCompare(right, 'pt-BR');
	});
}

function isTotalsKey(key: string): boolean {
	return normalizeText(key) === 'totals';
}

export function buildWeeklyCleaningRows(
	dataTable: Record<string, unknown> | null | undefined,
): Array<{ key: string; label: string; data: unknown }> {
	if (!dataTable || typeof dataTable !== 'object') {
		return [];
	}

	const shiftKeys = orderOperationalShiftKeys(
		Object.keys(dataTable).filter((key) => !isTotalsKey(key)),
	);

	return shiftKeys.map((key) => ({
		key,
		label: key,
		data: dataTable[key],
	}));
}
