/** @format */

interface OccupancyRateEntry {
	[date: string]: {
		totalOccupancyRate: string;
	};
}

interface TransformedOccupancyEntry {
	date: string;
	occupancyRate: number;
}

interface Result {
	values: number[];
	dates: string[];
}

interface NormalizeOccupancyRateProps {
	data: OccupancyRateEntry[];
}

export function NormalizeOccupancyRate({ data }: NormalizeOccupancyRateProps) {
	const occupancyRateByDate = data;

	const transformedData: TransformedOccupancyEntry[] = occupancyRateByDate
		?.map((item: OccupancyRateEntry): TransformedOccupancyEntry => {
			const [date, data] = Object.entries(item)[0];
			// Removendo "%" e convertendo para número
			const occupancyRate = parseFloat(
				data.totalOccupancyRate.replace('%', '').replace(',', '.'),
			);
			return { date, occupancyRate };
		})
		.sort(
			(a, b) =>
				new Date(a.date.split('/').reverse().join('-')).getTime() -
				new Date(b.date.split('/').reverse().join('-')).getTime(),
		);

	const result: Result = {
		values: transformedData?.map(
			(entry: TransformedOccupancyEntry) => entry.occupancyRate,
		),
		dates: transformedData?.map(
			(entry: TransformedOccupancyEntry) => entry.date,
		),
	};

	return result;
}
