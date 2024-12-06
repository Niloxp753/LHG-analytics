/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface NightCleaningWorkersProps {
	categories: string[];
	series: any;
}

export default function NightCleaningWorkers({
	categories,
	series,
}: NightCleaningWorkersProps) {
	return (
		<LineChart
			height={48}
			title='Total de limpezas - Noite'
			series={series.Noite}
			categories={categories}
		/>
	);
}
