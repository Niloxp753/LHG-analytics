/** @format */

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
	data: EntryData;
}
export default function InvoicingXUnityXTime({
	data,
}: InvoicingXUnityXTimeProps) {
	return (
		<LineChart
			money
			height={148}
			title='Faturamento por Unidade no tempo'
			series={data?.series}
			categories={data.categories}
		/>
	);
}
