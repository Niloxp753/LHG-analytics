/** @format */
'use client';
import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

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

export default function Ticket(data: any) {
	const ticketAverageByDate: TicketAverageEntry[] = data.data;

	const transformedData: TransformedEntry[] = ticketAverageByDate
		.map((item: TicketAverageEntry): TransformedEntry => {
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
		values: transformedData.map(
			(entry: TransformedEntry) => entry.ticketAverage,
		),
		dates: transformedData.map((entry: TransformedEntry) => entry.date),
	};

	return (
		<div className='  max-h-[440px] h-full w-full flex items-center justify-center'>
			<AreaChartsApex
				id='ticket-ipiranga'
				money
				series={[
					{
						data: result.values,
						name: 'Ticket Médio',
					},
				]}
				categories={result.dates}
			/>
		</div>
	);
}
