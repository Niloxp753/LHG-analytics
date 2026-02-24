/** @format */
'use client';

import dynamic from 'next/dynamic';
import { type CurrencyConfig } from '@/lib/currency-format';
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
	currencyConfig?: CurrencyConfig;
}

export default function TKTXLocation({ data, currencyConfig }: DataProps) {
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
				currencyConfig={currencyConfig}
			/>
		</div>
	);
}
