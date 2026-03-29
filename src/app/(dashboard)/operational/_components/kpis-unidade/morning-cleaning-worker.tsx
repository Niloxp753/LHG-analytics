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
	title?: string;
	height?: number;
}

export default function MorningCleaningWorkers({
	categories,
	series,
	error,
	title,
	height,
}: MorningCleaningWorkersProps) {
	const resolvedError =
		error ??
		(series === null ? 'N\u00e3o foi poss\u00edvel carregar os dados.' : undefined);

	return (
		<LineChart
			height={height ?? 480}
			title={title ?? 'Total de Limpezas - Manh\u00e3'}
			error={resolvedError}
			series={series ?? undefined}
			categories={categories}
		/>
	);
}
