/** @format */

'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface CategoryBProps {
	categoriesDrink: string[];
	seriesDrink: Serie[];
}

interface DataProps {
	data: CategoryBProps;
}

interface Serie {
	name: string;
	data: number[];
}

export default function CategoryB({ data }: DataProps) {
	return (
		<div className='w-full'>
			<LineChart
				height={500}
				title={'Faturamento de Bebidas'}
				series={data.seriesDrink}
				categories={data.categoriesDrink}
				money
			/>
		</div>
	);
}
