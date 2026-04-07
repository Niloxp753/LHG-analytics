/** @format */

'use client';

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
	const resolvedError =
		error ?? (data === null ? 'Não foi possível carregar os dados.' : undefined);

	const chartSeries = data?.Tarde;
	const categories = data?.categories;

	return (
		<LineChart
			palette='units'
			height={48}
			title='Total de Limpezas - Tarde'
			error={resolvedError}
			series={chartSeries}
			categories={categories}
		/>
	);
}
