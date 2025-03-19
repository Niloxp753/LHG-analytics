/** @format */

interface LocationsxUnityProps {
	data: RentalsEntry[];
}

interface RentalsEntry {
	[date: string]: {
		totalAllRentalsApartments: number;
	};
}

interface TransformedEntry {
	date: string;
	totalRentals: number;
}

interface Result {
	values: number[];
	dates: string[];
}

export function NormalizeRentalsByDate({ data }: LocationsxUnityProps) {
	const rentalsByDate: RentalsEntry[] = data;

	const transformedData: TransformedEntry[] =
		rentalsByDate &&
		rentalsByDate
			?.map((item: RentalsEntry): TransformedEntry => {
				const [date, data] = Object.entries(item)[0];
				const totalRentals = data.totalAllRentalsApartments;
				return { date, totalRentals };
			})
			.sort(
				(a, b) =>
					new Date(a.date.split('/').reverse().join('-')).getTime() -
					new Date(b.date.split('/').reverse().join('-')).getTime(),
			);

	const result: Result = {
		values: transformedData?.map(
			(entry: TransformedEntry) => entry.totalRentals,
		),
		dates: transformedData?.map((entry: TransformedEntry) => entry.date),
	};

	return result;
}
