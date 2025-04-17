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
	const newCategories = categories.map((item) => {
		if (item === 'WEBSITE_IMMEDIATE') {
			return 'Site Imediatas';
		} else if (item === 'WEBSITE_SCHEDULED') {
			return 'Site Programadas';
		} else if (item === 'GUIA_GO') {
			return 'Guia Go';
		} else if (item === 'GUIA_SCHEDULED') {
			return 'Guia Programada';
		} else if (item === 'INTERNAL') {
			return 'Direta';
		} else if (item === 'BOOKING') {
			return 'Booking';
		} else if (item === 'EXPEDIA') {
			return 'Expedia';
		}
		return item;
	});

	return !series || series.length == 0 ? (
		<Skeleton className='w-full h-88' />
	) : (
		<BarCharApex
			money
			title='Faturamento por canal de vendas'
			series={[{ data: series, type: 'bar' }]}
			colors={['#a78bfa', '#4ade80', '#fbbf24']}
			dataLabelColors={['#5b21b6', '#22c55e', '#ca8a04']}
			categories={newCategories}
		/>
	);
}
