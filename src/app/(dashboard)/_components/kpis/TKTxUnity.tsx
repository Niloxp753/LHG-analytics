/** @format */

'use client';

import dynamic from 'next/dynamic';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface EntryData {
	categories: string[];
	series: Array<{ name: string; data: number[] }>;
}
interface TKTxUnityProps {
	data?: EntryData | null;
}

export default function TKTxUnity({ data }: TKTxUnityProps) {
	const isLoading = typeof data === 'undefined';
	const error =
		data === null ? 'Não foi possível carregar os dados.' : undefined;

	if (!isLoading && !error && (!data?.series?.length || !data?.categories?.length)) {
		return null;
	}

	return (
		<>
			<LineChart
				money
				error={error}
				height={148}
				title='Ticket Médio por Unidade'
				series={data?.series}
				categories={data?.categories}
			/>
		</>
	);
}
