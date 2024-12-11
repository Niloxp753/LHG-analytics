/** @format */

import { Skeleton } from '@/_components/ui/skeleton';
import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface NightCleaningWorkersProps {
	categories: string[];
	series: any;
}

export default function NightCleaningWorkers({
	categories,
	series,
}: NightCleaningWorkersProps) {
	if (!series.Noite.length || series.Noite.length == 0 || !series) {
		return <Skeleton className='w-full h-[480px]'></Skeleton>;
	} else {
		return series && categories ? (
			<LineChart
				height={48}
				title='Total de limpezas - Noite'
				series={series.Noite}
				categories={categories}
			/>
		) : (
			<>
				<Skeleton className='w-full h-[480px]'></Skeleton>
			</>
		);
	}
}
