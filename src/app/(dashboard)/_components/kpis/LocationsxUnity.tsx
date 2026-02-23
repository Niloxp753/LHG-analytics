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
interface LocationsxUnityProps {
	data?: EntryData | null;
}

export default function LocationsxUnity({ data }: LocationsxUnityProps) {
	const title = 'Locações por unidade';
	const error =
		data === null ? 'Não foi possível carregar os dados.' : undefined;

	return (
		<>
			<LineChart
				height={52}
				error={error}
				title={title}
				series={data?.series}
				categories={data?.categories}
			/>
		</>
	);
}
