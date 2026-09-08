/** @format */
'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const ColumnChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/ColumnChart'),
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
	const resolvedError =
		error ?? (data === null ? 'Não foi possível carregar os dados.' : undefined);
	const series = data?.series?.[0]?.data;

	return (
		<ColumnChart
			height={400}
			palette='units'
			error={resolvedError}
			series={series ?? undefined}
			title='Total de Vistorias por Unidade'
			categories={data?.categories}
		/>
	);
}
