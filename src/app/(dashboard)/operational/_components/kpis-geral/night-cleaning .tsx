/** @format */

'use client';

import dynamic from 'next/dynamic';
import { ShiftCleaning } from '../../types';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface NightCleaningProps {
	data?: ShiftCleaning | null;
	error?: string | boolean;
}

export default function NightCleaning({ data, error }: NightCleaningProps) {
	const resolvedError =
		error ?? (data === null ? 'Não foi possível carregar os dados.' : undefined);

	const chartSeries = data?.Noite;
	const categories = data?.categories;

	return (
		<LineChart
			height={48}
			title='Total de Limpezas - Noite'
			error={resolvedError}
			series={chartSeries}
			categories={categories}
		/>
	);
}
