/** @format */

import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface AfternoonCleaningWorkersProps {
	categories: string[];
	series: any;
}

export default function AfternoonCleaningWorkers({
	categories,
	series,
}: AfternoonCleaningWorkersProps) {
	if (!series.length || series.length == 0 || !series) {
		return <Skeleton className='w-full h-[480px]'></Skeleton>;
	} else {
		return series && categories ? (
			<LineChart
				height={48}
				title='Total de limpezas - Tarde'
				series={series}
				categories={categories}
			/>
		) : (
			<>
				<Skeleton className='w-full h-[480px]'></Skeleton>
			</>
		);
	}
}
