/** @format */
'use client';

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
	error?: string | boolean;
}
export default function UnityxTKTxTime({ data, error }: UnityxTKTxTimePrps) {
	const resolvedError =
		error ??
		(data === null ? 'Não foi possível carregar os dados.' : undefined);

	return (
		<div className='w-full'>
			<LineChart
				money
				error={resolvedError}
				title={'Ticket médio por unidade'}
				series={data?.series}
				categories={data?.categories}
				height={440}
			/>
		</div>
	);
}
