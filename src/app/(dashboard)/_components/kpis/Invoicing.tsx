/** @format */
'use client';

import { Skeleton } from '@/_components/ui/skeleton';
import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface RevenueEntry {
	[date: string]: {
		totalValue: string;
	};
}

interface TransformedEntry {
	date: string;
	totalValue: number;
}

export default function Invoicing(data?: any) {
	const revenueByDate: RevenueEntry[] = data.data;

	if (!revenueByDate) {
		return <Skeleton className='w-full h-[280]' />;
	}
	const transformedData: TransformedEntry[] = revenueByDate
		.map((item: RevenueEntry): TransformedEntry => {
			const [date, data] = Object.entries(item)[0];
			// Removendo "R$" e convertendo para número
			const totalValue = parseFloat(
				data.totalValue.replace('R$', '').replace(/\./g, '').replace(',', '.'),
			);
			return { date, totalValue };
		})
		.sort(
			(a, b) =>
				new Date(a.date.split('/').reverse().join('-')).getTime() -
				new Date(b.date.split('/').reverse().join('-')).getTime(),
		);

	// Estrutura de resultado final
	interface Result {
		values: number[];
		dates: string[];
	}

	const result: Result = {
		values: transformedData.map((entry: TransformedEntry) => entry.totalValue),
		dates: transformedData.map((entry: TransformedEntry) => entry.date),
	};

	// Exibe o resultado

	return revenueByDate ? (
		<AreaChartsApex
			id='invoicing-ipiranga'
			money
			series={[{ data: result.values, name: 'Faturamento Total' }]}
			categories={result.dates}
		/>
	) : (
		<Skeleton className='w-full h-[300px]' />
	);
}
