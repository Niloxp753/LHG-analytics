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
	data: EntryData;
}

export default function PerformanceUnity({ data }: PerformanceUnityProps) {
	return (
		<PieChartsApex
			height={340}
			series={data.series[0].data}
			categories={['Lush Ipiranga', 'Lush Lapa', 'Andar de Cima', 'Tout']}
			title='Total de vistorias por unidade'
			colors={['#a78bfa', '#fbbf24', '#2dd4bf', '#ef4444']}
			dataLabelColors={['#5b21b6', '#d97706', '#115e59', '#991b1b']}
			labels={data.categories}
		/>
	);
}
