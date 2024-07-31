/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const ColumnChart = dynamic(
	() => import('@/app/(dashboard)/components/charts/ColumnChart'),
	{ ssr: false },
);

export default function RevenueXGroup() {
	return (
		<div className='w-full'>
			<ColumnChart
				title={'% Das Vendas Por Grupo'}
				series={[
					{
						name: 'Alimentos',
						data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 55, 57, 56],
					},
					{
						name: 'Bebidas',
						data: [86, 45, 71, 48, 57, 85, 91, 64, 74, 81, 98, 87],
					},
					{
						name: 'Outros',
						data: [76, 85, 101, 98, 87, 105, 61, 94, 84, 61, 88, 77],
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
