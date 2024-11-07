/** @format */

'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/AreaChartsApex'),
	{ ssr: false },
);

export default function AvarageCleaning() {
	return (
		<AreaChartsApex
			id='media-cleaning-ipiranga'
			series={[
				{
					data: [133, 420, 240, 105, 107, 570, 400, 325, 1517, 525, 243, 305],
					name: 'Média de limpezas',
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
