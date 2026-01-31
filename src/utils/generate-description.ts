/** @format */

export function generateDescription(
	description: string,
	total?: number | null,
	formatOptions?: Intl.NumberFormatOptions,
	locale: string = 'pt-BR',
) {
	if (!total) {
		return '';
	}

	return description + total.toLocaleString(locale, formatOptions);
}
