/** @format */
'use client';
import dynamic from 'next/dynamic';
import React from 'react';
const BarCharApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/BarCharApex'),
	{ ssr: false },
);

interface SuiteCategoryRevenueEntry {
	[category: string]: {
		totalValue: string;
	};
}

// Interface para a estrutura dos dados transformados
interface Result {
	values: number[];
	categories: string[];
}

export default function Categories(data?: any) {
	const revenueBySuiteCategory: SuiteCategoryRevenueEntry[] = data.data;

	const transformedData: Result = revenueBySuiteCategory
		// Ordenando com base em totalValue, convertendo para número antes
		?.sort((a, b) => {
			const valueA = parseFloat(
				Object.values(a)[0]
					.totalValue.replace('R$', '')
					.replace('.', '')
					.replace(',', '.'),
			);
			const valueB = parseFloat(
				Object.values(b)[0]
					.totalValue.replace('R$', '')
					.replace('.', '')
					.replace(',', '.'),
			);
			return valueA - valueB;
		})
		.reduce<Result>(
			(acc, item) => {
				const [category, data] = Object.entries(item)[0];
				// Convertendo "R$" e pontos para formato numérico padrão
				const totalValue = parseFloat(
					data.totalValue
						.replace('R$', '')
						.replace(/\./g, '')
						.replace(',', '.'),
				);
				acc.categories.push(category);
				acc.values.push(totalValue);
				return acc;
			},
			{ values: [], categories: [] },
		);

	return (
		<>
			<BarCharApex
				money
				series={[
					{
						name: 'Faturamento',
						data: transformedData?.values,
						type: 'bar',
					},
				]}
				dataLabelColors={['#5b21b6']}
				colors={['#a78bfa']}
				title='Faturamento por Categoria de Suíte'
				categories={transformedData?.categories}
			/>
		</>
	);
}
