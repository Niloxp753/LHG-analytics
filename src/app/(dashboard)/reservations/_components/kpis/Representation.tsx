/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface RepresentationProps {
	series: number[];
	categories: string[];
}
export default function Representation({
	categories,
	series,
}: RepresentationProps) {
	return (
		<>
			<AreaChartsApex
				percent
				series={[
					{
						name: 'Representatividade De Reservas',
						data: series.map((item) => {
							const value = item * 100;
							return parseFloat(value.toFixed(2));
						}),
					},
				]}
				categories={categories}
			/>
		</>
	);
}
