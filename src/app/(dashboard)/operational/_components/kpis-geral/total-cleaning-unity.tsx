/** @format */

'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const PieChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/PieChartsApex'),
	{ ssr: false },
);

export default function TotalCleaningUnity() {
	return (
		<PieChartsApex
			height={340}
			data={[1233, 820, 740, 1005]}
			title='Total de limpezas e vistorias'
			colors={['#a78bfa', '#fbbf24', '#2dd4bf', '#ef4444']}
			dataLabelColors={['#5b21b6', '#d97706', '#115e59', '#991b1b']}
		/>
	);
}
