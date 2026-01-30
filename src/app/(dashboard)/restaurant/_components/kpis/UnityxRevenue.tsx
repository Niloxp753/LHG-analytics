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
	data?: EntryData | null;
	error?: string | boolean;
}
export default function UnityxRevenue({ data, error }: UnityxRevenueProps) {
	const isLoading = typeof data === 'undefined';
	const resolvedError =
		error ?? (data === null ? 'Não foi possível carregar os dados.' : undefined);

	if (!isLoading && !resolvedError && (!data?.series?.length || !data?.categories?.length)) {
		return null;
	}

	return (
		<PieChartsApex
			money
			height={280}
			title='Receita de A&B por unidade'
			error={resolvedError}
			series={data?.series}
			colors={['#a78bfa', '#fbbf24', '#2dd4bf', '#ef4444']}
			dataLabelColors={['#5b21b6', '#d97706', '#115e59', '#991b1b']}
			labels={data?.categories}
		/>
	);
}
