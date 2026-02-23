/** @format */

'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface NightCleaningWorkersProps {
	categories?: string[];
	series?: ApexAxisChartSeries | ApexNonAxisChartSeries | null;
	error?: string | boolean;
}

export default function NightCleaningWorkers({
	categories,
	series,
	error,
}: NightCleaningWorkersProps) {
	const resolvedError =
		error ?? (series === null ? 'Não foi possível carregar os dados.' : undefined);

	return (
		<LineChart
			height={48}
			title='Total de Limpezas - Noite'
			error={resolvedError}
			series={series ?? undefined}
			categories={categories}
		/>
	);
}
