/** @format */
'use client';

import dynamic from 'next/dynamic';
import { type CurrencyConfig } from '@/lib/currency-format';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface RevenueABXCostProps {
	categories: string[];
	series: number[];
}

interface DataProps {
	data: RevenueABXCostProps;
	currencyConfig?: CurrencyConfig;
}
export default function RevenueABXCost({
	data,
	currencyConfig,
}: DataProps) {
	return (
		<div className='w-full'>
			<AreaChartsApex
				legend={'Receita A&B'}
				series={[
					{
						name: 'Receita A&B',
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
