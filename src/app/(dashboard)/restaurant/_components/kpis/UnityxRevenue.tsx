/** @format */
'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const PieChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/PieChartsApex'),
	{ ssr: false },
);

interface UnityxRevenueProps {
	ipiranga: number;
	lapa: number;
	andar_de_cima: number;
	tout: number;
}

export default function UnityxRevenue({
	ipiranga,
	lapa,
	andar_de_cima,
	tout,
}: UnityxRevenueProps) {
	return (
		<PieChartsApex
			money
			height={280}
			title='Receita de A&B por unidade'
			series={[ipiranga, lapa, andar_de_cima, tout]}
			colors={['#a78bfa', '#fbbf24', '#2dd4bf', '#ef4444']}
			dataLabelColors={['#5b21b6', '#d97706', '#115e59', '#991b1b']}
		/>
	);
}
