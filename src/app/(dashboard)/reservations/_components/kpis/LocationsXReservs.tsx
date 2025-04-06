/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface LocationsXReservsProps {
	series: number[];
	categories: string[];
}
export default function LocationsXReservs({
	categories,
	series,
}: LocationsXReservsProps) {
	return (
		<div className='h-full w-full flex items-center justify-center'>
			<AreaChartsApex
				series={[
					{
						data: series,
						name: 'Nº de reservas',
					},
				]}
				categories={categories}
			/>
		</div>
	);
}
