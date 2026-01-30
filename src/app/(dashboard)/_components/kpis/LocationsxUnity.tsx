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
	const isLoading = typeof data === 'undefined';
	const error =
		data === null ? 'Não foi possível carregar os dados.' : undefined;

	if (!isLoading && !error && (!data?.series?.length || !data?.categories?.length)) {
		return null;
	}

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
