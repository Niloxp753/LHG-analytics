/** @format */
'use client';

import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface RevparByDateProps {
	series: number[];
	categories: string[];
}

export default function RevPar(data?: any) {
	const revparByDate: RevparByDateProps = data.data;

	return (
		<>
			{revparByDate ? (
				<AreaChartsApex
					money
					id='revpar-ipiranga'
					series={[{ data: revparByDate.series, name: 'Revpar' }]}
					categories={revparByDate?.categories}
				/>
			) : (
				<Skeleton className='h-[310px] w-full' />
			)}
		</>
	);
}
