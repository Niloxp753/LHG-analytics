/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/AreaChartsApex'),
	{ ssr: false },
);

export default function InvoicingXReservs() {
	return (
		<>
			<AreaChartsApex
				color='#2dd4bf'
				labelColor='#115e59'
				legend='Faturamento de Reservas'
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
				series={[
					{
						data: [80, 60, 55, 73, 60, 75, 60, 70, 60, 75, 60, 70],
						name: 'Faturamento de Reservas',
					},
				]}
			/>
		</>
	);
}
