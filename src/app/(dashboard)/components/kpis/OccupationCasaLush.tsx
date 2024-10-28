/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/AreaChartsApex'),
	{ ssr: false },
);

export default function OccupationCasaLush() {
	return (
		<>
			<AreaChartsApex
				id='casa-lush'
				series={[
					{
						data: [50, 65, 55, 75, 65, 60, 75, 55, 75, 65, 75, 55],
						name: 'Taxa de Ocupação - Casa Lush',
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
