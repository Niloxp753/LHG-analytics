/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface EcommerceRevervsProps {
	series: number[];
	categories: string[];
}
export default function EcommerceRevervs({
	categories,
	series,
}: EcommerceRevervsProps) {
	return (
		<>
			<AreaChartsApex
				series={[
					{
						data: series,
						name: 'Reservas de e-commerce',
					},
				]}
				categories={categories}
			/>
		</>
	);
}
