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

interface UnityxRevenuexTimePrps {
	data?: RevenueByCompany | null;
}

export default function UnityxRevenuexTimeAB({ data }: UnityxRevenuexTimePrps) {
	return (
		<div className='w-full'>
			<LineChart
				money
				title={'Receita de A&B por unidade'}
				series={data?.series}
				categories={data?.categories}
				height={400}
			/>
		</div>
	);
}
