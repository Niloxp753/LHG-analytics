/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApexDouble = dynamic(
	() => import('@/app/(dashboard)/components/charts/AreaChartsApexDouble'),
	{ ssr: false },
);

export default function Occupation() {
	return (
		<>
			<AreaChartsApexDouble
				legend01='Tx de Ocupação'
				legend02='ADR'
				serie01={[120, 100, 150, 220]}
				serie02={[70, 175, 125, 250]}
			/>
		</>
	);
}
