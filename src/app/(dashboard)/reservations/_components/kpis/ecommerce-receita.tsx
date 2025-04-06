/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface EcommerceRevenueProps {
	series: number[];
	categories: string[];
}
export default function EcommerceRevenue({
	categories,
	series,
}: EcommerceRevenueProps) {
	return (
		<>
			<AreaChartsApex
				money
				series={[
					{
						data: series,
						name: 'Receita de e-commerce',
					},
				]}
				categories={categories}
			/>
		</>
	);
}
