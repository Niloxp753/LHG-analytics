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
interface OccupationXUnityProps {
	data?: EntryData | null;
}
export default function OccupationXUnity({ data }: OccupationXUnityProps) {
	const error =
		data === null ? 'Não foi possível carregar os dados.' : undefined;

	return (
		<>
			<LineChart
				percent
				height={148}
				error={error}
				title='Taxa de ocupação por Unidade'
				series={data?.series}
				categories={data?.categories}
			/>
		</>
	);
}
