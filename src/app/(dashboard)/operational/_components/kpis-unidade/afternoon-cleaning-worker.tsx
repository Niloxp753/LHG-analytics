/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface AfternoonCleaningWorkersProps {
	categories?: string[];
	series?: any[] | null;
	error?: string | boolean;
}

export default function AfternoonCleaningWorkers({
	categories,
	series,
	error,
}: AfternoonCleaningWorkersProps) {
	const isLoading = typeof series === 'undefined';
	const resolvedError =
		error ?? (series === null ? 'Não foi possível carregar os dados.' : undefined);

	if (!isLoading && !resolvedError && (!series?.length || !categories?.length)) {
		return null;
	}

	return (
		<LineChart
			height={48}
			title='Total de Limpezas - Tarde'
			error={resolvedError}
			series={series ?? undefined}
			categories={categories}
		/>
	);
}
