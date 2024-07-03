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
			/>
		</>
	);
}
