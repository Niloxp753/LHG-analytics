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

interface OccupationProps {
	data?: OccupancyRateByDateProps | null;
}

export default function Occupation({ data }: OccupationProps) {
	const occupancyRateByDate = data;
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
