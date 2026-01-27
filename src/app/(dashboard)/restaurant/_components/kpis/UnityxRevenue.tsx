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
interface UnityxRevenueProps {
	data: EntryData;
}
export default function UnityxRevenue({ data }: UnityxRevenueProps) {
	return (
		<PieChartsApex
			money
			height={280}
			title='Receita de A&B por unidade'
			series={data.series}
			colors={['#a78bfa', '#fbbf24', '#2dd4bf', '#ef4444']}
			dataLabelColors={['#5b21b6', '#d97706', '#115e59', '#991b1b']}
			labels={data.categories}
		/>
	);
}
