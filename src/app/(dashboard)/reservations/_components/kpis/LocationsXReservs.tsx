/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

export default function LocationsXReservs() {
	return (
		<div className='h-full w-full flex items-center justify-center'>
			<AreaChartsApex
				series={[
					{
						data: [80, 60, 55, 73, 60, 75, 60, 70, 60, 75, 60, 70],
						name: 'Nº de reservas',
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
