/** @format */
'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const PieChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/PieChartsApex'),
	{ ssr: false },
);

interface SuitesOutsourcedInternalProps {
	data: any;
}

export default function SuitesOutsourcedInternal(
	data: SuitesOutsourcedInternalProps,
) {
	const ShiftCleaning = data.data;
	return (
		<PieChartsApex
			labels={ShiftCleaning.categories}
			series={ShiftCleaning.series}
			height={340}
			title='Limpezas por turno'
		/>
	);
}
