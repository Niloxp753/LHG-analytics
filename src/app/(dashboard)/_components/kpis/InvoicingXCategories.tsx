/** @format */
'use client';
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';
import React from 'react';
const BarCharApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/BarCharApex'),
	{ ssr: false },
);

interface RevenueBySuiteCategoryProps {
	series: number[];
	categories: string[];
}

export default function Categories(data?: any) {
	const revenueBySuiteCategory: RevenueBySuiteCategoryProps = data.data;

	return (
		<>
			{revenueBySuiteCategory ? (
				<BarCharApex
					money
					series={[
						{
							name: 'Faturamento',
							data: revenueBySuiteCategory?.series,
							type: 'bar',
						},
					]}
					dataLabelColors={['#5b21b6']}
					colors={['#a78bfa']}
					title='Faturamento por Categoria de Suíte'
					categories={revenueBySuiteCategory?.categories}
				/>
			) : (
				<>
					<Skeleton className='w-full h-[620px]' />
				</>
			)}
			;
		</>
	);
}
