/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

export default function CategoryA() {
	return (
		<div className='w-full'>
			<LineChart
				height={500}
				title={'Faturamento Por Categoria De Alimentos'}
				series={[
					{
						name: 'Café da manhã',
						data: [40, 56, 65, 75, 47, 66, 34, 45, 67, 35, 47, 56],
					},
					{
						name: 'Petisco',
						data: [45, 77, 86, 73, 50, 46, 75, 47, 66, 45, 57, 66],
					},
					{
						name: 'Entradas',
						data: [35, 47, 56, 65, 77, 86, 33, 40, 56, 65, 77, 86],
					},
					{
						name: 'Lanche',
						data: [45, 57, 66, 75, 47, 66, 66, 41, 68, 54, 65, 77],
					},
					{
						name: 'Pratos Principais',
						data: [75, 47, 66, 34, 45, 67, 63, 60, 66, 34, 45, 67],
					},
					{
						name: 'Acompanhamentos',
						data: [73, 50, 46, 75, 47, 66, 34, 45, 67, 66, 41, 68],
					},
					{
						name: 'Sobremesa',
						data: [34, 45, 67, 66, 41, 68, 53, 70, 68, 45, 57, 66],
					},
					{
						name: 'Bomboniere',
						data: [54, 65, 77, 46, 51, 68, 73, 50, 46, 75, 47, 66],
					},
				]}
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
		</div>
	);
}
