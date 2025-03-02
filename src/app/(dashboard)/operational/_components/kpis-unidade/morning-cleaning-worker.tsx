/** @format */

import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface MorningCleaningWorkersProps {
	categories: string[];
	series: any;
}

export default function MorningCleaningWorkers({
	categories,
	series,
}: MorningCleaningWorkersProps) {
	if (!series.Manhã.length || series.Manhã.length == 0 || !series) {
		return <Skeleton className='w-full h-[480px]'></Skeleton>;
	} else {
		return series && categories ? (
			<LineChart
				height={480}
				title='Total de limpezas - Manhã'
				series={series.Manhã}
				categories={categories}
			/>
		) : (
			<>
				<Skeleton className='w-full h-[480px]'></Skeleton>
			</>
		);
	}
}
