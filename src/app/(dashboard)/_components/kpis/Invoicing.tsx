/** @format */
'use client';

import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface RevenueByDateProps {
	categories: string[];
	series: number[];
}

export default function Invoicing(data?: any) {
	const revenueByDate: RevenueByDateProps = data.data;

	return (
		<>
			{revenueByDate ? (
				<AreaChartsApex
					id='invoicing-ipiranga'
					money
					series={[{ data: revenueByDate.series, name: 'Faturamento Total' }]}
					categories={revenueByDate.categories}
				/>
			) : (
				<Skeleton className='w-full h-[300px]' />
			)}
			;
		</>
	);
}
