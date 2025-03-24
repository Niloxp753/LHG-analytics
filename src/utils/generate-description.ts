/** @format */

export function generateDescription(description: string, total: number) {
	if (!total) {
		return '';
	} else {
		return description + total.toLocaleString('pt-BR');
	}
}
