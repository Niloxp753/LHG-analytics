/** @format */
'use client';

import dynamic from 'next/dynamic';
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
}
export default function RevenueABXCost({ data }: DataProps) {
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
			/>
		</div>
	);
}
