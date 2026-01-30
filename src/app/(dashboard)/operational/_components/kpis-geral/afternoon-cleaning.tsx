/** @format */

import dynamic from 'next/dynamic';
import { ShiftCleaning } from '../../types';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface AfternoonCleaningProps {
	data?: ShiftCleaning | null;
	error?: string | boolean;
}

export default function AfternoonCleaning({
	data,
	error,
}: AfternoonCleaningProps) {
	const isLoading = typeof data === 'undefined';
	const resolvedError =
		error ?? (data === null ? 'Não foi possível carregar os dados.' : undefined);

	const chartSeries = data?.Tarde;
	const categories = data?.categories;

	if (!isLoading && !resolvedError && (!chartSeries?.length || !categories?.length)) {
		return null;
	}

	return (
		<LineChart
			height={48}
			title='Total de Limpezas - Tarde'
			error={resolvedError}
			series={chartSeries}
			categories={categories}
		/>
	);
}
