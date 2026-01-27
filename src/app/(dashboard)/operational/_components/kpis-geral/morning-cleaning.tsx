/** @format */

import { accumulateEmployeeData } from '@/utils/normalize-cleaning-values';
import dynamic from 'next/dynamic';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface EntryData {
	categories: string[];
	series: Array<{ name: string; data: number[] }>;
}
interface MorningCleaningProps {
	data: EntryData;
}

export default function MorningCleaning({ data }: MorningCleaningProps) {
	return (
		<LineChart
			height={48}
			title='Total de limpezas - Manhã'
			series={data.series}
			categories={data.categories}
		/>
	);
}
