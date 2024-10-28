/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface RentalsEntry {
	[date: string]: {
		totalRentalsApartments: number;
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

export default function Locations(data: any) {
	const rentalsByDate: RentalsEntry[] = data.data;

	const transformedData: TransformedEntry[] = rentalsByDate
		.map((item: RentalsEntry): TransformedEntry => {
			const [date, data] = Object.entries(item)[0];
			const totalRentals = data.totalRentalsApartments;
			return { date, totalRentals };
		})
		.sort(
			(a, b) =>
				new Date(a.date.split('/').reverse().join('-')).getTime() -
				new Date(b.date.split('/').reverse().join('-')).getTime(),
		);

	const result: Result = {
		values: transformedData.map(
			(entry: TransformedEntry) => entry.totalRentals,
		),
		dates: transformedData.map((entry: TransformedEntry) => entry.date),
	};

	return (
		<>
			<AreaChartsApex
				id='locations'
				series={[
					{
						data: result.values,
						name: 'Quantidade de Locações',
					},
				]}
				categories={result.dates}
			/>
		</>
	);
}
