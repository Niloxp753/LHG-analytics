/** @format */

export type SupportedCurrency = 'BRL' | 'USD';

export interface CurrencyConfig {
	locale: string;
	currency: SupportedCurrency;
	currencyDisplay?: Intl.NumberFormatOptions['currencyDisplay'];
}

export const DEFAULT_BRL_CURRENCY_CONFIG: CurrencyConfig = {
	locale: 'pt-BR',
	currency: 'BRL',
	currencyDisplay: 'symbol',
};

export const LIV_USD_CURRENCY_CONFIG: CurrencyConfig = {
	locale: 'pt-BR',
	currency: 'USD',
	currencyDisplay: 'narrowSymbol',
};

export function resolveCurrencyConfig(
	currencyConfig?: CurrencyConfig,
): CurrencyConfig {
	return {
		...DEFAULT_BRL_CURRENCY_CONFIG,
		...currencyConfig,
	};
}

export function formatCurrency(
	value: number | string,
	currencyConfig?: CurrencyConfig,
	extraIntlOptions: Intl.NumberFormatOptions = {},
) {
	const numericValue = typeof value === 'number' ? value : Number(value);

	if (Number.isNaN(numericValue)) {
		return '';
	}

	const resolved = resolveCurrencyConfig(currencyConfig);

	return numericValue.toLocaleString(resolved.locale, {
		style: 'currency',
		currency: resolved.currency,
		currencyDisplay: resolved.currencyDisplay,
		...extraIntlOptions,
	});
}
