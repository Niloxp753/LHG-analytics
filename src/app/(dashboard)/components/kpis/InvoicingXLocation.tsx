/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const ColumnChart = dynamic(
	() => import('@/app/(dashboard)/components/charts/ColumnChart'),
	{ ssr: false },
);

export default function InvoicingXLocation() {
	return (
		<>
			<ColumnChart
				series={[
					{
						name: 'Tipo De Locação',
						data: [44, 55, 57, 56, 61, 58],
					},
				]}
				title={'Faturamento por tipo de locação'}
			/>
		</>
	);
}
