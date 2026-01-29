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
interface OccupationXUnityProps {
	data: EntryData;
}
export default function OccupationXUnity({ data }: OccupationXUnityProps) {
	return (
		<>
			<LineChart
				percent
				height={148}
				title='Taxa de ocupação por Unidade'
				series={data.series}
				categories={data.categories}
			/>
		</>
	);
}
