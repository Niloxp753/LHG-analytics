/** @format */
'use client';
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
	const revenueBySuiteCategory: RevenueBySuiteCategoryProps | null | undefined =
		data?.data;
	const error =
		revenueBySuiteCategory === null
			? 'Não foi possível carregar os dados.'
			: undefined;

	return (
		<>
			<BarCharApex
				money
				error={error}
				series={
					revenueBySuiteCategory
						? [
								{
									name: 'Faturamento',
									data: revenueBySuiteCategory?.series,
									type: 'bar',
								},
						  ]
						: undefined
				}
				dataLabelColors={['#5b21b6']}
				colors={['#a78bfa']}
				title='Faturamento por Categoria de Suíte'
				categories={revenueBySuiteCategory?.categories}
			/>
		</>
	);
}
