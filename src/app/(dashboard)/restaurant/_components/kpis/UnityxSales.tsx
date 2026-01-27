/** @format */
'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const PieChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/PieChartsApex'),
	{ ssr: false },
);

interface EntryData {
	categories: string[];
	series: Array<{ name: string; data: number[] }>;
}
interface UnityxSalesProps {
	data: EntryData;
}
export default function UnityxSales({ data }: UnityxSalesProps) {
	return (
		<PieChartsApex
			height={280}
			title='Nº de vendas por unidade'
			series={data.series}
			colors={['#a78bfa', '#fbbf24', '#2dd4bf', '#ef4444']}
			dataLabelColors={['#5b21b6', '#d97706', '#115e59', '#991b1b']}
			labels={data.categories}
		/>
	);
}
