/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const BarChart = dynamic(
	() => import('@/app/(dashboard)/components/charts/BarCharApex'),
	{ ssr: false },
);

export default function RevenueXGroup() {
	return (
		<div className='w-full h-fit'>
			<BarChart
				title={'% Das Vendas Por Grupo'}
				series={[
					{
						name: 'Alimentos',
						data: [44, 55, 57, 56, 61, 58],
					},
					{
						name: 'Bebidas',
						data: [86, 45, 71, 48, 57, 85],
					},
					{
						name: 'Outros',
						data: [76, 85, 101, 98, 87, 105],
					},
				]}
				categories={[
					'jan/24',
					'fev/24',
					'mar/24',
					'abr/24',
					'mai/24',
					'jun/24',
				]}
				dataLabelColors={['#5b21b6']}
				colors={['#a78bfa']}
			/>
		</div>
	);
}
