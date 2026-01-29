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
	error?: string | boolean;
}

export default function UnityxRevenuexTimeABPercent({
	data,
	error,
}: UnityxRevenuexTimePrps) {
	const isLoading = typeof data === 'undefined';
	const resolvedError =
		error ?? (data === null ? 'Não foi possível carregar os dados.' : undefined);

	if (!isLoading && !resolvedError && (!data?.series?.length || !data?.categories?.length)) {
		return null;
	}

	return (
		<div className='w-full'>
			<LineChart
				percent
				error={resolvedError}
				title={'% de A&B por unidade'}
				series={data?.series}
				categories={data?.categories}
				height={400}
			/>
		</div>
	);
}
