/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface MorningCleaningWorkersProps {
	categories: string[];
	series: any;
}

export default function MorningCleaningWorkers({
	categories,
	series,
}: MorningCleaningWorkersProps) {
	return (
		<LineChart
			height={480}
			title='Total de limpezas - Manhã'
			series={series.Manhã}
			categories={categories}
		/>
	);
}
