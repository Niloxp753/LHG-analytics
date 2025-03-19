/** @format */

interface TicketAverageEntry {
	[date: string]: {
		totalAllTicketAverage: string;
	};
}

interface TransformedEntry {
	date: string;
	ticketAverage: number;
}

interface Result {
	values: number[];
	dates: string[];
}

interface NormalizeTKTMedioProps {
	data: TicketAverageEntry[];
}

export function NormalizeTKTMedio({ data }: NormalizeTKTMedioProps) {
	const ticketAverageByDate = data;

	const transformedData: TransformedEntry[] = ticketAverageByDate
		?.map((item: TicketAverageEntry): TransformedEntry => {
			const [date, data] = Object.entries(item)[0];
			// Removendo "R$" e convertendo para número
			const ticketAverage = parseFloat(
				data.totalAllTicketAverage
					.replace('R$', '')
					.replace('.', '')
					.replace(',', '.'),
			);
			return { date, ticketAverage };
		})
		.sort(
			(a, b) =>
				new Date(a.date.split('/').reverse().join('-')).getTime() -
				new Date(b.date.split('/').reverse().join('-')).getTime(),
		);

	const result: Result = {
		values: transformedData?.map(
			(entry: TransformedEntry) => entry.ticketAverage,
		),
		dates: transformedData?.map((entry: TransformedEntry) => entry.date),
	};
	return result;
}
