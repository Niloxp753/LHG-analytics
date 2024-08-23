/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/AreaChartsApex'),
	{ ssr: false },
);

export default function Invoicing() {
	return (
		<>
			<AreaChartsApex
				series={[
					{
						data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 55, 57, 56],
						name: 'Faturamento Total',
					},
				]}
				legend='Faturamento Total'
			/>
		</>
	);
}
