/** @format */
'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const PieChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/PieChartsApex'),
	{ ssr: false },
);

interface PerformanceDataProps {
	categories: string[];
	series: number[];
}

interface PerformanceProps {
	data?: PerformanceDataProps | null;
}

export default function Performance({ data }: PerformanceProps) {
	const supPerformance = data;
	const error =
		supPerformance === null ? 'Não foi possível carregar os dados.' : undefined;

	return (
		<PieChartsApex
			error={error}
			labels={supPerformance?.categories}
			series={supPerformance?.series ?? undefined}
			height={340}
			title='Performance de Supervisores'
		/>
	);
}
