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
	const error =
		data === null ? 'Não foi possível carregar os dados.' : undefined;

	return (
		<LineChart
			palette='units'
			money
			error={error}
			height={148}
			title='Faturamento por Unidade no tempo'
			series={data?.series}
			categories={data?.categories}
		/>
	);
}
