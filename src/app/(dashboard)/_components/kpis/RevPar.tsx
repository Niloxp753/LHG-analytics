/** @format */
'use client';

import { Skeleton } from '@/_components/ui/skeleton';
import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface RevparEntry {
	[date: string]: {
		totalRevpar: string;
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

export default function RevPar(data?: any) {
	const revparByDate: RevparEntry[] = data.data;

	const transformedData: TransformedEntry[] = revparByDate
		?.map((item: RevparEntry): TransformedEntry => {
			const [date, data] = Object.entries(item)[0];
			// Removendo "R$" e convertendo para número
			const revpar = parseFloat(
				data.totalRevpar.replace('R$', '').replace('.', '').replace(',', '.'),
			);
			return { date, revpar };
		})
		.sort(
			(a, b) =>
				new Date(a.date.split('/').reverse().join('-')).getTime() -
				new Date(b.date.split('/').reverse().join('-')).getTime(),
		);

	const result: Result = {
		values: transformedData?.map((entry: TransformedEntry) => entry.revpar),
		dates: transformedData?.map((entry: TransformedEntry) => entry.date),
	};

	return (
		<>
			{revparByDate ? (
				<AreaChartsApex
					id='revpar-ipiranga'
					series={[{ data: result?.values, name: 'RevPar' }]}
					categories={result?.dates}
					money
				/>
			) : (
				<Skeleton className='h-[310px] w-full' />
			)}
			;
		</>
	);
}
