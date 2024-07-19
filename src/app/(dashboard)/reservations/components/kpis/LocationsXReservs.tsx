/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/AreaChartsApex'),
	{ ssr: false },
);

export default function LocationsXReservs() {
	return (
		<div className='h-full w-full flex items-center justify-center'>
			<AreaChartsApex
				serie={[80, 60, 55, 73, 60, 75, 60, 70]}
				legend='Número de Reservas'
			/>
		</div>
	);
}
