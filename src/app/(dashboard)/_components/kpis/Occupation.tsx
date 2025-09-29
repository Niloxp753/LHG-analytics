/** @format */
'use client';

import { Skeleton } from '@/components/ui/skeleton';
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
	const occupancyRateByDate: OccupancyRateByDateProps = data.data;

	return (
		<>
			{occupancyRateByDate ? (
				<AreaChartsApex
					id='tx-ocuppation-ipiranga'
					percent
					series={[
						{
							data: occupancyRateByDate.series,
							name: 'Taxa de ocupação',
						},
					]}
					categories={occupancyRateByDate.categories}
				/>
			) : (
				<Skeleton className='w-full h-[300px]' />
			)}
			;
		</>
	);
}
