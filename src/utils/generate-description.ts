/** @format */

export function generateDescription(
	description: string,
	total?: number | null,
	formatOptions?: Intl.NumberFormatOptions,
	locale: string = 'pt-BR',
) {
	if (total === null || typeof total === 'undefined') {
		return '';
	}

	return description + total.toLocaleString(locale, formatOptions);
}
