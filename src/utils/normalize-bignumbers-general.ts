/** @format */

function parseCurrency(value: string): number {
	return parseFloat(
		value.replace('R$', '').replace(/\./g, '').replace(',', '.').trim(),
	);
}

interface NormalizeBugNumbersProps {
	values: string[];
	operation: string;
}

export function NormalizeCurrencyNumbers({
	values,
	operation,
}: NormalizeBugNumbersProps) {
	const valores = values;

	if (operation == 'soma') {
		const soma = valores.reduce((acc, valor) => acc + parseCurrency(valor), 0);
		return soma.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
	}

	if (operation == 'media') {
		const soma = valores.reduce((acc, valor) => acc + parseCurrency(valor), 0);
		const media = soma / valores.length;
		return media.toLocaleString('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		});
	}
}

export function NormalizeTimeNumbers({
	values,
	operation,
}: NormalizeBugNumbersProps) {
	const valores = values;

	function timeToSeconds(time: string): number {
		const [hours, minutes, seconds] = time.split(':').map(Number);
		return hours * 3600 + minutes * 60 + seconds;
	}

	function secondsToTime(seconds: number): string {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = Math.floor(seconds % 60);

		return [hours, minutes, secs]
			.map((num) => String(num).padStart(2, '0'))
			.join(':');
	}

	if (operation == 'soma') {
		const soma = valores.reduce((acc, valor) => acc + parseCurrency(valor), 0);
		return soma.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
	}

	if (operation == 'media') {
		const totalSegundos = values.reduce(
			(acc, tempo) => acc + timeToSeconds(tempo),
			0,
		);
		const mediaSegundos = totalSegundos / values.length;

		return secondsToTime(mediaSegundos);
	}
}

export function NormalizeBigNumbersGeneral(values: string[]) {
	const numbers = values.map((value) => parseCurrency(value));
	return numbers;
}
