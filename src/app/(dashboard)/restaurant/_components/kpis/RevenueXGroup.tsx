/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const BarChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/BarCharApex'),
	{ ssr: false },
);

export default function RevenueXGroup() {
	return (
		<div className='w-full h-fit'>
			<BarChart
				title={'Faturamento Por Grupo'}
				series={[
					{
						name: 'Alimentos',
						data: [7054, 9695, 8457, 5856, 7791, 8469],
					},
					{
						name: 'Bebidas',
						data: [6615, 4598, 5951, 4988, 5797, 7125],
					},
					{
						name: 'Outros',
						data: [4876, 6565, 4001, 6548, 5197, 4105],
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
				dataLabelColors={['#7c3aed', '#2563eb', '#4f46e5']}
				colors={['#a78bfa', '#60a5fa', '#818cf8']}
				money
			/>
		</div>
	);
}
