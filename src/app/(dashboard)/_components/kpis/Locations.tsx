/** @format */

import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

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

export default function Locations(data: any) {
	const rentalsByDate: RentalsEntry[] = data.data;

	const transformedData: TransformedEntry[] = rentalsByDate
		.map((item: RentalsEntry): TransformedEntry => {
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
		values: transformedData.map(
			(entry: TransformedEntry) => entry.totalRentals,
		),
		dates: transformedData.map((entry: TransformedEntry) => entry.date),
	};

	return (
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
	);
}
