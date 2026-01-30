/** @format */
'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface TKTXLocationProps {
	categories: string[];
	series: number[];
}

interface DataProps {
	data: TKTXLocationProps;
}

export default function TKTXLocation({ data }: DataProps) {
	return (
		<div className='w-full'>
			<AreaChartsApex
				series={[
					{
						name: 'Ticket Médio A&B',
						data: data.series,
					},
				]}
				categories={data.categories}
				money
			/>
		</div>
	);
}
