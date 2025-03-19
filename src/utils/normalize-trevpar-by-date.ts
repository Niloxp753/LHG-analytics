/** @format */

interface TrevparEntry {
	[date: string]: {
		totalTrevpar: string;
	};
}

interface TransformedEntry {
	date: string;
	totalTrevpar: number;
}

interface Result {
	values: number[];
	dates: string[];
}

interface NormalizeTKTMedioProps {
	data: TrevparEntry[];
}

export function NormalizeTrevpar({ data }: NormalizeTKTMedioProps) {
	const trevparByDate: TrevparEntry[] = data;

	const transformedData: TransformedEntry[] = trevparByDate
		?.map((item: TrevparEntry): TransformedEntry => {
			const [date, data] = Object.entries(item)[0];
			// Removendo "R$" e convertendo para número
			const totalTrevpar = parseFloat(
				data.totalTrevpar.replace('R$', '').replace('.', '').replace(',', '.'),
			);
			return { date, totalTrevpar };
		})
		.sort(
			(a, b) =>
				new Date(a.date.split('/').reverse().join('-')).getTime() -
				new Date(b.date.split('/').reverse().join('-')).getTime(),
		);

	const result: Result = {
		values: transformedData?.map(
			(entry: TransformedEntry) => entry.totalTrevpar,
		),
		dates: transformedData?.map((entry: TransformedEntry) => entry.date),
	};
	return result;
}
