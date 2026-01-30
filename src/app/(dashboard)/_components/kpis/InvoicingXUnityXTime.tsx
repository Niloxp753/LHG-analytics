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
interface InvoicingXUnityXTimeProps {
	data?: EntryData | null;
}
export default function InvoicingXUnityXTime({
	data,
}: InvoicingXUnityXTimeProps) {
	const isLoading = typeof data === 'undefined';
	const error =
		data === null ? 'Não foi possível carregar os dados.' : undefined;

	if (!isLoading && !error && (!data?.series?.length || !data?.categories?.length)) {
		return null;
	}

	return (
		<LineChart
			money
			error={error}
			height={148}
			title='Faturamento por Unidade no tempo'
			series={data?.series}
			categories={data?.categories}
		/>
	);
}
