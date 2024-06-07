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
				serie={[50, 60, 70, 65, 75, 90, 65]}
			/>
		</>
	);
}
