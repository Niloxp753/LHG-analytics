/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface RevenuePercentProps {
	categories: string[];
	series: number[];
}

interface DataProps {
	data: RevenuePercentProps;
}

export default function RevenuePercent({ data }: DataProps) {
	const series = data.series.map((value) => {
		const newValue = (value * 100).toFixed(2);
		return Number(newValue);
	});
	return (
		<div className='w-full'>
			<AreaChartsApex
				series={[
					{
						name: 'Faturamento A&B/ Faturamento Total %',
						data: series,
					},
				]}
				categories={data.categories}
				percent
			/>
		</div>
	);
}
