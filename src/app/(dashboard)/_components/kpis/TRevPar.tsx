/** @format */

'use client';

import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface TrevparEntry {
	[date: string]: {
		totalTrevpar: string;
	};
}

interface TransformedEntry {
	date: string;
	totalTrevpar: number;
}

interface TrevparByDateProps {
	series: number[];
	categories: string[];
}

export default function TRevPar(data?: any) {
	const trevparByDate: TrevparByDateProps = data.data;

	return (
		<>
			{trevparByDate ? (
				<AreaChartsApex
					id='trevpar-ipiranga'
					series={[
						{
							data: trevparByDate.series,
							name: 'Trevpar',
						},
					]}
					categories={trevparByDate.categories}
					money
				/>
			) : (
				<Skeleton className='h-[310px] w-full' />
			)}
		</>
	);
}
