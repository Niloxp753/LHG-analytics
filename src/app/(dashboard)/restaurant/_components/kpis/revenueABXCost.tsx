/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

export default function RevenueABXCost() {
	return (
		<div className='w-full'>
			<AreaChartsApex
				legend={'Receita A&B'}
				series={[
					{
						name: 'Receita A&B',
						data: [44558, 55778, 57996, 59656, 61789, 58963],
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
				money
			/>
		</div>
	);
}
