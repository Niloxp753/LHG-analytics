/** @format */

import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';
import React from 'react';
const BarCharApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/BarCharApex'),
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
				<BarCharApex
					title='Reservas Por Tipo de Locação'
					colors={['#a78bfa']}
					dataLabelColors={['#5b21b6']}
					categories={categories}
					series={[{ data: series, type: 'bar' }]}
				/>
			)}
		</>
	);
}
