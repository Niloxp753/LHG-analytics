/** @format */
'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const PieChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/PieChartsApex'),
	{ ssr: false },
);

interface UnityxSalesProps {
	ipiranga: number;
	lapa: number;
	andar_de_cima: number;
	tout: number;
}

export default function UnityxSales({
	ipiranga,
	lapa,
	andar_de_cima,
	tout,
}: UnityxSalesProps) {
	return (
		<PieChartsApex
			height={280}
			title='Nº de vendas por unidade'
			series={[ipiranga, lapa, andar_de_cima, tout]}
			colors={['#a78bfa', '#fbbf24', '#2dd4bf', '#ef4444']}
			dataLabelColors={['#5b21b6', '#d97706', '#115e59', '#991b1b']}
		/>
	);
}
