/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface InvoicingXReservsProps {
	series: number[];
	categories: string[];
}
export default function InvoicingXReservs({
	categories,
	series,
}: InvoicingXReservsProps) {
	return (
		<>
			<AreaChartsApex
				money
				categories={categories}
				series={[
					{
						data: series,
						name: 'Faturamento de Reservas',
					},
				]}
			/>
		</>
	);
}
