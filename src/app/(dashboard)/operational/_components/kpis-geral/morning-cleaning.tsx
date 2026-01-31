/** @format */

'use client';

import dynamic from 'next/dynamic';
import { ShiftCleaning } from '../../types';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface MorningCleaningProps {
	data?: ShiftCleaning | null;
	error?: string | boolean;
}

export default function MorningCleaning({ data, error }: MorningCleaningProps) {
	const isLoading = typeof data === 'undefined';
	const resolvedError =
		error ?? (data === null ? 'Não foi possível carregar os dados.' : undefined);

	const chartSeries = data?.Manhã;
	const categories = data?.categories;

	if (!isLoading && !resolvedError && (!chartSeries?.length || !categories?.length)) {
		return null;
	}

	return (
		<LineChart
			height={48}
			title='Total de Limpezas - Manhã'
			error={resolvedError}
			series={chartSeries}
			categories={categories}
		/>
	);
}
