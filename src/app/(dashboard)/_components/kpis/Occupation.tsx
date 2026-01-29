/** @format */
'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface OccupancyRateByDateProps {
	series: number[];
	categories: string[];
}

export default function Occupation(data?: any) {
	const occupancyRateByDate: OccupancyRateByDateProps | null | undefined =
		data?.data;
	const error =
		occupancyRateByDate === null
			? 'Não foi possível carregar os dados.'
			: undefined;

	return (
		<>
			<AreaChartsApex
				id='tx-ocuppation-ipiranga'
				percent
				error={error}
				series={
					occupancyRateByDate
						? [
								{
									data: occupancyRateByDate.series,
									name: 'Taxa de ocupação',
								},
						  ]
						: undefined
				}
				categories={occupancyRateByDate?.categories}
			/>
		</>
	);
}
