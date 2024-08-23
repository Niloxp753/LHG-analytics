/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/components/charts/LineChart'),
	{ ssr: false },
);

export default function InvoicingXLocation() {
	return (
		<>
			<LineChart
				series={[
					{
						name: '3 horas',
						data: [78, 87, 96, 51, 96, 31, 48, 57, 86, 41, 97, 36],
					},
					{
						name: '6 horas',
						data: [66, 31, 45, 77, 86, 78, 87, 96, 51, 65, 87, 96],
					},
					{
						name: '12 horas',
						data: [91, 38, 47, 56, 31, 48, 57, 66, 31, 45, 77, 86],
					},
					{
						name: 'Day Use',
						data: [81, 68, 77, 86, 91, 38, 47, 56, 71, 85, 57, 66],
					},
					{
						name: 'Diária',
						data: [41, 58, 67, 76, 81, 68, 77, 86, 41, 97, 36, 31],
					},
					{
						name: 'Pernoite',
						data: [34, 45, 57, 66, 41, 58, 67, 76, 61, 75, 47, 36],
					},
				]}
				title={'Faturamento por tipo de locação'}
				height={400}
				categories={[
					'jan/24',
					'fev/24',
					'mar/24',
					'abr/24',
					'mai/24',
					'jun/24',
					'jul/24',
					'ago/24',
					'set/24',
					'out/24',
					'nov/24',
					'dez/24',
				]}
			/>
		</>
	);
}
