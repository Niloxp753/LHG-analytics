/** @format */

'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/AreaChartsApex'),
	{ ssr: false },
);

export default function TotalCleaning() {
	return (
		<AreaChartsApex
			id='total-cleaning-ipiranga'
			series={[
				{
					data: [
						1233, 820, 740, 1005, 1907, 5670, 4700, 3275, 1517, 5525, 2443,
						3025,
					],
					name: 'Total de limpezas',
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
	);
}
