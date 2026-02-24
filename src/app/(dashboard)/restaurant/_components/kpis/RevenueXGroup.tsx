/** @format */
'use client';

import dynamic from 'next/dynamic';
import { type CurrencyConfig } from '@/lib/currency-format';
import React from 'react';
const BarChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/BarCharApex'),
	{ ssr: false },
);
interface RevenueXGroupProps {
	categories: string[];
	series: Serie[];
}

interface DataProps {
	data: RevenueXGroupProps;
	currencyConfig?: CurrencyConfig;
}

interface Serie {
	name: string;
	data: number[];
}
export default function RevenueXGroup({ data, currencyConfig }: DataProps) {
	return (
		<div className='w-full h-fit'>
			<BarChart
				title={'Faturamento Por Grupo'}
				series={data.series}
				categories={data.categories}
				dataLabelColors={['#7c3aed', '#2563eb', '#4f46e5']}
				colors={['#a78bfa', '#60a5fa', '#818cf8']}
				money
				currencyConfig={currencyConfig}
				stacked
				showLegend
				showDataLabels
				showTotalLabels={false}
				showXAxisLabels
				showXAxisGrid
				barHeight={18}
				hideDataLabelsOnMobile
			/>
		</div>
	);
}
