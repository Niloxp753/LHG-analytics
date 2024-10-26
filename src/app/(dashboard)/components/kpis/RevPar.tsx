/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/AreaChartsApex'),
	{ ssr: false },
);

export default function RevPar(data: any) {
	const revparByDate = data.data;

	const totalRevenueData: any[] = [];
	const dates: any[] = [];

	revparByDate.forEach((item: any) => {
		const date = Object.keys(item)[0];
		const value = item[date].revpar;

		// Adiciona a data e converte o valor para número
		dates.push(date);
		totalRevenueData.push(
			parseFloat(value.replace(/[^0-9,]/g, '').replace(',', '.')),
		);
	});

	const result = {
		name: 'RevPar',
		data: totalRevenueData,
		dates: dates,
	};

	return (
		<div className='h-full w-full flex justify-center items-center'>
			<AreaChartsApex
				series={[{ data: result.data, name: result.name }]}
				legend='RevPar'
				color='#2dd4bf'
				labelColor='#115e59'
				categories={result.dates}
				money
			/>
		</div>
	);
}
