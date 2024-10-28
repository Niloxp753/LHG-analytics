/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface RevparEntry {
	[date: string]: {
		revpar: string;
	};
}

interface TransformedEntry {
	date: string;
	revpar: number;
}

interface Result {
	values: number[];
	dates: string[];
}

export default async function RevPar(data: any) {
	const revparByDate: RevparEntry[] = await data.data;

	const transformedData: TransformedEntry[] = revparByDate
		.map((item: RevparEntry): TransformedEntry => {
			const [date, data] = Object.entries(item)[0];
			// Removendo "R$" e convertendo para número
			const revpar = parseFloat(
				data.revpar.replace('R$', '').replace('.', '').replace(',', '.'),
			);
			return { date, revpar };
		})
		.sort(
			(a, b) =>
				new Date(a.date.split('/').reverse().join('-')).getTime() -
				new Date(b.date.split('/').reverse().join('-')).getTime(),
		);

	const result: Result = {
		values: transformedData.map((entry: TransformedEntry) => entry.revpar),
		dates: transformedData.map((entry: TransformedEntry) => entry.date),
	};

	return (
		<>
			<AreaChartsApex
				id='revpar'
				series={[{ data: result.values, name: 'RevPar' }]}
				categories={result.dates}
				money
			/>
		</>
	);
}
