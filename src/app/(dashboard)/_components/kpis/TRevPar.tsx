/** @format */

'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

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

export default function TRevPar(data: any) {
	const trevparByDate: TrevparEntry[] = data.data;

	const transformedData: TransformedEntry[] = trevparByDate
		.map((item: TrevparEntry): TransformedEntry => {
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
		values: transformedData.map(
			(entry: TransformedEntry) => entry.totalTrevpar,
		),
		dates: transformedData.map((entry: TransformedEntry) => entry.date),
	};

	return (
		<div className='  max-h-[440px] h-full w-full flex items-center justify-center'>
			<AreaChartsApex
				id='trevpar-ipiranga'
				series={[
					{
						data: result.values,
						name: 'TRevPar',
					},
				]}
				categories={result.dates}
				money
			/>
		</div>
	);
}
