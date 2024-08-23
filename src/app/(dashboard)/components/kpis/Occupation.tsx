/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/AreaChartsApex'),
	{ ssr: false },
);

export default function Occupation() {
	return (
		<>
			<AreaChartsApex
				legend='Tx de Ocupação'
				series={[
					{
						data: [50, 60, 70, 65, 75, 90, 65, 60, 70, 65, 75, 90],
						name: 'Taxa de ocupação',
					},
				]}
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
			/>
		</>
	);
}
