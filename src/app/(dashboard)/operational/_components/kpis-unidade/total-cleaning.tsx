/** @format */

'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface TotalCleaningProps {
	data: any;
}

export default function TotalCleaning(data: TotalCleaningProps) {
	const cleaningByDate = data.data;
	return (
		<AreaChartsApex
			id='total-cleaning-ipiranga'
			series={[
				{
					data: cleaningByDate.series,
					name: 'Total de limpezas',
				},
			]}
			categories={cleaningByDate.categories}
		/>
	);
}
