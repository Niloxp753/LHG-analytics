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
interface TRevParXUnityProps {
	data: EntryData;
}

export default function TRevParXUnity({ data }: TRevParXUnityProps) {
	return (
		<>
			<LineChart
				money
				title='Trevpar por unidade'
				height={148}
				series={data?.series}
				categories={data?.categories}
			/>
		</>
	);
}
