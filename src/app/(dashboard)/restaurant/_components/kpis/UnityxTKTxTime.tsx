/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface RevenueByCompany {
	categories: string[];
	series: Array<{ name: string; data: number[] }>;
}

interface UnityxTKTxTimePrps {
	data?: RevenueByCompany | null;
}
export default function UnityxTKTxTime({ data }: UnityxTKTxTimePrps) {
	return (
		<div className='w-full'>
			<LineChart
				money
				title={'Ticket médio por unidade'}
				series={data?.series}
				categories={data?.categories}
				height={440}
			/>
		</div>
	);
}
