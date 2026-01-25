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
interface TKTxUnityProps {
	data: EntryData;
}

export default function TKTxUnity({ data }: TKTxUnityProps) {
	return (
		<>
			<LineChart
				money
				height={148}
				title='Ticket Médio por Unidade'
				series={data.series}
				categories={data?.categories}
			/>
		</>
	);
}
