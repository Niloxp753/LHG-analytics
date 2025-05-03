/** @format */
'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const PieChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/PieChartsApex'),
	{ ssr: false },
);

export default function UnityxRevenue() {
	return (
		<PieChartsApex
			money
			height={280}
			title='Receita de A&B por unidade'
			series={[22500, 7800, 6899, 12045]}
			colors={['#a78bfa', '#fbbf24', '#2dd4bf', '#ef4444']}
			dataLabelColors={['#5b21b6', '#d97706', '#115e59', '#991b1b']}
		/>
	);
}
