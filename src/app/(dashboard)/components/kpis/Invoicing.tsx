/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/AreaChartsApex'),
	{ ssr: false },
);

export default function Invoicing(data: any) {
	const revenueByDate = data.data;
	const totalRevenueData: any[] = [];
	const dates: any[] = [];

	revenueByDate.forEach((item: any) => {
		const date = Object.keys(item)[0];
		const value = item[date].totalValue;

		// Adiciona a data e converte o valor para número
		dates.push(date);
		totalRevenueData.push(
			parseFloat(value.replace(/[^0-9,]/g, '').replace(',', '.')),
		);
	});

	const result = {
		name: 'Faturamento total',
		data: totalRevenueData,
		dates: dates,
	};

	// Exibe o resultado

	return (
		<>
			<AreaChartsApex
				money
				series={[result]}
				legend='Faturamento Total'
				categories={result.dates}
			/>
		</>
	);
}
