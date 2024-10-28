/** @format */
'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface OccupancyRateEntry {
	[date: string]: {
		occupancyRate: string;
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

export default function Occupation(data: any) {
	const occupancyRateByDate: OccupancyRateEntry[] = data.data;

	const transformedData: TransformedOccupancyEntry[] = occupancyRateByDate
		.map((item: OccupancyRateEntry): TransformedOccupancyEntry => {
			const [date, data] = Object.entries(item)[0];
			// Removendo "%" e convertendo para número
			const occupancyRate = parseFloat(
				data.occupancyRate.replace('%', '').replace(',', '.'),
			);
			return { date, occupancyRate };
		})
		.sort(
			(a, b) =>
				new Date(a.date.split('/').reverse().join('-')).getTime() -
				new Date(b.date.split('/').reverse().join('-')).getTime(),
		);

	const result: Result = {
		values: transformedData.map(
			(entry: TransformedOccupancyEntry) => entry.occupancyRate,
		),
		dates: transformedData.map(
			(entry: TransformedOccupancyEntry) => entry.date,
		),
	};

	return (
		<>
			<AreaChartsApex
				id='tx-ocuppation-ipiranga'
				percent
				series={[
					{
						data: result.values,
						name: 'Taxa de ocupação',
					},
				]}
				categories={result.dates}
			/>
		</>
	);
}
