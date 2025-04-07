/** @format */

import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';
import React from 'react';
const ColumnChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/ColumnChart'),
	{ ssr: false },
);

interface CategoriesProps {
	series: number[];
	categories: string[];
}
export default function Categories({ categories, series }: CategoriesProps) {
	return (
		<>
			{!series || series.length === 0 ? (
				<Skeleton className='h-88 w-88' />
			) : (
				<ColumnChart
					title='Reservas Por Tipo de Locação'
					categories={categories}
					series={[{ data: series }]}
				/>
			)}
		</>
	);
}
