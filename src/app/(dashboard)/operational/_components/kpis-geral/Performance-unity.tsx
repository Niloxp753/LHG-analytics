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
interface PerformanceUnityProps {
	data?: EntryData | null;
	error?: string | boolean;
}

export default function PerformanceUnity({ data, error }: PerformanceUnityProps) {
	const isLoading = typeof data === 'undefined';
	const resolvedError =
		error ?? (data === null ? 'Não foi possível carregar os dados.' : undefined);
	const series = data?.series?.[0]?.data;

	if (!isLoading && !resolvedError && (!series?.length || !data?.categories?.length)) {
		return null;
	}

	return (
		<PieChartsApex
			height={340}
			error={resolvedError}
			series={series ?? undefined}
			categories={['Lush Ipiranga', 'Lush Lapa', 'Andar de Cima', 'Tout']}
			title='Total de Vistorias por Unidade'
			colors={['#a78bfa', '#fbbf24', '#2dd4bf', '#ef4444']}
			dataLabelColors={['#5b21b6', '#d97706', '#115e59', '#991b1b']}
			labels={data?.categories}
		/>
	);
}
