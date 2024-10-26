/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const BarCharApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/BarCharApex'),
	{ ssr: false },
);

export default function Categories(data: any) {
	const revenueBySuiteCategory = data.data;
	const totalRevenueData: any[] = [];
	const categories: any[] = [];

	revenueBySuiteCategory.forEach((item: any) => {
		const category = Object.keys(item)[0];
		const value = item[category].totalValue;

		// Adiciona a data e converte o valor para número
		categories.push(category);
		totalRevenueData.push(
			parseFloat(value.replace(/[^0-9,]/g, '').replace(',', '.')),
		);
	});

	const result = {
		name: 'Faturamento por Categoria de Suíte',
		data: totalRevenueData,
		dates: categories,
	};

	return (
		<>
			<BarCharApex
				money
				series={[
					{
						name: 'Faturamento',
						data: result.data,
						type: 'bar',
					},
				]}
				dataLabelColors={['#5b21b6']}
				colors={['#a78bfa']}
				title='Faturamento por Categoria de Suíte'
				categories={result.dates}
			/>
		</>
	);
}
