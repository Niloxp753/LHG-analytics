/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface AfternoonCleaningWorkersProps {
	categories: string[];
	series: any;
}

export default function AfternoonCleaningWorkers({
	categories,
	series,
}: AfternoonCleaningWorkersProps) {
	return (
		<LineChart
			height={48}
			title='Total de limpezas - Tarde'
			series={series.Tarde}
			categories={categories}
		/>
	);
}
