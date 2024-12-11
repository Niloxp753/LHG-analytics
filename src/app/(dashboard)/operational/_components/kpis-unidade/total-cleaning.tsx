/** @format */

'use client';

import { Skeleton } from '@/_components/ui/skeleton';
import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface TotalCleaningProps {
	data: any;
}

export default function TotalCleaning(data: TotalCleaningProps) {
	const cleaningByDate = data?.data;

	if (
		!cleaningByDate.series.length ||
		cleaningByDate.series.length == 0 ||
		!cleaningByDate
	) {
		return (
			<>
				<Skeleton className='w-full h-[340px]'></Skeleton>
			</>
		);
	} else {
		return cleaningByDate ? (
			<AreaChartsApex
				id='total-cleaning-ipiranga'
				series={[
					{
						data: cleaningByDate?.series,
						name: 'Total de limpezas',
					},
				]}
				categories={cleaningByDate?.categories}
			/>
		) : (
			<>
				<Skeleton className='w-full h-[340px]'></Skeleton>
			</>
		);
	}
}
