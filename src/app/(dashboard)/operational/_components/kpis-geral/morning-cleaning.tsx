/** @format */

import dynamic from 'next/dynamic';
import { ShiftCleaning } from '../../types';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface MorningCleaningProps {
	categories?: ShiftCleaning['categories'];
	series?: ShiftCleaning['series'] | null;
	error?: string | boolean;
}

export default function MorningCleaning({
	categories,
	series,
	error,
}: MorningCleaningProps) {
	const isLoading = typeof series === 'undefined';
	const resolvedError =
		error ?? (series === null ? 'Não foi possível carregar os dados.' : undefined);

	if (!isLoading && !resolvedError && (!series || !categories?.length)) {
		return null;
	}

	const ipirangaMorning = series?.['Lush Ipiranga'].find(
		(e) => e.name === 'Manhã',
	);
	const lapaMorning = series?.['Lush Lapa'].find((e) => e.name === 'Manhã');
	const andarMorning = series?.['Andar de Cima'].find((e) => e.name === 'Manhã');
	const toutMorning = series?.['Tout'].find((e) => e.name === 'Manhã');

	const chartSeries = series
		? [
				{ name: 'Lush Ipiranga', data: ipirangaMorning?.data ?? [] },
				{ name: 'Lush Lapa', data: lapaMorning?.data ?? [] },
				{ name: 'Andar de Cima', data: andarMorning?.data ?? [] },
				{ name: 'Tout', data: toutMorning?.data ?? [] },
		  ]
		: undefined;
	return (
		<LineChart
			height={48}
			title='Total de limpezas - Manhã'
			error={resolvedError}
			series={chartSeries}
			categories={categories}
		/>
	);
}
