/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface MorningCleaningWorkersProps {
	categories?: string[];
	series?: any[] | null;
	error?: string | boolean;
}

export default function MorningCleaningWorkers({
	categories,
	series,
	error,
}: MorningCleaningWorkersProps) {
	const isLoading = typeof series === 'undefined';
	const resolvedError =
		error ?? (series === null ? 'Não foi possível carregar os dados.' : undefined);

	if (!isLoading && !resolvedError && (!series?.length || !categories?.length)) {
		return null;
	}

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
