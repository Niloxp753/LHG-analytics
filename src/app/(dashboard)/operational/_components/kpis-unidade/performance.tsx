/** @format */
'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const ColumnChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/ColumnChart'),
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
		<ColumnChart
			comparison
			error={error}
			categories={supPerformance?.categories}
			series={supPerformance?.series ?? undefined}
			height={400}
			title='Performance de Supervisores'
		/>
	);
}
