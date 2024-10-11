/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const ColumnChart = dynamic(
	() => import('@/app/(dashboard)/components/charts/ColumnChart'),
	{ ssr: false },
);

export default function RevenueABXCost() {
	return (
		<div className='w-full'>
			<ColumnChart
				title={'Receita A&B X Custo'}
				series={[
					{
						name: 'Receita A&B',
						data: [44, 55, 57, 56, 61, 58],
					},
					{
						name: 'Custo',
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
			/>
		</div>
	);
}
