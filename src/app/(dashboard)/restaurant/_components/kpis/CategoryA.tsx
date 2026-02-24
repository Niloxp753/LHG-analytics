/** @format */

'use client';

import dynamic from 'next/dynamic';
import { type CurrencyConfig } from '@/lib/currency-format';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface CategoryAProps {
	categoriesFood: string[];
	seriesFood: Serie[];
}

interface DataProps {
	data: CategoryAProps;
	currencyConfig?: CurrencyConfig;
}

interface Serie {
	name: string;
	data: number[];
}

export default function CategoryA({ data, currencyConfig }: DataProps) {

	return (
		<div className='w-full'>
			<LineChart
				height={500}
				title={'Faturamento de Alimentos'}
				series={data.seriesFood}
				categories={data.categoriesFood}
				money
				currencyConfig={currencyConfig}
			/>
		</div>
	);
}
