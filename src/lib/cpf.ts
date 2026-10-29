/** @format */

const CPF_DIGITS_LIMIT = 11;
const NON_DIGITS_PATTERN = /\D+/g;

// Returns CPF digits only, limited to 11 characters.
export function normalizeCpf(value: string | null | undefined): string {
	if (!value) {
		return '';
	}

	return value.replace(NON_DIGITS_PATTERN, '').slice(0, CPF_DIGITS_LIMIT);
}

// Formats CPF for UI display and typing flow: 000.000.000-00.
export function formatCpf(value: string | null | undefined): string {
	const digits = normalizeCpf(value);

	if (!digits) {
		return '';
	}

	if (digits.length <= 3) {
		return digits;
	}

	if (digits.length <= 6) {
		return `${digits.slice(0, 3)}.${digits.slice(3)}`;
	}

	if (digits.length <= 9) {
		return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
	}

	return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
}

// Validates CPF check digits. Accepts formatted or digits-only input.
export function isValidCpf(value: string | null | undefined): boolean {
	const digits = normalizeCpf(value);

	if (digits.length !== CPF_DIGITS_LIMIT || /^(\d)\1+$/.test(digits)) {
		return false;
	}

	const checkDigit = (length: number) => {
		let sum = 0;

		for (let i = 0; i < length; i++) {
			sum += Number(digits[i]) * (length + 1 - i);
		}

		const rest = (sum * 10) % 11;
		return rest === 10 ? 0 : rest;
	};

	return checkDigit(9) === Number(digits[9]) && checkDigit(10) === Number(digits[10]);
}
