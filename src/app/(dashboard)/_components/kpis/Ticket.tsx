/** @format */
'use client';
import { Skeleton } from '@/components/ui/skeleton';
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

export default function Ticket(data?: any) {
	const ticketAverageByDate: TicketAverageByDateProps = data.data;

	return (
		<>
			{ticketAverageByDate ? (
				<div className='  max-h-[440px] h-full w-full flex items-center justify-center'>
					<AreaChartsApex
						id='ticket-ipiranga'
						money
						series={[
							{
								data: ticketAverageByDate.series,
								name: 'Ticket Médio',
							},
						]}
						categories={ticketAverageByDate.categories}
					/>
				</div>
			) : (
				<Skeleton className='w-full h-[300px]' />
			)}
			;
		</>
	);
}
