/** @format */

'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface MorningCleaningWorkersProps {
	categories?: string[];
	series?: ApexAxisChartSeries | ApexNonAxisChartSeries | null;
	error?: string | boolean;
}

export default function MorningCleaningWorkers({
	categories,
	series,
	error,
}: MorningCleaningWorkersProps) {
	const resolvedError =
		error ?? (series === null ? 'Não foi possível carregar os dados.' : undefined);

	return (
		<LineChart
			height={480}
			title='Total de Limpezas - Manhã'
			error={resolvedError}
			series={series ?? undefined}
			categories={categories}
		/>
	);
}
