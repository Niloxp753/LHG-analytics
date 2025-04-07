/** @format */
'use client';

import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';
import React from 'react';
const BarCharApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/BarCharApex'),
	{ ssr: false },
);

interface InvoicingXTypesProps {
	series: number[];
	categories: string[];
}
export default function InvoicingXChannel({
	categories,
	series,
}: InvoicingXTypesProps) {
	return !series || series.length == 0 ? (
		<Skeleton className='w-full h-88' />
	) : (
		<BarCharApex
			money
			title='Faturamento por canal de vendas'
			series={[{ data: series, type: 'bar' }]}
			colors={['#a78bfa', '#4ade80', '#fbbf24']}
			dataLabelColors={['#5b21b6', '#22c55e', '#ca8a04']}
			categories={categories}
		/>
	);
}
