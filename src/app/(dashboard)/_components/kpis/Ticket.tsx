/** @format */
'use client';
import dynamic from 'next/dynamic';
import { type CurrencyConfig } from '@/lib/currency-format';
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
	currencyConfig?: CurrencyConfig;
}

export default function Ticket({ data, currencyConfig }: TicketProps) {
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
					currencyConfig={currencyConfig}
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
