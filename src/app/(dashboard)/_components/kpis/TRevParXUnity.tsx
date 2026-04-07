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
interface TRevParXUnityProps {
	data?: EntryData | null;
}

export default function TRevParXUnity({ data }: TRevParXUnityProps) {
	const error =
		data === null ? 'Não foi possível carregar os dados.' : undefined;

	return (
		<>
			<LineChart
				palette='units'
				money
				error={error}
				title='Trevpar por unidade'
				height={148}
				series={data?.series}
				categories={data?.categories}
			/>
		</>
	);
}
