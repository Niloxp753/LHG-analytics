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

export default function UnityxRevenuexTimeABPercent({ data }: UnityxRevenuexTimePrps) {
	return (
		<div className='w-full'>
			<LineChart
				percent
				title={'% de A&B por unidade'}
				series={data?.series}
				categories={data?.categories}
				height={400}
			/>
		</div>
	);
}
