/** @format */
'use client';

import { Skeleton } from '@/_components/ui/skeleton';
import dynamic from 'next/dynamic';
import React from 'react';
const PieChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/PieChartsApex'),
	{ ssr: false },
);

interface SuitesOutsourcedInternalProps {
	data: any;
}

export default function SuitesOutsourcedInternal(
	data: SuitesOutsourcedInternalProps,
) {
	const ShiftCleaning = data?.data;

	if (
		!ShiftCleaning.series.length ||
		ShiftCleaning.series.length == 0 ||
		!ShiftCleaning
	) {
		return (
			<>
				<Skeleton className='w-full h-[340px]'></Skeleton>
			</>
		);
	} else {
		return ShiftCleaning ? (
			<PieChartsApex
				labels={ShiftCleaning.categories}
				series={ShiftCleaning.series}
				height={340}
				title='Limpezas por turno'
			/>
		) : (
			<>
				<Skeleton className='w-full h-[340px]'></Skeleton>
			</>
		);
	}
}
