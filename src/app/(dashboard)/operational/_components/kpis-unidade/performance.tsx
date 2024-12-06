/** @format */
'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const PieChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/PieChartsApex'),
	{ ssr: false },
);

interface PerformanceProps {
	data: any;
}

export default function Performance(data: PerformanceProps) {
	const supPerformance = data.data;
	return (
		<PieChartsApex
			labels={supPerformance.categories}
			series={supPerformance.series}
			height={340}
			title='Performance de supervisores'
		/>
	);
}
