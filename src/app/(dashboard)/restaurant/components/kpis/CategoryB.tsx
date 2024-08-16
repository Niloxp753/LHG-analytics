/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/components/charts/LineChart'),
	{ ssr: false },
);

export default function CategoryB() {
	return (
		<div className='w-full'>
			<LineChart
				height={500}
				title={'Faturamento Por Categoria De Bebidas'}
				series={[
					{
						name: 'Soft Drinks',
						data: [40, 56, 65, 75, 47, 66, 34, 45, 67, 35, 47, 56],
					},
					{
						name: 'Cervejas',
						data: [45, 77, 86, 73, 50, 46, 75, 47, 66, 45, 57, 66],
					},
					{
						name: 'Coqueteis',
						data: [35, 47, 56, 65, 77, 86, 33, 40, 56, 65, 77, 86],
					},
					{
						name: 'Doses',
						data: [45, 57, 66, 75, 47, 66, 66, 41, 68, 54, 65, 77],
					},
					{
						name: 'Garrafas',
						data: [75, 47, 66, 34, 45, 67, 63, 60, 66, 34, 45, 67],
					},
					{
						name: 'Vinhos / Espumantes',
						data: [73, 50, 46, 75, 47, 66, 34, 45, 67, 66, 41, 68],
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
