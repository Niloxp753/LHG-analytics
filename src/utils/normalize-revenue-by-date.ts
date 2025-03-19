/** @format */

interface RevenueEntry {
	[date: string]: {
		totalValue: string;
	};
}

interface TransformedEntry {
	date: string;
	totalValue: number;
}

interface NormalizeRevenueByDateProps {
	data: RevenueEntry[];
}

export function NormalizeRevenueByDate({ data }: NormalizeRevenueByDateProps) {
	const revenueByDate = data;

	const transformedData: TransformedEntry[] = revenueByDate
		.map((item: RevenueEntry): TransformedEntry => {
			const [date, data] = Object.entries(item)[0];
			// Removendo "R$" e convertendo para número
			const totalValue = parseFloat(
				data.totalValue.replace('R$', '').replace(/\./g, '').replace(',', '.'),
			);
			return { date, totalValue };
		})
		.sort(
			(a, b) =>
				new Date(a.date.split('/').reverse().join('-')).getTime() -
				new Date(b.date.split('/').reverse().join('-')).getTime(),
		);

	// Estrutura de resultado final
	interface Result {
		values: number[];
		dates: string[];
	}

	const result: Result = {
		values: transformedData.map((entry: TransformedEntry) => entry.totalValue),
		dates: transformedData.map((entry: TransformedEntry) => entry.date),
	};

	return result;
}
