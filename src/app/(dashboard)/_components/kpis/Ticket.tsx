/** @format */
'use client';
import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface TicketAverageByDateProps {
	series: number[];
	categories: string[];
}

interface TicketProps {
	data?: TicketAverageByDateProps | null;
}

export default function Ticket({ data }: TicketProps) {
	const ticketAverageByDate = data;
	const error =
		ticketAverageByDate === null
			? 'Não foi possível carregar os dados.'
			: undefined;

	return (
		<>
			<div className='max-h-[440px] h-full w-full flex items-center justify-center'>
				<AreaChartsApex
					id='ticket-ipiranga'
					money
					error={error}
					series={
						ticketAverageByDate
							? [
									{
										data: ticketAverageByDate.series,
										name: 'Ticket Médio',
									},
							  ]
							: undefined
					}
					categories={ticketAverageByDate?.categories}
				/>
			</div>
		</>
	);
}
