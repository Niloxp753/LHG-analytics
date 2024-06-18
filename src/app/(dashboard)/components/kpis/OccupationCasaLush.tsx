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
				legend='Tx de Ocupação - Casa Lush'
				serie={[50, 65, 55, 75, 65, 60, 75]}
				color='#86efac'
				labelColor='#14532d'
			/>
		</>
	);
}
