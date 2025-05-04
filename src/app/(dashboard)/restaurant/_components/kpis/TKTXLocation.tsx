/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);
export default function TKTXLocation() {
	return (
		<div className='w-full'>
			<AreaChartsApex
				series={[
					{
						name: 'Ticket Médio A&B',
						data: [
							4794, 5645, 5657, 5689, 6132, 5835, 6653, 6098, 6678, 5655, 5897,
							5496,
						],
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
				money
			/>
		</div>
	);
}
