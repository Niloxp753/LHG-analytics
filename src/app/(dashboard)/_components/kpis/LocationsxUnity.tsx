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
interface LocationsxUnityProps {
	data: EntryData;
}

export default function LocationsxUnity({ data }: LocationsxUnityProps) {
	const title = 'Locações por unidade';

	return (
		<>
			<LineChart
				height={52}
				title={title}
				series={data.series}
				categories={data.categories}
			/>
		</>
	);
}
