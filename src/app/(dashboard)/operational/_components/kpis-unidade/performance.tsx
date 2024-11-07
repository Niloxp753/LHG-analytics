/** @format */
'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const PieChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/PieChartsApex'),
	{ ssr: false },
);

export default function Performance() {
	return (
		<PieChartsApex
			labels={[
				'Fabiana Oliveira',
				'Ricardo Sousa',
				'Ana Cristina',
				'Marcos Pereira',
			]}
			height={340}
			title='Performance de supervisores'
		/>
	);
}
