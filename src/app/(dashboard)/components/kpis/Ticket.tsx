/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/AreaChartsApex'),
	{ ssr: false },
);

export default function Ticket() {
	return (
		<div className='  max-h-[440px] h-full w-full flex items-center justify-center'>
			<AreaChartsApex
				series={[
					{
						data: [70, 65, 60, 70, 65, 70, 70, 65, 65, 70, 70, 65],
						name: 'Ticket Médio',
					},
				]}
				legend='Ticket Médio'
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
