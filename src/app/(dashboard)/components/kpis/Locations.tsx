/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/AreaChartsApex'),
	{ ssr: false },
);

export default function Locations(data: any) {
	const rentalsByDate = data.data;
	const totalRevenueData: any[] = [];
	const dates: any[] = [];

	rentalsByDate.forEach((item: any) => {
		const date = Object.keys(item)[0];
		const value = item[date].totalRentalsApartments;

		// Adiciona a data e converte o valor para número
		dates.push(date);
		totalRevenueData.push(value);
	});

	const result = {
		name: 'Quantidade de locações',
		data: totalRevenueData,
		dates: dates,
	};

	return (
		<>
			<AreaChartsApex
				series={[
					{
						data: result.data,
						name: result.name,
					},
				]}
				legend='Locações'
				categories={result.dates}
			/>
		</>
	);
}
