/** @format */
'use client';

import { Skeleton } from '@/_components/ui/skeleton';
import dynamic from 'next/dynamic';
import React from 'react';
const PieChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/PieChartsApex'),
	{ ssr: false },
);

interface PerformanceProps {
	data: any;
}

export default function Performance(data: PerformanceProps) {
	const supPerformance = data.data;

	if (
		!supPerformance.series.length ||
		supPerformance.series.length == 0 ||
		!supPerformance
	) {
		return <Skeleton className='w-full h-[340px]'></Skeleton>;
	}
	return supPerformance ? (
		<PieChartsApex
			labels={supPerformance?.categories}
			series={supPerformance?.series}
			height={340}
			title='Performance de supervisores'
		/>
	) : (
		<>
			<Skeleton className='w-full h-[340px]'></Skeleton>
		</>
	);
}
